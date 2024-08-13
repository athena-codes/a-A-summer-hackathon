import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../store/session'
import { FormattedMessage } from 'react-intl'
import { Box, Button, Container, TextField, Typography } from '@mui/material'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()

  const validateForm = () => {
    let tempErrors = {}
    if (!email.includes('@')) tempErrors.email = 'Invalid email format.'
    if (password.length < 6)
      tempErrors.password = 'Password must be at least 6 characters.'
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const onLogin = async e => {
    e.preventDefault()
    if (!validateForm()) return
    await dispatch(login(email, password))
  }

  const handleDemoClick = async e => {
    e.preventDefault()
    const credential = 'Demo-lition@gmail.com'
    const demoPassword = 'password'
    await dispatch(login(credential, demoPassword))
  }

  return (
    <form onSubmit={onLogin}>
      <Container
        maxWidth='xs'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          border: '1px solid black',
          p: 2,
          borderRadius: 10
        }}
      >
        <Typography
          variant='h1'
          m={2}
          sx={{
            fontSize: '2rem',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Log In
        </Typography>
        <Box display='flex' flexDirection='column' p={1}>
          <Typography sx={{ fontWeight: 'bold', my: 0.5, px: 1 }}>
            <FormattedMessage id='email' defaultMessage='Email' />
          </Typography>
          <TextField
            id='outlined-email-input'
            label='Enter your Email'
            type='email'
            autoComplete='current-email'
            onChange={e => setEmail(e.target.value)}
            size='small'
            InputProps={{ sx: { borderRadius: 100 } }}
            error={!!errors.email}
            helperText={errors.email}

          />
        </Box>
        <Box display='flex' flexDirection='column' p={1}>
          <Typography sx={{ fontWeight: 'bold', my: 0.5, px: 1 }}>
            <FormattedMessage id='password' defaultMessage='Password' />
          </Typography>
          <TextField
            id='outlined-password-input'
            label='Enter your Password'
            type='password'
            autoComplete='current-password'
            onChange={e => setPassword(e.target.value)}
            size='small'
            InputProps={{ sx: { borderRadius: 100 } }}
            error={!!errors.password}
            helperText={errors.password}
            
          />
          <Button
            variant='contained'
            type='submit'
            color='primary'
            sx={{
              borderRadius: 100,
              mt: 2,
              fontWeight: '500'
            }}
          >
            <FormattedMessage id='logIn' defaultMessage='Log In' />
          </Button>
          <Button
            onClick={handleDemoClick}
            type='submit'
            sx={{
              borderRadius: 100,
              mt: 1
            }}
          >
            Demo
          </Button>
        </Box>
      </Container>
    </form>
  )
}

export default LoginForm
