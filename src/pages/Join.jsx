import React, { useContext, useState } from 'react';
import {
  Container, Avatar, Typography, Box, TextField, Button,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Join() {
  const { dispatch } = useContext(UserContext);

  const [userInput, setUserInput] = useState('');
  const [channelInput, setChannelInput] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: 'JOIN', payload: { user: userInput, channel: channelInput } });
    setUserInput('');
    setChannelInput('');
    navigate('/chat');
  }

  return (
    <Container component="main" maxWidth="sm">
      {/* Head */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          m: '1rem',
          mt: '12rem',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.primary' }}>
          <ChatIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Chat with cool people</Typography>
      </Box>

      {/* Form and join */}
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <Box component="form" onSubmit={handleSubmit}>
        {/* Username input */}
        <TextField
          margin="normal"
          required
          fullWidth
          label="Username"
          autoFocus
          onChange={({ target }) => setUserInput(target.value)}
          value={userInput}
        />

        {/* Submit button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Join the chat!
        </Button>
      </Box>
    </Container>
  );
}

export default Join;
