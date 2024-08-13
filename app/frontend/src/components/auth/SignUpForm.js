import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { signUp } from "../../store/session";
import { login } from "../../store/session";
import InfoIcon from '@mui/icons-material/Info'

const SignUpForm = ({ locale, setLocale }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [level, setLevel] = useState('')
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLanguageChange = event => {
    setLocale(event.target.value)
  }

  const handleLevelChange = event => {
    const value = event.target.value
    setLevel(value)
  }

  const handleDemoClick = async e => {
    e.preventDefault()
    const credential = 'Demo-lition@gmail.com'
    const password = 'password'
    await dispatch(login(credential, password))
  }

  const validateForm = () => {
    let tempErrors = {}
    if (!email.includes('@')) tempErrors.email = 'Invalid email format.'
    if (password.length < 6)
      tempErrors.password = 'Password must be at least 6 characters.'
    if (password !== confirmPassword)
      tempErrors.confirmPassword = 'Passwords do not match.'
    if (username.trim() === '') tempErrors.username = 'Username is required.'
    if (firstName.trim() === '')
      tempErrors.firstName = 'First name is required.'
    if (lastName.trim() === '') tempErrors.lastName = 'Last name is required.'
    if (level === '') tempErrors.level = 'Proficiency level is required.'
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const onSignUp = async e => {
    e.preventDefault()
    if (!validateForm()) return
    try {
      await dispatch(
        signUp(email, password, username, firstName, lastName, locale, level)
      )
      console.log('Signed up successfully')
      history.push('/home')
    } catch (error) {
      console.error('Error signing up:', error.message)
    }
  }

  const getFieldLabel = id => {
    return (
      <Typography sx={{ fontWeight: 'bold', my: 0.5, px: 1 }}>
        <FormattedMessage id={id} defaultMessage={defaultMessages[id]} />
      </Typography>
    )
  }

  const defaultMessages = {
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    username: 'Username',
    firstName: 'First Name',
    lastName: 'Last Name',
    signUp: 'Sign Up',
    nativeLanguage: 'Native Language',
    englishProficiency: 'English Proficiency Level'
  }

  return (
    <form onSubmit={onSignUp}>
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
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          mb='10px'
        >
          <Typography
            variant="h1"
            m={2}
            sx={{
              // color: "primary.main",
              fontSize: "2rem",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Create your Account
          </Typography>
        </Box>

        {[
          'firstName',
          'lastName',
          'username',
          'email',
          'password',
          'confirmPassword'
        ].map(field => (
          <Box display='flex' flexDirection='column' p={1} key={field}>
            {getFieldLabel(field)}
            <TextField
              id={`outlined-${field}-input`}
              type={
                field.includes('password')
                  ? 'password'
                  : field === 'email'
                  ? 'email'
                  : 'text'
              }
              value={eval(field)}
              onChange={e =>
                eval(`set${field.charAt(0).toUpperCase() + field.slice(1)}`)(
                  e.target.value
                )
              }
              error={!!errors[field]}
              helperText={errors[field]}
              InputProps={{ sx: { borderRadius: 100 } }}
            />
          </Box>
        ))}

        <Box display='flex' flexDirection='column' p={1}>
          {getFieldLabel('nativeLanguage')}
          <Select
            value={locale}
            onChange={handleLanguageChange}
            sx={{ borderRadius: 10 }}
            size='small'
          >
            <MenuItem value='en'>English</MenuItem>
            <MenuItem value='fr'>Français</MenuItem>
            <MenuItem value='ko'>한국어</MenuItem>
            <MenuItem value='es'>Español</MenuItem>
            <MenuItem value='ja'>日本語</MenuItem>
            <MenuItem value='vi'>Tiếng Việt</MenuItem>
            <MenuItem value='zh'>中文</MenuItem>
            <MenuItem value='hi'>हिंदी</MenuItem>
          </Select>
        </Box>

        <Box display='flex' flexDirection='column' p={1}>
          {getFieldLabel('englishProficiency')}
          <Select
            value={level}
            onChange={handleLevelChange}
            sx={{ borderRadius: 10 }}
            size='small'
          >
            <MenuItem value="Beginner">1: Beginner</MenuItem>
            <MenuItem value="Intermediate">2: Intermediate</MenuItem>
            <MenuItem value="Advanced">3: Advanced</MenuItem>
          </Select>
        </Box>

<Box>
        <Button
          variant='contained'
          type='submit'
          color='primary'
          sx={{
            borderRadius: 100,
            mt: 1,
          }}>
            Demo
          </Button>
        </Box>
      </Container>
    </form>
  )
}

export default SignUpForm
