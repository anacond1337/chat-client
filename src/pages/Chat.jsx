import {
  TextField, Button, Container, CircularProgress, Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import SignalWifiBadIcon from '@mui/icons-material/SignalWifiBad';
import Message from '../components/Message';
import { UserContext } from '../context/UserContext';

const socket = io.connect('ws://localhost:8000');

const sendMessage = (payload, user) => {
  socket.emit('client_msg', { payload, user });
};

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    socket.on('server_msg', (stream) => {
      setMessages((oldMessage) => [...oldMessage, stream]);
    });

    socket.io.on('error', () => {
      setIsError(true);
      setIsLoading(false);
    });

    socket.on('connect', () => {
      setIsLoading(false);
      setIsError(false);
    });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput('');
    sendMessage(input, user);
  };

  /* Loading handling. */
  if (isLoading) {
    return (
      <Container sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh', flexDirection: 'column',
      }}
      >
        <CircularProgress />
        <Typography>Connecting...</Typography>
      </Container>
    );
  }

  /* Error handling. */
  if (isError) {
    return (
      <Container sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh', flexDirection: 'column',
      }}
      >
        <SignalWifiBadIcon />
        <Typography color="error">Failed to connect to the server!</Typography>
      </Container>
    );
  }

  return (
    <Container>

      {/* Messages holder */}

      <Container sx={{ height: '80vh', overflowY: 'auto', marginTop: '2.5rem' }}>
        {messages.map((mess) => (
          <Message
            msg={mess}
            isMyMessage={socket.id === mess.id}
            key={uuidv4()}
          />
        ))}
      </Container>

      {/* Form */}
      <Container
        sx={{
          display: 'flex', position: 'fixed', bottom: 0, marginBottom: '1.5rem',
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          component="span"
          fullWidth
          required
          id="fullWidth"
          placeholder="Write something..."
          onChange={({ target }) => setInput(target.value)}
          value={input}
        />
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </Container>
    </Container>
  );
}

export default Chat;
