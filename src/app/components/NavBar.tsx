"use client";
import React, { useEffect, useState } from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import axios from "axios";
import Link from "next/link";

export default function NavBar() {
  const [username, setUserName] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/getUser");
        setUserName(res.data.username);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    getData();
  }, []);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side: Username */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "black",
          }}
        >
          {username}
        </Typography>

        {/* Right side: Navigation links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button sx={{ color: "black", textTransform: "none" }}>
            <Link href="/profile"> Profile</Link>
          </Button>
          <Button sx={{ color: "black", textTransform: "none" }}>
            Budgets
          </Button>
          <Button sx={{ color: "black", textTransform: "none" }}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
