import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signUp } from '../../store/session'
import { FormattedMessage } from 'react-intl'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'


const SignUpForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const onSignUp = async e => {
    e.preventDefault()
    try {
      await dispatch(signUp(email, password, username, firstName, lastName))
      console.log('Signed up successfully')
      history.push('/home')
    } catch (error) {
      console.error('Error signing up:', error.message)
    }
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        <label htmlFor='email'>
          <FormattedMessage id='email' defaultMessage='Email' />
        </label>
        <input
          name='email'
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)} // Ensures state updates when user types in the email field
          required
        />
      </div>
      <div>
        <label htmlFor='password'>
          <FormattedMessage id='password' defaultMessage='Password' />
        </label>
        <input
          name='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)} // Updates password state
          required
        />
      </div>
      <div>
        <label htmlFor='username'>
          <FormattedMessage id='username' defaultMessage='Username' />
        </label>
        <input
          name='username'
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)} // Updates username state
        />
      </div>
      <div>
        <label htmlFor='firstName'>
          <FormattedMessage id='firstName' defaultMessage='First Name' />
        </label>
        <input
          name='firstName'
          type='text'
          value={firstName}
          onChange={e => setFirstName(e.target.value)} // Updates firstName state
        />
      </div>
      <div>
        <label htmlFor='lastName'>
          <FormattedMessage id='lastName' defaultMessage='Last Name' />
        </label>
        <input
          name='lastName'
          type='text'
          value={lastName}
          onChange={e => setLastName(e.target.value)} // Updates lastName state
        />
      </div>
      <button type='submit'>
        <FormattedMessage id='signUp' defaultMessage='Sign Up' />
      </button>
    </form>
  )
}

export default SignUpForm
