import { useEffect, useMemo, useState } from "react";
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
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Seo from "components/Seo";
import { usePharmacies } from "hooks/pharmacies/usePharmacies";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

const getDistanceMeters = (from, to) => {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const earthRadius = 6371000;

  const dLat = toRad(to.lat - from.lat);
  const dLng = toRad(to.lng - from.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(from.lat)) *
      Math.cos(toRad(to.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
};

export default function PharmacyLocator() {
  const { t } = useTranslation("index");
  const { data: pharmacies, isLoading } = usePharmacies();

  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(10000);
  const [searchText, setSearchText] = useState("");
  const [selectedPharmacyId, setSelectedPharmacyId] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 33.3152, lng: 44.3661 });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
  });

  const normalizedPharmacies = useMemo(
    () =>
      pharmacies
        .map((pharmacy) => ({
          ...pharmacy,
          lat: Number(pharmacy.lat),
          lng: Number(pharmacy.lng),
        }))
        .filter(
          (pharmacy) => Number.isFinite(pharmacy.lat) && Number.isFinite(pharmacy.lng),
        ),
    [pharmacies],
  );

  useEffect(() => {
    if (!location) return;
    setMapCenter(location);
  }, [location]);

  const normalizedSearch = searchText.trim().toLowerCase();
  const filteredPharmacies = normalizedPharmacies.filter((pharmacy) => {
    if (location) {
      const distance = getDistanceMeters(location, {
        lat: pharmacy.lat,
        lng: pharmacy.lng,
      });
      if (distance > Number(radius)) return false;
    }

    if (!normalizedSearch) return true;
    return (
      pharmacy.name?.toLowerCase().includes(normalizedSearch) ||
      pharmacy.city?.toLowerCase().includes(normalizedSearch) ||
      pharmacy.address?.toLowerCase().includes(normalizedSearch)
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

      <Box
        sx={{
          height: 420,
          borderRadius: 3,
          overflow: "hidden",
          mb: 4,
          boxShadow: 1,
          bgcolor: "#f3f4f6",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {!GOOGLE_API_KEY ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 2,
              textAlign: "center",
            }}
          >
            <Typography color="text.secondary">
              Google Maps API key is missing. Add `VITE_GOOGLE_MAPS_API_KEY` to your `.env`.
            </Typography>
          </Box>
        ) : !isLoaded ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <GoogleMap
            center={mapCenter}
            zoom={location ? 12 : 6}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          >
            {location && <Marker position={location} />}
            {filteredPharmacies.map((p) => (
              <Marker key={p.id} position={{ lat: p.lat, lng: p.lng }} />
            ))}
          </GoogleMap>
        )}
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
            onClick={() => {
              setSelectedPharmacyId(p.id);
              setMapCenter({ lat: p.lat, lng: p.lng });
            }}
            sx={{
              borderRadius: 3,
              border: p.id === selectedPharmacyId ? "2px solid" : "1px solid",
              borderColor:
                p.id === selectedPharmacyId ? "primary.main" : "divider",
              boxShadow: p.id === selectedPharmacyId ? 6 : 1,
              transition: "0.2s ease",
              cursor: "pointer",
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
