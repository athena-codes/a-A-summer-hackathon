import { Box, Button, Container, Grid, LinearProgress } from "@mui/material";
import React from "react";

function TopicsPage() {
    return (
        <Container>
            <Box>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <h1>Select a Basic Vocabulary Topic</h1>
                    <p>
                        Select any topic to begin. In order to pass a topic, you must score at least 80% three times.
                    </p>

                    <p>Pass all the topics to unlock the next concept.</p>
                </Box>
                <Box px={50}>
                    <LinearProgress
                        variant="determinate"
                        value={50}
                        sx={{ height: 25 }}
                    />
                </Box>
            </Box>

            <Grid container spacing={10} justifyContent="center" py={5}>
                <Grid item>
                    <Button>
                        <Box display="flex" flexDirection="column">
                            <p>Common Nous</p>
                            <p>explanation</p>
                            <LinearProgress
                                variant="determinate"
                                value={50}
                                sx={{ height: 15 }}
                            />
                        </Box>
                    </Button>
                </Grid>

                <Grid item>
                    <Button>
                        <Box display="flex" flexDirection="column">
                            <p>Pronouns</p>
                            <p>explanation</p>
                            <LinearProgress
                                variant="determinate"
                                value={50}
                                sx={{ height: 15 }}
                            />
                        </Box>
                    </Button>
                </Grid>
                <Grid item>
                    <Button>
                        <Box display="flex" flexDirection="column">
                            <p>Basic Verbs</p>
                            <p>explanation</p>
                            <LinearProgress
                                variant="determinate"
                                value={50}
                                sx={{ height: 15 }}
                            />
                        </Box>
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={10} justifyContent="center" py={5}>
                <Grid item>
                    <Button>
                        <Box display="flex" flexDirection="column">
                            <p>Adjectives</p>
                            <p>explanation</p>
                            <LinearProgress
                                variant="determinate"
                                value={50}
                                sx={{ height: 15 }}
                            />
                        </Box>
                    </Button>
                </Grid>
                <Grid item>
                    <Button>
                        <Box display="flex" flexDirection="column">
                            <p>Numbers</p>
                            <p>explanation</p>
                            <LinearProgress
                                variant="determinate"
                                value={50}
                                sx={{ height: 15 }}
                            />
                        </Box>
                    </Button>
                </Grid>
                <Grid item>
                    <Button>
                        <Box display="flex" flexDirection="column">
                            <p>Days and Months</p>
                            <p>explanation</p>
                            <LinearProgress
                                variant="determinate"
                                value={50}
                                sx={{ height: 15 }}
                            />
                        </Box>
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default TopicsPage;
