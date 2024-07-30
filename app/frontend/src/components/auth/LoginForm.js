import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import { FormattedMessage } from "react-intl";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    await dispatch(login(email, password));
  };

  return (
    <form onSubmit={onLogin}>
      <div>
        <label htmlFor="email">
          <FormattedMessage id="email" defaultMessage="Email" />
        </label>
        <input
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">
          <FormattedMessage id="password" defaultMessage="Password" />
        </label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">
      <FormattedMessage id='logIn' defaultMessage='Log In' />
      </button>
    </form>
  );
};

export default LoginForm;
