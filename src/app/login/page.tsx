"use client";

import React, { useState } from "react";
import Link from "next/link";
import img from "../../../public/LoginImg.jpg";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  Snackbar,
  Alert,
} from "@mui/material";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

const User = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = User.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    setErrors({});

    try {
      await axios.post("/api/login", {
        email,
        password,
      });

      setEmail("");
      setPassword("");
      setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success",
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch {
      setSnackbar({
        open: true,
        message: "Login failed. Please check your credentials.",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "60%" },
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
          Start your journey
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: "10px" }}>
          Login for Finance Freedom
        </Typography>

        <Box
          sx={{
            width: "100%",
            maxWidth: "500px",
            p: 4,
            borderRadius: 3,
            boxShadow: 3,
            bgcolor: "white",
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              required
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              required
            />

            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  backgroundColor: "#1877f2",
                  borderRadius: "20px",
                  ":hover": {
                    backgroundColor: "#166fe5",
                  },
                  height: "60px",
                  fontSize: "18px",
                }}
              >
                Login
              </Button>
            </Box>
          </form>

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Don&apos;t have an account?{" "}
              <MuiLink component={Link} href="/signUp">
                Sign Up
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", sm: "50%" },
          height: "100vh",
          backgroundImage: `url(${img.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Snackbar for messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
