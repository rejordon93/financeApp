"use client";
import React, { useState } from "react";
import {
  Typography,
  TextField,
  Box,
  Button,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { z } from "zod";
import axios from "axios";

// Schema for validation
const ProfileSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "State/Region is required"),
  income: z.number({ invalid_type_error: "Income must be a number" }),
  taxRate: z.number({ invalid_type_error: "Tax Rate must be a number" }),
});

export default function Profile() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [income, setIncome] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    // Parse input as numbers
    const parsedIncome = Number(income);
    const parsedTaxRate = Number(taxRate);

    const result = ProfileSchema.safeParse({
      firstname,
      lastname,
      city,
      region,
      income: parsedIncome,
      taxRate: parsedTaxRate,
    });

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || "Invalid input";
      setErrorMessage(firstError);
      setLoading(false);
      return;
    }

    try {
      // Example success state — replace with API call later
      axios.post("/api/profile", {
        firstname,
        lastname,
        city,
        region,
        income,
        taxRate,
      });
      setSuccessMessage("Profile updated successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f0f2f5", padding: 2 }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 600,
          padding: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Update Profile
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="State/Region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Income"
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Tax Rate"
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            required
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
