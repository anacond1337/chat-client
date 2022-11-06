import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Join from './pages/Join';
import Chat from './pages/Chat';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Join />} />
    </Routes>
  </BrowserRouter>
);
