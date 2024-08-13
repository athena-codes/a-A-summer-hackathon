import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Button, Container, Grid, LinearProgress } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { fetchConcepts } from '../store/concepts'

import businessImage from '../images/business_8729020.png'
import dictionaryImage from '../images/dictionary-alt_17390466.png'
import grammarImage from '../images/grammar_3838474.png'


function ConceptPage () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const concepts = Object.values(useSelector(state => state.concepts.concepts))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await dispatch(fetchConcepts(user.level))
      setLoading(false)
    }

    fetchData()
  }, [dispatch])

  if (loading) {
    return <LinearProgress />
  }

  const getImageForConcept = conceptName => {
    switch (conceptName) {
      case 'Grammar':
        return grammarImage
      case 'Vocabulary':
        return dictionaryImage
      case 'Everyday Situations':
        return businessImage
      default:
        return null
    }
  }

  return (
    <Container>
      <Box>
        <Box display='flex' flexDirection='column' alignItems='center'>
          <h1>Select a {user.level} Concept</h1>
          <p>
            These are the recommended concepts based on your current proficiency
            level.
          </p>
          {user.level !== 'Advanced' ? (
            <p>Pass all the concepts to unlock the next proficiency level.</p>
          ) : (
            <p>
              Pass all the concepts to get your Lingo.ai Advanced Champion
              badge.
            </p>
          )}
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
        {concepts.map(concept => (
          <Grid item key={concept.id}>
            <Button component={NavLink} to={`/concepts/${concept.id}`}>
              <Box
                display='flex'
                flexDirection='column'
                width='200px'
                alignItems='center'
              >
                {/* Render the image */}
                <img
                  src={getImageForConcept(concept.concept_name)}
                  alt={concept.concept_name}
                  style={{
                    width: '100px',
                    height: '100px',
                    marginBottom: '10px'
                  }}
                />
                <h3>{concept.concept_name}</h3>
                <p>{concept.level}</p>
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
