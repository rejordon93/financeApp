import React from "react";
import { Box, Typography, Container } from "@mui/material";

export default function Budget() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Budget Overview
        </Typography>
        <Typography variant="body1">
          Here you can view and manage your monthly budget, expenses, and
          savings goals.
        </Typography>
      </Box>
    </Container>
  );
}
