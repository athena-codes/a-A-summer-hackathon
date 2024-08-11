import { Link, Container, Box, Typography, Button } from "@mui/material";
import React from "react";
import LanguageSelector from "./LanguageSelector";
import InfiniteScroll from "./InfiniteLogIn";
import { NavLink } from "react-router-dom";

function WelcomePage({ setLocale }) {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <h1>Select Your Language</h1>
      <Container>
        <LanguageSelector setLocale={setLocale} />
      </Container>
        <Container>
          <Typography align="center" mt="50px" variant="h5">Already a User?</Typography>
          <Box component={NavLink} to='/login'>
            <InfiniteScroll />
            {/* {" Log in"} */}
          </Box>
        </Container>
    </Box>
  );
}

export default WelcomePage;
