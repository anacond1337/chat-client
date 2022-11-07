import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Join from './pages/Join';


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;