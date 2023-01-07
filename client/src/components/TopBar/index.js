import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Avatar, Button } from "@mui/material";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";

export default function MenuAppBar({ username, image, showModal }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1, margin: 0, height: "40px" }}>
      <AppBar position="static" style={{ margin: 0, height: "40px" }}>
        <Toolbar style={{ background: "#F2F3F7", height: "40px" }}>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "black",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            Dashboard
          </Typography>

          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              startIcon={<PostAddRoundedIcon />}
              style={{
                background: "#6765DE",
                borderRadius: "20px",
                textTransform: "none",
              }}
              disableElevation
              onClick={showModal}
            >
              Upload
            </Button>
            <IconButton style={{ margin: "0px 15px" }}>
              <NotificationsActiveOutlinedIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              color="inherit"
              style={{ padding: "8px" }}
            >
              <Avatar
                src={image}
                style={{ height: "32px", width: "32px" }}
              ></Avatar>
            </IconButton>
            {/* <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu> */}
            <Box>
              <Typography
                style={{
                  color: "#898EA9",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {username}
              </Typography>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
