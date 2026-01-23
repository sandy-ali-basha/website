import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { _axios } from "../../interceptor/http-config";
import { Box, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

export default function SearchInput({
  searchResults,
  setSearchResults,
  searchTerm,
  setSearchTerm,
}) {
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    if (event.key === "Enter") {
      setLoading(true);

      try {
        // Making an API call with axios
        const response = await _axios.get(`/search-by-name`, {
          params: {
            name: searchTerm,
          },
        });

        // Set the search results from the API response
        setSearchResults(
          response.data.data.products
        );

        if (searchResults.length === 0 && searchTerm) {
          Swal.fire({
            icon: "warning",
            title: t("searchEmpty"),
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 5000,
            customClass: {
              container: "custom-swal",
            },
          });
        }
      } catch (error) {
        console.error("Error fetching search results", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const { t } = useTranslation("index");
  return (
    <>
      <Box
        sx={{
          display: "flex",
          mt: 2,
          gap: 1,
          border: 1,
          borderRadius: 2,
          alignItems: "center",
          justifyContent: "center",
          borderColor: "text.secondary",
          px: 1,
        }}
      >
        <SearchIcon sx={{ color: "text.primary" }} />

        <InputBase
          placeholder={t("searchPlaceholder")}
          inputProps={{ "aria-label": "search" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleSearch} // Trigger search on "Enter"
          disabled={loading}
        />

        {loading && (
          <Box sx={{ display: "flex" }}>
            <CircularProgress size="1rem" />
          </Box>
        )}
      </Box>
    </>
  );
}
