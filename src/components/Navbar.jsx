import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ background: "##1976d2" }}>
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/addteamplayer">Add Player & Team</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
