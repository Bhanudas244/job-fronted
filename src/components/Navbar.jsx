import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{ backgroundColor: "#2c387e" }} // Custom background color
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between", paddingY: 1 }}>
          {/* Logo and Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: 1.5,
            }}
            onClick={() => navigate("/")}
          >
            {!isMobile && (
              <Typography
                variant="h6"
                noWrap
                sx={{ fontWeight: 600, color: "#ffffff" }}
              >
                Job Portal
              </Typography>
            )}
          </Box>

          {/* Auth Button */}
          <Box>
            {token ? (
              <Button
                variant="outlined"
                onClick={handleLogout}
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  color: "#fff",
                  borderColor: "#ffffff",
                  "&:hover": {
                    borderColor: "#ddd",
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                  },
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => navigate("/login")}
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  backgroundColor: "#fdd835", // Yellow tone
                  color: "#000",
                  "&:hover": {
                    backgroundColor: "#fbc02d",
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
