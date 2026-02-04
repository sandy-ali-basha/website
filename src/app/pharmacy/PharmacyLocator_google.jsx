import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function PharmacyFinder() {
  console.log("GOOGLE_API_KEY", GOOGLE_API_KEY);
  const [location, setLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [radius, setRadius] = useState(10000);
  const [searchText, setSearchText] = useState("");

  const { t } = useTranslation("index");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: ["places"],
  });

  const getMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert("لم يتم السماح بتحديد الموقع"),
    );
  };

  useEffect(() => {
    if (!location || !window.google) return;

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div"),
    );
    service.nearbySearch(
      {
        location,
        radius,
        type: "pharmacy",
      },
      (results) => setPharmacies(results || []),
    );
  }, [location]);

  if (!isLoaded) return <Typography>{t("loading")}...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ direction: "rtl", py: 4, mt: 12 }}>
      {/* HERO */}
      <Box
        sx={{
          bgcolor: "primary.main",
          borderRadius: 3,
          overflow: "hidden",
          mb: 5,
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }} alignItems="stretch">
          {/* LEFT CONTENT */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 3, md: 5 },
              color: "#fff",
            }}
          >
            <Typography variant="h4" fontWeight={700} mb={1}>
              {t("PHtitle")}
            </Typography>

            <Typography mb={4}>{t("subtitle")}</Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              {/* Location */}
              <TextField
                fullWidth
                placeholder={t("cityZip")}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                }}
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 1,
                  mx: 1,
                }}
              />

              {/* Radius */}
              <TextField
                select
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                sx={{
                  bgcolor: "#fff",
                  minWidth: 140,
                  borderRadius: 1,
                  mx: 1,
                }}
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

          {/* RIGHT IMAGE */}
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", md: "block" },
              backgroundImage:
                "url('https://images.unsplash.com/photo-1526256262350-7da7584cf5eb')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Stack>
      </Box>

      {/* MAP */}
      <Box
        sx={{
          height: 450,
          borderRadius: 3,
          overflow: "hidden",
          mb: 4,
          boxShadow: 1,
        }}
      >
        <GoogleMap
          center={location || { lat: 33.3152, lng: 44.3661 }}
          zoom={location ? 14 : 6}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          {location && <Marker position={location} />}
          {pharmacies.map((p) => (
            <Marker
              key={p.place_id}
              position={{
                lat: p.geometry.location.lat(),
                lng: p.geometry.location.lng(),
              }}
            />
          ))}
        </GoogleMap>
      </Box>

      {/* LIST */}
      <Typography variant="h5" mb={2}>
        {t("nearbyPharmacies")}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        {pharmacies.map((p) => (
          <Card key={p.place_id} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography fontWeight={600}>{p.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {p.vicinity}
              </Typography>
              {p.rating && (
                <Typography variant="body2" mt={1}>
                  ⭐ {p.rating}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
