import { Link, Container, Box, Typography } from "@mui/material";
import React from "react";
import LanguageSelector from "./LanguageSelector";
import InfiniteScroll from "./InfiniteLogIn";

function WelcomePage({ setLocale }) {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <h1>Select Your Language</h1>
      <Container>
        <LanguageSelector setLocale={setLocale} />
      </Container>
        <Container>
          <Typography align="center" mt="50px" variant="h5">Already a User?</Typography>
          <Link href="/login" underline="none">
            <InfiniteScroll />
            {/* {" Log in"} */}
          </Link>
        </Container>
    </Box>
  );
}

export default WelcomePage;
