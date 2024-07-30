import { Link, Container, Box } from "@mui/material";
import React from "react";
import LanguageSelector from "./LanguageSelector";

function WelcomePage({setLocale}) {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <h1>Select Your Language</h1>
      <Container>
        <LanguageSelector setLocale={setLocale}/>
      </Container>
      <h3>
        Already a User?
        <Link href="/login" underline="none">
          {" Log in"}
        </Link>
      </h3>
    </Box>
  );
}

export default WelcomePage;
