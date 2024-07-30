import { Link, Container } from "@mui/material";
import React from "react";
import FlagGrid from "./FlagGrid";

function WelcomePage() {
  return (
    <div>
      <h1>Select Your Language</h1>
      <Container>
        <FlagGrid />
      </Container>
      <p>
        Already a User?
        <Link href="/login" underline="none">
          {" Log in"}
        </Link>
      </p>
    </div>
  );
}

export default WelcomePage;
