import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import {Login} from './Login'
import { Register } from './Register';
import './App.css'
import Task from './Task';
const App = () => {
  

  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Task />} />
        </Routes>
    </Router>
    </div>
  );
};

export default App;
