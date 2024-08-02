// src/components/Concepts.js
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchConcepts } from '../store/concepts'

function Concepts () {
  const dispatch = useDispatch()
  const concepts = useSelector(state => state.concepts.items)
  const isLoading = useSelector(state => state.concepts.loading)

  useEffect(() => {
    dispatch(fetchConcepts())
  }, [dispatch])

  if (isLoading) {
    return <div>Loading concepts...</div>
  }

  return (
    <div>
      <h1>Concepts</h1>
      <ul>
        {concepts.map(concept => (
          <li key={concept.id}>
            {concept.name} - Level: {concept.level}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Concepts
