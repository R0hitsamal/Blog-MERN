import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import "./Navbar.css";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {styled, alpha} from "@mui/material/styles";
import {Link} from "react-router-dom";
import InputBase from "@mui/material/InputBase";

const drawerWidth = 240;
const navItems = ["Login", "SignUp"];

function DrawerAppBar(props) {
  const {window} = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const Search = styled("div")(({theme}) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    border: "2px solid rgb(210, 210, 210)",
    marginRight: "12px",
  }));

  const SearchIconWrapper = styled("div")(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "20ch",
        "&:focus": {
          width: "28ch",
        },
        "&:hover": {
          width: "28ch",
        },
      },
    },
  }));
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{textAlign: "center"}}>
      <Typography
        variant="h6"
        sx={{my: 2, fontWeight: 600, color: "rgb(17, 133, 235)"}}
      >
        <i className="fa-solid fa-blog"></i>
        GitaVerse
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <>
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{textAlign: "center"}}>
                <Link
                  to={`/${item}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width: "100%",
                    display: "block",
                  }}
                >
                  {item}
                </Link>
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box>
      <AppBar
        className="appBar"
        component="nav"
        sx={{backgroundColor: "white", color: "black", position: "static"}}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: {xs: "block"},
              marginRight: "20px",
              fontWeight: 600,
              color: "rgb(17, 133, 235)",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "1.4rem",
                alignItems: "center",
              }}
            >
              <i style={{paddingBottom: 4}} className="fa-solid fa-blog"></i>
              <Link
                style={{textDecoration: "none", color: "rgb(17, 133, 235)"}}
                to="/"
              >
                <p>GitaVerse</p>{" "}
              </Link>
            </div>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <i className="fa-solid fa-magnifying-glass"></i>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{"aria-label": "search"}}
            />
          </Search>
          <Box sx={{display: {xs: "none", md: "block"}}}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  backgroundColor:
                    item === "Login" ? "rgb(17, 133, 235)" : "white",
                  marginRight: "4px",
                  padding: "6px 14px",
                  border: "2px solid rgb(210, 210, 210)",
                  "&:hover": {
                    backgroundColor:
                      item === "Login" ? "rgb(15, 120, 210)" : "#f0f0f0",
                  },
                }}
              >
                <Link
                  to={`/${item}`}
                  style={{textDecoration: "none", color: item == "Login" ? "white" : "black",fontWeight:600}}
                >
                  <span>
                    {item === "Login" ? (
                      <i className="fa-solid fa-right-to-bracket"></i>
                    ) : (
                      <i className="fa-solid fa-user-plus"></i>
                    )}
                  </span>
                  &nbsp;
                  {item}
                </Link>
              </Button>
            ))}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{display: {md: "none"}, marginLeft: "4px"}}
          >
            <i className="fa-solid fa-bars"></i>
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: {xs: "block", md: "none"},
            "& .MuiDrawer-paper": {boxSizing: "border-box", width: drawerWidth},
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default DrawerAppBar;
