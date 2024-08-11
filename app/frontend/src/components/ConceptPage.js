import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchConcepts } from '../store/actions/conceptsActions'
import { Box, Button, Container, Grid, LinearProgress } from '@mui/material'
import { fetchSingleUser } from '../store/actions/usersActions'
import { NavLink } from "react-router-dom";


function ConceptPage() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user)
  const concepts = Object.values(useSelector(state => state.concepts))
  const [loading, setLoading] = useState(true);
  console.log("CONCEPTPAGE", concepts)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchConcepts());
      await dispatch(fetchSingleUser(user.uid));
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const conceptsFilter = concepts.filter((concept) => concept.level === user.level);
  console.log("user level", user.level)
  console.log("filter",conceptsFilter)

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Container>
      <Box>
        <Box display='flex' flexDirection='column' alignItems='center'>
          <h1>Select a Beginner Concept</h1>
          <p>
            These are the recommended concepts based on your selected
            proficiency level.
          </p>
          <p>Pass all the concepts to unlock the next proficiency level.</p>
        </Box>
        <Box px={50}>
          <LinearProgress
            variant='determinate'
            value={50}
            sx={{ height: 25 }}
          />
        </Box>
      </Box>

      <Grid container spacing={10} justifyContent='center' py={5}>
        {conceptsFilter.map(concept => (
          <Grid item key={concept.id}>
            <Button component={NavLink} to={`/concepts/${concept.id}`}>
                <Box display='flex' flexDirection='column'>
                  <p>{concept.concept_name}</p> <p>{concept.level}</p>{' '}
                  <LinearProgress
                    variant='determinate'
                    value={50}
                    sx={{ height: 15 }}
                  />
                </Box>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ConceptPage
