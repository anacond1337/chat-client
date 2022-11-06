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

      {/* Messages holder shit */}

      <div>
        {messages.map((mess) => <p key={uuidv4()}>{mess}</p>)}
      </div>
    </div>
  );
}

export default App;
