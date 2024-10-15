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
import {
  AssignmentTurnedInRounded,
  CancelRounded,
  CancelScheduleSendRounded,
  CheckCircleOutlineRounded,
  DeleteRounded,
  LocalShippingRounded,
  PaymentRounded,
  PlaylistAddCheckCircleRounded,
  ShoppingCartCheckoutRounded,
  TimelapseRounded,
} from "@mui/icons-material";
import { _axios } from "interceptor/http-config";
import Swal from "sweetalert2";

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: `${theme.palette.primary.main} !important`,
}));

const invoiceStatusObj = {
  order_delivered: { color: "success", icon: <CheckCircleOutlineRounded /> },
  order_under_delivery: { color: "secondary", icon: <LocalShippingRounded /> },
  order_processing: { color: "secondary", icon: <TimelapseRounded /> },
  order_processed: { color: "secondary", icon: <AssignmentTurnedInRounded /> },
  canceled: { color: "primary", icon: <CancelRounded /> },
  cancel_requested: { color: "error", icon: <CancelScheduleSendRounded /> },
  order_requested: { color: "info", icon: <ShoppingCartCheckoutRounded /> },
  awaiting_payment: { color: "warning", icon: <PaymentRounded /> },
  order_canceled: { color: "success", icon: <CloseIcon /> },
};

const BillingHistoryTable = () => {
  const [value, setValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [selectedOrder, setSelectedOrder] = useState(null); // State for selected order
  const [open, setOpen] = useState(false); // State for controlling modal visibility
  const { t } = useTranslation("index");
  const handleCancel = (id) => {
    Swal.fire({
      title: t("Are you sure?"),
      text: t("You won't be able to revert this!"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("Yes, cancel it!"),
    }).then((result) => {
      if (result.isConfirmed) {
        _axios
          .post(`/order/${id}/cancel`)
          .then((res) => {
            // Show a success message
            Swal.fire({
              icon: "success",
              title: t("Order Cancellation Requested"),
              text: t(
                "Your order cancellation has been requested and needs acceptance."
              ),
              confirmButtonText: "Okay",
            });
          })
          .catch((error) => {
            console.error(error);
            // Optionally show an error message
            Swal.fire({
              icon: t("error"),
              title: t("Oops..."),
              text: t("Something went wrong. Please try again."),
            });
          });
      }
    });
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
      minWidth: 200,
      field: "status",
      renderHeader: () => <>Order Status</>,
      renderCell: ({ row }) => {
        const { status } = row;

        const color = invoiceStatusObj[status]
          ? invoiceStatusObj[status].color
          : "primary";
        const Rowicon = invoiceStatusObj[status].icon ? (
          invoiceStatusObj[status].icon
        ) : (
          <PlaylistAddCheckCircleRounded />
        );
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
              sx={{ width: "100%", px: 1 }}
              label={status}
              icon={Rowicon}
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
        <>
          {row?.canCancel && (
            <Button onClick={() => handleCancel(row?.id)}>
              <DeleteRounded />
            </Button>
          )}
          <Button onClick={() => handleOrderClick(row)}>
            <Eye />
          </Button>
        </>
      ),
    },
  ];

  const { data, isLoading, error } = useOrders();

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
      <CardContent sx={{ pb: 4 }}></CardContent>
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
