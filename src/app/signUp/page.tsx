"use client";

import React, { useState } from "react";
import Link from "next/link";
import img from "../../../public/SignUpImg.jpg";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { z } from "zod";

const User = z.object({
  username: z.string({ message: "Invalid email username" }).max(100),
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Include the username field in validation
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

    setErrors({}); // Clear errors if form is valid
    // Add API logic here
    console.log("Form submitted successfully!");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // Stack vertically on small screens
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Left side for sign-up form */}
      <Box
        sx={{
          width: { xs: "100%", sm: "60%" }, // Make form 100% width on smaller screens
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Header */}
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

        {/* Form */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "500px", // Increased max width
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
              sx={{
                borderRadius: "20px", // Rounded edges
                height: "50px", // Increased height for better visibility
                fontSize: "18px", // Increased font size
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
              sx={{
                borderRadius: "20px", // Rounded edges
                height: "50px", // Increased height for better visibility
                fontSize: "18px", // Increased font size
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
              sx={{
                borderRadius: "20px", // Rounded edges
                height: "50px", // Increased height
                fontSize: "18px", // Increased font size
              }}
            />

            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  backgroundColor: "#1877f2", // Facebook Blue
                  borderRadius: "20px", // Rounded button
                  ":hover": {
                    backgroundColor: "#166fe5", // Hover effect
                  },
                  height: "60px", // Increased height for button
                  fontSize: "18px", // Increased font size for button
                }}
              >
                Sign Up
              </Button>
            </Box>
          </form>

          {/* Login Link */}
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

      {/* Right side for the image */}
      <Box
        sx={{
          width: { xs: "100%", sm: "50%" }, // Make image 100% width on smaller screens
          height: "100vh",
          backgroundImage: `url(${img.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Box>
  );
}
