"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import img from "../../../public/SignUpImg.jpg";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { z } from "zod";

const User = z.object({
  username: z.string({ message: "Invalid username" }).max(100),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
});

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = User.safeParse({ username, email, password });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        username: fieldErrors.username?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      await axios.post("/api/signUp", {
        username,
        email,
        password,
      });
      setUsername("");
      setEmail("");
      setPassword("");
      setOpen(true);
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const serverMsg = err.response?.data?.message || "Signup failed.";
        alert(serverMsg);
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
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
      {/* Left side - SignUp Form */}
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
        <Typography
          variant="h3"
          align="left"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Start your journey
        </Typography>
        <Typography variant="h5" align="left" sx={{ marginBottom: "10px" }}>
          Create your account
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
              label="Username"
              type="text"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!errors.username}
              helperText={errors.username}
              required
              InputProps={{
                sx: {
                  borderRadius: "12px",
                  height: "56px",
                  fontSize: "16px",
                },
              }}
              InputLabelProps={{
                sx: { fontSize: "16px" },
              }}
            />

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
              InputProps={{
                sx: {
                  borderRadius: "12px",
                  height: "56px",
                  fontSize: "16px",
                },
              }}
              InputLabelProps={{
                sx: { fontSize: "16px" },
              }}
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
              InputProps={{
                sx: {
                  borderRadius: "12px",
                  height: "56px",
                  fontSize: "16px",
                },
              }}
              InputLabelProps={{
                sx: { fontSize: "16px" },
              }}
            />

            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={loading}
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
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>

              <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <MuiAlert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Sign up successful! Redirecting to login...
                </MuiAlert>
              </Snackbar>
            </Box>
          </form>

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Already have an account?{" "}
              <MuiLink component={Link} href="/login">
                Login
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Right side - Image */}
      <Box
        sx={{
          width: { xs: "100%", sm: "50%" },
          height: "100vh",
          position: "relative",
        }}
      >
        <Image
          src={img}
          alt="Sign Up"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </Box>
    </Box>
  );
}
