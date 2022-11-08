import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import Join from './pages/Join';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
