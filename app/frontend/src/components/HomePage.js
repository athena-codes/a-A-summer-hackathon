import React from 'react'

function HomePage() {
    return (
        <Container>
            <Box>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <h1>Welcome, {user.email}.</h1>
                    <Link href='/concepts'
                        // exact={true}activeClassName='active'
                        underline="none">
                        <Button
                            variant="contained"
                            color="primary"
                        >
                            Start Learning Now
                        </Button>
                    </Link>
                    <h2 style={{ padding: "16px 0px", }}>Your Latest Lingo.ai Progress</h2>
                </Box>
                <Grid container rowSpacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                    {data.map((row, index) => (
                        <React.Fragment key={index}>
                            <Grid item xs={4}>
                                <Typography fontWeight="bold">{row.left}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {row.right}
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>
            </Box>
        </Container>
    )
}

export default HomePage
