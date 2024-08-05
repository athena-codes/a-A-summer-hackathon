import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const SignUpForm = ({ locale, setLocale }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (event) => {
    setLocale(event.target.value);
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signUp(email, password, username, firstName, lastName));
      console.log("Signed up successfully");
      history.push("/home");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  const defaultMessages = {
    email: "Email",
    password: "Password",
    username: "Username",
    firstName: "First Name",
    lastName: "Last Name",
    signUp: "Sign Up",
    logIn: "Log In",
    createYourAccount: "Create your Account",
    confirmPassword: "Confirm Password",
    nativeLanguage: "Native Language",
  };

  const getFieldLabel = (id) => {
    const defaultMessage = defaultMessages[id] || id;

    return (
      <Box display="flex" alignItems="center">
        <Typography sx={{ fontWeight: "bold", my: 0.5, px: 1 }}>
          <FormattedMessage id={id} defaultMessage={defaultMessage} />
        </Typography>
        {locale !== "en" && (
          <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
            {defaultMessage}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <form onSubmit={onSignUp}>
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          border: "1px solid black",
          p: 10,
          borderRadius: 10,
        }}
      >
       <Box display="flex" flexDirection="column" alignItems="center" mb="10px">
          <Typography
            variant="h1"
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            <FormattedMessage id="createYourAccount" defaultMessage={defaultMessages["createYourAccount"]} />
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" p={1}>
          {getFieldLabel("firstName")}
          <TextField
            id="outlined-firstName-input"
            type="text"
            autoComplete="given-name"
            onChange={(e) => setFirstName(e.target.value)}
            size="small"
            InputProps={{ sx: { borderRadius: 100 } }}
            required
          />
        </Box>

        <Box display="flex" flexDirection="column" p={1}>
          {getFieldLabel("lastName")}
          <TextField
            id="outlined-lastName-input"
            type="text"
            autoComplete="family-name"
            onChange={(e) => setLastName(e.target.value)}
            size="small"
            InputProps={{ sx: { borderRadius: 100 } }}
            required
          />
        </Box>

        <Box display="flex" flexDirection="column" p={1}>
          {getFieldLabel("username")}
          <TextField
            id="outlined-username-input"
            type="text"
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
            size="small"
            InputProps={{ sx: { borderRadius: 100 } }}
            required
          />
        </Box>

        <Box display="flex" flexDirection="column" p={1}>
          {getFieldLabel("email")}
          <TextField
            id="outlined-email-input"
            type="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            size="small"
            InputProps={{ sx: { borderRadius: 100 } }}
            required
          />
        </Box>

        <Box display="flex" flexDirection="column" p={1}>
          {getFieldLabel("password")}
          <TextField
            id="outlined-password-input"
            type="password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            size="small"
            InputProps={{ sx: { borderRadius: 100 } }}
            required
          />
        </Box>

        <Box display="flex" flexDirection="column" p={1}>
          {getFieldLabel("confirmPassword")}
          <TextField
            id="outlined-confirm-password-input"
            type="password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            size="small"
            InputProps={{ sx: { borderRadius: 100 } }}
            required
          />
        </Box>

        <Box display="flex" flexDirection="column" p={1}>
          <Typography sx={{ fontWeight: "bold", my: 0.5, px: 1 }}>
            {getFieldLabel("nativeLanguage")}
          </Typography>
          <Select
            value={locale}
            onChange={handleChange}
            sx={{ borderRadius: 10 }}
            size="small"
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="fr">Français</MenuItem>
            <MenuItem value="ko">한국어</MenuItem>
            <MenuItem value="es">Español</MenuItem>
            <MenuItem value="ja">日本語</MenuItem>
            <MenuItem value="vi">Tiếng Việt</MenuItem>
            <MenuItem value="zh">中文</MenuItem>
            <MenuItem value="hi">हिंदी</MenuItem>
          </Select>
        </Box>

        <Button
          variant="contained"
          type="submit"
          color="primary"
          sx={{
            borderRadius: 100,
            mt: 4,
            fontWeight: "500",
          }}
        >
          <FormattedMessage id="signUp" defaultMessage="Sign Up" />
        </Button>
      </Container>
    </form>
  );
};

export default SignUpForm;
