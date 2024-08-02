import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [language, setLanguage] = React.useState("");

  const handleChange = (event) => {
    setLanguage(event.target.value);
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
              // color: "primary.main",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            <FormattedMessage
              id="createYourAccount"
              defaultMessage="Create your Account"
            />
          </Typography>
          <Typography>Create your Account</Typography>
        </Box>
        <Box display="flex" flexDirection="column" p={1}>
          <Typography sx={{ fontWeight: "bold", my: 0.5, px: 1 }}>
            <FormattedMessage id="firstName" defaultMessage="First Name" />
          </Typography>

          {/* <input
          name='firstName'
          type='text'
          value={firstName}
          onChange={e => setFirstName(e.target.value)} // Updates firstName state
        /> */}
          <TextField
            id="outlined-username-input"
            // label="Enter your first name"
            type="text"
            autoComplete="current-username"
            onChange={(e) => setFirstName(e.target.value)} // Updates firstName state
            size="small"
            InputProps={{ sx: { borderRadius: 100 } }}
            required
          />
        </Box>
        <Box display="flex" flexDirection="column" p={1}>
          <Typography sx={{ fontWeight: "bold", my: 0.5, px: 1 }}>
            <FormattedMessage id="lastName" defaultMessage="Last Name" />
          </Typography>
          {/* <input
          name='lastName'
          type='text'
          value={lastName}
          onChange={e => setLastName(e.target.value)} // Updates lastName state
        /> */}
          <TextField
            id="outlined-username-input"
            // label="Enter your last name"
            type="text"
            autoComplete="current-username"
            onChange={(e) => setLastName(e.target.value)} // Updates lastName state
            size="small"
            InputProps={{ sx: { borderRadius: 100 } }}
            required
          />
        </Box>
        <Box display="flex" flexDirection="column" p={1}>
          <Typography sx={{ fontWeight: "bold", my: 0.5, px: 1 }}>
            <FormattedMessage id="username" defaultMessage="Username" />
          </Typography>

          {/* <input
          name='username'
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)} // Updates username state
        /> */}
          <TextField
            id="outlined-username-input"
            // label="Enter your username"
            type="text"
            autoComplete="current-username"
            onChange={(e) => setUsername(e.target.value)} // Updates username state
            size="small"
            InputProps={{ sx: { borderRadius: 100 } }}
            required
          />
        </Box>
        <Box display="flex" flexDirection="column" p={1}>
          <Typography sx={{ fontWeight: "bold", my: 0.5, px: 1 }}>
            <FormattedMessage id="email" defaultMessage="Email" />
          </Typography>
          {/* <input
          name='email'
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)} // Ensures state updates when user types in the email field
          required
        /> */}
          <TextField
            id="outlined-email-input"
            // label="Enter your Email"
            type="email"
            autoComplete="current-email"
            onChange={(e) => setEmail(e.target.value)} // Ensures state updates when user types in the email field
            size="small"
            InputProps={{ sx: { borderRadius: 100 } }}
            required
          />
        </Box>
        <Box display="flex" flexDirection="column" p={1}>
          <Typography sx={{ fontWeight: "bold", my: 0.5, px: 1 }}>
            <FormattedMessage id="password" defaultMessage="Password" />
          </Typography>
          {/* <input
          name='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)} // Updates password state
          required
        /> */}
          <TextField
            id="outlined-password-input"
            // label="Enter your Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)} // Updates password state
            size="small"
            InputProps={{ sx: { borderRadius: 100 } }}
            required
          />
        </Box>
        <Box display="flex" flexDirection="column" p={1}>
          <Typography sx={{ fontWeight: "bold", my: 0.5, px: 1 }}>
            <FormattedMessage
              id="confirmPassword"
              defaultMessage="Confirm Password"
            />
          </Typography>
          {/* <input
          name='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)} // Updates password state
          required
        /> */}
          <TextField
            id="outlined-password-input"
            // label="Enter your Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)} // Updates password state
            size="small"
            InputProps={{ sx: { borderRadius: 100 } }}
            required
          />
        </Box>

        <Box display="flex" flexDirection="column" p={1}>
          <Typography sx={{ fontWeight: "bold", my: 0.5, px: 1 }}>
            <FormattedMessage
              id="selectedLanguage"
              defaultMessage="Native Language"
            />
          </Typography>
          {/* <input
          name='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)} // Updates password state
          required
        /> */}
          <Select value={language} onChange={handleChange}>
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
        {/* <button type="submit">
          <FormattedMessage id="signUp" defaultMessage="Sign Up" />
        </button> */}
      </Container>
    </form>
  );
};

export default SignUpForm;
