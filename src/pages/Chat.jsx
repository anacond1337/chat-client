import {
  TextField, Button, Container,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import Message from '../components/Message';
import { UserContext } from '../context/UserContext';

const socket = io.connect('http://localhost:8000');

const sendMessage = (payload, user) => {
  socket.emit('client_msg', { payload, user });
};

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    socket.on('server_msg', (stream) => {
      setMessages((oldMessage) => [...oldMessage, stream]);
    });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput('');
    sendMessage(input, user);
  };

  return (
    <Container>

      {/* Messages holder */}

      <Container>
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
