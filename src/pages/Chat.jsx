import {
  Avatar, TextField, Button, Container,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const socket = io.connect('http://localhost:8000');

const sendMessage = (payload) => {
  socket.emit('client_msg', payload);
};

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('server_msg', (stream) => {
      setMessages((oldMessage) => [...oldMessage, stream]);
    });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput('');
    sendMessage(input);
  };

  return (
    <div>
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Write something..."
          onChange={({ target }) => setInput(target.value)}
          value={input}
        />
        <button type="submit">Send</button>
      </form>

      {/* Messages holder */}

      <div>
        {messages.map((mess) => {
          if (socket.id === mess.id) {
            return <h1 key={uuidv4()}>{mess.msg}</h1>;
          }
          return <p key={uuidv4()}>{mess.msg}</p>;
        })}
      </div>
      <Avatar sx={{ bgcolor: 'green' }}>A</Avatar>
      <Container sx={{ display: 'flex' }}>
        <TextField component="span" fullWidth id="fullWidth" />
        <Button component="span" variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </Container>
    </div>
  );
}

export default App;
