import { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import {
  // Box,
  // MenuItem,
  CardHeader,
  CardContent,
  Typography,
  Chip,
  Card,
  Tooltip,
  // TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
} from "@mui/material";
import { useOrders } from "hooks/orders/useOrders";
import CloseIcon from "@mui/icons-material/Close"; // For close button in modal
import OrderReview from "./components/OrderReview";
import { Eye } from "react-feather";
import { useTranslation } from "react-i18next";

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: `${theme.palette.primary.main} !important`,
}));

const invoiceStatusObj = {
  Paid: { color: "success", icon: "tabler:circle-half-2" },
  Sent: { color: "secondary", icon: "tabler:circle-check" },
  Draft: { color: "primary", icon: "tabler:device-floppy" },
  "Past Due": { color: "error", icon: "tabler:alert-circle" },
  Downloaded: { color: "info", icon: "tabler:arrow-down-circle" },
  "awaiting-payment": { color: "warning", icon: "tabler:chart-pie" },
};

const defaultColumns = (handleOrderClick) => [
  {
    flex: 0.1,
    field: "reference",
    minWidth: 100,
    headerName: "Order Reference",
    renderCell: ({ row }) => (
      <Typography
        component={LinkStyled}
        href={`/apps/invoice/preview/${row.reference}`}
      >
        {`#${row.reference}`}
      </Typography>
    ),
  },
  {
    flex: 0.1,
    minWidth: 140,
    field: "status",
    renderHeader: () => <>Order Status</>,
    renderCell: ({ row }) => {
      const { status } = row;
      const color = invoiceStatusObj[status]
        ? invoiceStatusObj[status].color
        : "primary";
      return (
        <Tooltip
          title={
            <div>
              <Typography
                variant="caption"
                sx={{ color: "common.white", fontWeight: 600 }}
              >
                {status}
              </Typography>
              <br />
              <Typography
                variant="caption"
                sx={{ color: "common.white", fontWeight: 600 }}
              >
                Subtotal:
              </Typography>{" "}
              {row.sub_total}
            </div>
          }
        >
          <Chip
            color={color}
            variant="outlined"
            sx={{ width: "100%" }}
            label={status}
          />
        </Tooltip>
      );
    },
  },
  {
    flex: 0.15,
    minWidth: 100,
    field: "issuedDate",
    headerName: "Issued Date",
    renderCell: ({ row }) => (
      <Typography sx={{ color: "text.secondary" }}>
        {new Date(row.lines[0].created_at).toLocaleDateString()}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 160,
    field: "lines",
    headerName: "Order Items",
    renderCell: ({ row }) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row.lines.map((line) => line.description).join(", ")}
      </Typography>
    ),
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: "sub_total",
    headerName: "Subtotal",
    renderCell: ({ row }) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row.sub_total.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </Typography>
    ),
  },
  {
    field: "actions",
    headerName: "view",
    flex: 0.1,
    minWidth: 100,
    renderCell: ({ row }) => (
      <Button onClick={() => handleOrderClick(row)}>
        <Eye />
      </Button>
    ),
  },
];

const BillingHistoryTable = () => {
  const [value, setValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { t } = useTranslation("index");
  const [selectedOrder, setSelectedOrder] = useState(null); // State for selected order
  const [open, setOpen] = useState(false); // State for controlling modal visibility

  const { data, isLoading, error } = useOrders();

  // const handleFilter = (val) => {
  //   setValue(val);
  // };

  // const handleStatusValue = (e) => {
  //   setStatusValue(e.target.value);
  // };

  const handleOrderClick = (order) => {
    setSelectedOrder(order); // Set the selected order
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  const columns = defaultColumns(handleOrderClick);

  const filteredRows = (data?.data?.orders || []).filter((order) => {
    const matchesSearch = order.reference
      .toLowerCase()
      .includes(value.toLowerCase());
    const matchesStatus = statusValue
      ? order.status.toLowerCase() === statusValue.toLowerCase()
      : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <CardHeader title={t("Orders History")} />
      <CardContent sx={{ pb: 4 }}>
        {/* <Box
          sx={{
            gap: 4,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >  <Box
            sx={{
              gap: 4,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >  <TextField
              value={value}
              placeholder="Search Invoice"
              onChange={(e) => handleFilter(e.target.value)}
            />  <TextField
              select
              sx={{
                pr: 4,
                "& .MuiFilledInput-input.MuiSelect-select": {
                  width: "8rem !important",
                },
              }}
              SelectProps={{
                displayEmpty: true,
                value: statusValue,
                onChange: (e) => handleStatusValue(e),
              }}
            >
              <MenuItem value="">Select Status</MenuItem>
              {Object.keys(invoiceStatusObj).map((status) => (
                <MenuItem key={status} value={status.toLowerCase()}>
                  {status}
                </MenuItem>
              ))}
            </TextField> </Box>  </Box> */}
      </CardContent>
      {isLoading && <Typography sx={{ p: 5 }}>{t("Loading")}...</Typography>}
      {error && (
        <Typography color="error">{t("Error loading data")}.</Typography>
      )}
      {data?.data && (
        <DataGrid
          sx={{ mx: 2 }}
          autoHeight
          pagination
          rows={filteredRows}
          columns={columns}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          getRowId={(row) => row.reference}
        />
      )}

      {/* Order Review Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          Order Review
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedOrder && <OrderReview item={selectedOrder} />}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default BillingHistoryTable;
