import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 👈 import
import LoginModal from "../auth/LoginModal";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const { token, user, logout, loginOpen, setLoginOpen } = useAuth(); // 👈 context use
  const isLoggedIn = !!token;
  console.log(user, token);
  return (
    <>
      <AppBar position="static" sx={{ background: "#1976d2" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* 🔹 LEFT */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Noto Serif Devanagari', serif",
                fontWeight: 800,
                letterSpacing: "2px",
                color: "#FFD700", // gold color
              }}
            >
              🏏 आरगाव प्रीमियर लीग
            </Typography>

            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/players">
              Add Player
            </Button>
            <Button color="inherit" component={Link} to="/teams">
              Team List
            </Button>
            <Button color="inherit" component={Link} to="/soldplayers">
              Sold Players
            </Button>
          </Box>

          {/* 🔹 RIGHT */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {!isLoggedIn ? (
              <Button color="inherit" onClick={() => setLoginOpen(true)}>
                Login
              </Button>
            ) : (
              <>
                <AccountCircleIcon sx={{ fontSize: 35 }} />
                <Typography>{user}</Typography>

                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

export default Navbar;
