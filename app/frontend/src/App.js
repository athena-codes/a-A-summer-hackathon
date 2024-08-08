import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LoginForm from './components/auth/LoginForm'
import SignUpForm from './components/auth/SignUpForm'
import NavBar from './components/NavBar'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { authenticate } from './store/session'
import { auth } from './firebase/firebaseConfig'
import HomePage from './components/Homepage'
import WelcomePage from './components/WelcomePage'
import ConceptPage from './components/ConceptPage'

function App({ locale, setLocale }) {
  const [loaded, setLoaded] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged(async user => {
      if (user) {
        await dispatch(authenticate()) // Make sure this properly sets the user
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
      setLoaded(true)
    })
  }, [dispatch])

  if (!loaded) {
    return <div>Loading...</div> // or any other loading indicator
  }

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          {currentUser ? <ConceptPage /> : <WelcomePage setLocale={setLocale} />}
        </Route>
        <Route path='/login'>
          {currentUser ? <Redirect to='/' /> : <LoginForm />}
        </Route>
        <Route path='/sign-up'>
          {currentUser ? <Redirect to='/' /> : <SignUpForm setLocale={setLocale} locale={locale} />}
        </Route>
        {/* Ensure your ProtectedRoute component is redirecting correctly */}
        <ProtectedRoute path='/home'>
          {currentUser ? <HomePage /> : <Redirect to='/login' />}
        </ProtectedRoute>
      </Switch>
    </>
  )
}


export default App
