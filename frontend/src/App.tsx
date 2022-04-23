import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [name, setName] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        setName(data.name);
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <div className="App">
      <Navbar name={name} setName={setName} />
      <main className="form-signin">
        <Routes>
          <Route path="/" element={<Home name={name} />} />
          <Route path="/login" element={<Login setName={setName} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
