"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Box,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import { ProfileSchema } from "../types/schema";
import { z } from "zod";
import Link from "next/link";

type ProfileType = z.infer<typeof ProfileSchema>;

export default function Profile() {
  const [data, setData] = useState<ProfileType | null>(null);
  const [noProfile, setNoProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/profile/getProfile");
        const parsed = ProfileSchema.safeParse(res.data);

        if (!parsed.success) {
          console.error("Validation failed:", parsed.error);
          setNoProfile(true);
          setLoading(false);
          return;
        }

        setData(parsed.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setNoProfile(true);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ backgroundColor: "#f0f2f5", p: 2 }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (noProfile) {
    return (
      <Box textAlign="center" mt={10} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          No Profile Found
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/addProfile"
        >
          Add Profile
        </Button>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f0f2f5", p: 2 }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: "60%",
          p: 4,
          borderRadius: 3,
          boxShadow: "0 4px 10px rgb(0 0 0 / 0.1)",
        }}
      >
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {data?.firstname} {data?.lastname}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box mb={2}>
          <Typography variant="body1" gutterBottom>
            📍 <strong>Location:</strong> {data?.city}, {data?.region}
          </Typography>

          <Typography variant="body1" gutterBottom>
            🎯 <strong>Goals:</strong> {data?.goals || "None"}
          </Typography>

          <Typography variant="body1" gutterBottom>
            📞 <strong>Cell Phone:</strong> {data?.cellPhone || "N/A"}
          </Typography>

          <Typography variant="body1" gutterBottom>
            🏤 <strong>Zip Code:</strong> {data?.zipCode}
          </Typography>
        </Box>

        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href="/addProfile"
            sx={{ textTransform: "none" }}
          >
            Edit Profile
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
