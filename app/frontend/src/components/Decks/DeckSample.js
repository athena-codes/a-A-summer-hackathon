import { Box, Typography, Button } from "@mui/material";
import React from "react";

function DeckSample({ title, subtitle, sx }) {
  return (
    <Box mt={2}>
      <Button fullWidth variant="outlined" sx={sx} color="text">
        <Box>
          <Typography>{title}</Typography>
          <Typography>{subtitle}</Typography>
        </Box>
      </Button>
    </Box>
  );
}

export default DeckSample;
