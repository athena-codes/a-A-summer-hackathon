import { Box, Button, Container, Link, Grid, LinearProgress, Typography } from "@mui/material";
import React from "react";

function Footer() {
    return (
        <Container style={{ padding: "10px 0px 20px 0px", textAlign: "center" }}>
            <Typography variant="overline" display="block" gutterBottom>
                Developed by:&nbsp;
                <Link href="https://github.com/athena-codes" target="_blank" rel="noopener noreferrer">Athena Chiarello</Link>&nbsp;&#183;&nbsp;
                <Link href="https://github.com/craftycarmen" target="_blank" rel="noopener noreferrer">Carmen Shiu</Link>&nbsp;&#183;&nbsp;
                <Link href="https://github.com/glmenta" target="_blank" rel="noopener noreferrer">Geryko Menta</Link>&nbsp;&#183;&nbsp;
                <Link href="https://github.com/pennywangpw" target="_blank" rel="noopener noreferrer">Penny Wang</Link>&nbsp;&#183;&nbsp;
                <Link href="https://github.com/vth-co" target="_blank" rel="noopener noreferrer">Vu Co</Link>
            </Typography>
        </Container>
    )
}

export default Footer
