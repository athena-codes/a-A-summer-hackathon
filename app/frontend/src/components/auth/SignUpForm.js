import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";
import { FormattedMessage } from 'react-intl';

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signUp(email, password, username, firstName, lastName));
      console.log("Signed up successfully");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <form onSubmit={onSignUp}>
      <div>
        <label htmlFor='email'>
          <FormattedMessage id='email' defaultMessage='Email' />
        </label>
        <input
          name='email'
          type='email'
          // Your other props here
        />
      </div>
      <div>
        <label htmlFor='password'>
          <FormattedMessage id='password' defaultMessage='Password' />
        </label>
        <input
          name='password'
          type='password'
          // Your other props here
        />
      </div>
      <div>
        <label htmlFor='username'>
          <FormattedMessage id='username' defaultMessage='Username' />
        </label>
        <input
          name='username'
          type='text'
          // Your other props here
        />
      </div>
      <div>
        <label htmlFor='firstName'>
          <FormattedMessage id='firstName' defaultMessage='First Name' />
        </label>
        <input
          name='firstName'
          type='text'
          // Your other props here
        />
      </div>
      <div>
        <label htmlFor='lastName'>
          <FormattedMessage id='lastName' defaultMessage='Last Name' />
        </label>
        <input
          name='lastName'
          type='text'
          // Your other props here
        />
      </div>
      <button type='submit'>
        <FormattedMessage id='signUp' defaultMessage='Sign Up' />
      </button>
    </form>
  );
}

export default SignUpForm;
