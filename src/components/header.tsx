import React from "react";
import { AppBar, Toolbar, Typography, InputBase, IconButton, Box, Avatar, Menu, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ width: "100%", top: 0 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, margin: "20px 0px" }}>
          <img src="/logo.png" alt="Vivactive Logo" style={{ height: 45 }} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", bgcolor: "rgba(0,0,0,0.05)", borderRadius: 1, px: 2 }}>
          <SearchIcon />
          <InputBase placeholder="Rechercher" sx={{ ml: 1, flex: 1 }} inputProps={{ "aria-label": "search" }} />
        </Box>
        <IconButton onClick={handleMenu} color="inherit">
          <Avatar alt="Photo de profil" src="/path/to/avatar.jpg" />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Profil</MenuItem>
          <MenuItem onClick={handleClose}>Déconnexion</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
