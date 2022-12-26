import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory, Link } from "react-router-dom";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory()

  const handleLogout = ()=>{
    localStorage.clear()
    // history.push("/", { from: "Products" })
    window.location.reload()
  }


  function RegPageButtons() {
    // console.log('RegPageButtons')
    return (
      <Link to="/">
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
        >
          Back to explore
        </Button>
      </Link>
    );
  }

  function UserLoggedOutButtons() {
    // console.log('UserLoggedOutButtons', hasHiddenAuthButtons)
    return(
      <Stack direction="row" spacing={2}>
        <Button className="button" variant="text" onClick={() => history.push("/login", { from: "Products" })}>
          LOGIN
        </Button>
        <Button className="button" variant="contained" onClick={() => history.push("/register", { from: "Products" })}>
          REGISTER
        </Button>
      </Stack>
    );
  }
  function UserLoggedInButtons(){
    // console.log('UserLoggedInButtons', hasHiddenAuthButtons)
    const username = localStorage.getItem('username')
    return (
  <Stack direction="row" spacing={2}>
 <Avatar alt={username} src="avatar.png" />
 <p>{username}</p>
  <Button className="button" variant="text" onClick={handleLogout}>
    LOGOUT
  </Button>
</Stack>
)
}



function HeaderButtons(){
const userToken = localStorage.getItem('token')
if (hasHiddenAuthButtons) {
  return <RegPageButtons />
}
if (userToken === null) {
  return <UserLoggedOutButtons />
}
if (userToken !== null) {
  return <UserLoggedInButtons />
}





}

  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {/* User is logged in */}
{children}
<HeaderButtons />

      {/* User is logged out */}
    </Box>
  );
};

export default Header;
