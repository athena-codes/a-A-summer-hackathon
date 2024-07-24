import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signUp } from '../../store/session' // Ensure this path is correct

const SignUpForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const onSignUp = async e => {
    e.preventDefault()
    await dispatch(signUp(email, password))
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='email' // Change to type='email' for appropriate input validation
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  )
}

export default SignUpForm
