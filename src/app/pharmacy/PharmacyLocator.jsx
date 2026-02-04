import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  CircularProgress,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Seo from "components/Seo";

// 🔧 حل مشكلة أيقونة الماركر
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapSizeFix({ location }) {
  const map = useMap();

  useEffect(() => {
    const resize = () => map.invalidateSize();
    const timeoutId = window.setTimeout(resize, 0);
    window.addEventListener("resize", resize);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("resize", resize);
    };
  }, [map]);

  useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lng], 13, { animate: true });
      map.invalidateSize();
    }
  }, [location, map]);

  return null;
}

export default function PharmacyLocator() {
  const { t } = useTranslation("index");

  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(10000);
  const [searchText, setSearchText] = useState("");
  const [selectedPharmacyId, setSelectedPharmacyId] = useState(null);

  // 🔹 بيانات تجريبية
  const pharmacies = [
    {
      id: 1,
      name: "صيدلية الشفاء",
      lat: 33.3152,
      lng: 44.3661,
      city: "Baghdad",

      phone: "+964 1 555 0101",
      address: "الكرادة داخل، شارع 52",
    },
    {
      id: 2,
      name: "صيدلية النور",
      lat: 33.3205,
      lng: 44.3612,
      city: "Baghdad",
      hasProducts: false,
      phone: "+964 1 555 0102",
      address: "المنصور، شارع 14",
    },
    {
      id: 3,
      name: "صيدلية الرافدين",
      lat: 33.3121,
      lng: 44.3523,
      city: "Baghdad",

      phone: "+964 1 555 0103",
      address: "الزيونة، شارع الربيع",
    },
    {
      id: 4,
      name: "صيدلية الحياة",
      lat: 33.5138,
      lng: 36.2765,
      city: "Damascus",

      phone: "+963 11 555 0104",
      address: "أبو رمانة، شارع العابد",
    },
    {
      id: 5,
      name: "صيدلية الشام",
      lat: 33.5102,
      lng: 36.2914,
      city: "Damascus",
      hasProducts: false,
      phone: "+963 11 555 0105",
      address: "المزة، شارع 30",
    },
    {
      id: 6,
      name: "صيدلية الياسمين",
      lat: 33.5268,
      lng: 36.3127,
      city: "Damascus",

      phone: "+963 11 555 0106",
      address: "كفرسوسة، شارع الجلاء",
    },
  ];

  const isLoading = false;
  const normalizedSearch = searchText.trim().toLowerCase();
  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    if (!normalizedSearch) return true;
    return (
      pharmacy.name.toLowerCase().includes(normalizedSearch) ||
      pharmacy.city.toLowerCase().includes(normalizedSearch) ||
      pharmacy.address.toLowerCase().includes(normalizedSearch)
    );
  });

  const getMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert(t("locationDenied")),
    );
  };

  if (isLoading) return <Typography>{t("loading")}...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ direction: "rtl", py: 4, mt: 12 }}>
      <Seo
        title="Pharmacy Locator"
        description="Find nearby pharmacies and get directions with the Dawaa Alhayat pharmacy locator."
        keywords="pharmacy locator, Dawaa Alhayat, nearby pharmacies"
      />
      {/* HERO */}
      <Box sx={{ bgcolor: "primary.main", borderRadius: 3, mb: 5 }}>
        <Stack direction={{ xs: "column", md: "row" }}>
          <Box sx={{ flex: 1, p: 4, color: "#fff" }}>
            <Typography fontWeight={700} sx={{ fontSize: { xs: 26, md: 32 } }}>
              {t("PHtitle")}
            </Typography>

            <Typography mt={1}>{t("subtitle")}</Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={3}>
              <TextField
                fullWidth
                placeholder={t("cityZip")}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                }}
                sx={{ bgcolor: "#fff", borderRadius: 1 }}
              />

              <TextField
                select
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                sx={{ bgcolor: "#fff", minWidth: 140 }}
              >
                <MenuItem value={5000}>5 km</MenuItem>
                <MenuItem value={10000}>10 km</MenuItem>
                <MenuItem value={20000}>20 km</MenuItem>
              </TextField>
            </Stack>

            <Button
              variant="contained"
              color="error"
              sx={{ mt: 3 }}
              startIcon={<LocationOnIcon />}
              onClick={getMyLocation}
            >
              {t("useLocation")}
            </Button>
          </Box>
        </Stack>
      </Box>

      {/* MAP */}
      <Box sx={{ height: 450, borderRadius: 3, overflow: "hidden", mb: 4 }}>
        <MapContainer
          center={location ? [location.lat, location.lng] : [33.3152, 44.3661]}
          zoom={location ? 13 : 6}
          style={{ height: "100%", width: "100%" }}
        >
          <MapSizeFix location={location} />
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {location && (
            <Marker position={[location.lat, location.lng]}>
              <Popup>{t("yourLocation")}</Popup>
            </Marker>
          )}

          {filteredPharmacies.map((p) => (
            <Marker
              key={p.id}
              position={[p.lat, p.lng]}
              eventHandlers={{
                click: () => setSelectedPharmacyId(p.id),
              }}
            >
              <Popup>
                <Typography fontWeight={600}>{p.name}</Typography>
                <Typography variant="body2">{p.city}</Typography>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>

      {/* LIST */}
      <Typography variant="h5" mb={2}>
        {t("nearbyPharmacies")}
      </Typography>

      {isLoading && <CircularProgress />}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2,1fr)",
            md: "repeat(3,1fr)",
          },
          gap: 2,
        }}
      >
        {filteredPharmacies.map((p) => (
          <Card
            key={p.id}
            sx={{
              borderRadius: 3,
              border: p.id === selectedPharmacyId ? "2px solid" : "1px solid",
              borderColor:
                p.id === selectedPharmacyId ? "primary.main" : "divider",
              boxShadow: p.id === selectedPharmacyId ? 6 : 1,
              transition: "0.2s ease",
            }}
          >
            <CardContent>
              <Typography fontWeight={600}>{p.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {p.city}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {p.address}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {p.phone}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
