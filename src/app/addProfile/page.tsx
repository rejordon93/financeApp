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
import { useRouter } from "next/navigation";

// Validation schema
const ProfileSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "State/Region is required"),
  income: z.number({ invalid_type_error: "Income must be a number" }),
  taxRate: z.number({ invalid_type_error: "Tax Rate must be a number" }),
  debt: z.number({ invalid_type_error: "Debt must be a number" }),
  goals: z.string().min(1, "Goals are required"),
  bio: z.string().min(1, "Bio is required"),
});

export default function AddProfile() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [income, setIncome] = useState<number>();
  const [taxRate, setTaxRate] = useState<number>();
  const [debt, setDebt] = useState<number>();
  const [goals, setGoals] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const result = ProfileSchema.safeParse({
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      city,
      region,
      income,
      taxRate,
      debt,
      goals,
      bio,
    });

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || "Invalid input";
      setErrorMessage(firstError);
      setLoading(false);
      return;
    }

    try {
      await axios.post("/api/profile", {
        firstname,
        lastname,
        city,
        region,
        income,
        taxRate,
        bio,
        goals,
        debt,
      });

      setFirstname("");
      setLastname("");
      setCity("");
      setRegion("");
      setIncome(0);
      setTaxRate(0);
      setDebt(0);
      setGoals("");
      setBio("");

      setTimeout(() => {
        setSuccessMessage("Profile updated successfully!");
        router.push("/financeHomePage");
      }, 1000);
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
      sx={{ backgroundColor: "#f5f7fa", padding: 4 }}
    >
      <Paper
        elevation={5}
        sx={{
          width: "100%",
          maxWidth: 1200,
          padding: 4,
          borderRadius: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "stretch",
          gap: 4,
        }}
      >
        {/* Left form section */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom align="center">
            Add Your Profile
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
              label="Income (USD)"
              type="number"
              value={income}
              onChange={(e) => setIncome(parseInt(e.target.value) || 0)}
              required
              fullWidth
            />
            <TextField
              label="Tax Rate (%)"
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(parseInt(e.target.value) || 0)}
              required
              fullWidth
            />
            <TextField
              label="Debt (USD)"
              type="number"
              value={debt}
              onChange={(e) => setDebt(parseInt(e.target.value) || 0)}
              fullWidth
            />
            <TextField
              label="Your Goals"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Short Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              multiline
              rows={3}
              helperText="Tell us a bit about yourself"
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
                "Submit Profile"
              )}
            </Button>
          </Box>
        </Box>

        {/* Right image section */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="/addProfile.jpg"
            alt="Illustration"
            sx={{
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: 4,
              objectFit: "cover",
              boxShadow: 3,
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}
