import { AppBar, Box, Toolbar, Button, IconButton } from "@mui/material";
import { AccountBalance } from "@mui/icons-material";
import Link from "next/link";

export default function NavBar() {
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
        {/* Left side: Icon linking to Home */}
        <Link href="/financeHomePage" passHref>
          <IconButton sx={{ color: "black" }}>
            <AccountBalance fontSize="large" />
          </IconButton>
        </Link>

        {/* Right side: Navigation links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            component={Link}
            href="/profile"
            sx={{ color: "black", textTransform: "none" }}
          >
            Profile
          </Button>

          <Button
            component={Link}
            href="/budget"
            sx={{ color: "black", textTransform: "none" }}
          >
            Budgets
          </Button>

          <Button sx={{ color: "black", textTransform: "none" }}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
