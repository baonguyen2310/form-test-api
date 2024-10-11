'use client';

import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Đã xảy ra lỗi khi đăng nhập');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Đã xảy ra lỗi khi đăng ký');
    }
  };

  return (
    <div className="container">
      <h1>Đăng nhập / Đăng ký</h1>
      <form>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nhập tên người dùng"
          required
        />
        <button onClick={handleLogin}>Đăng nhập</button>
        <button onClick={handleRegister}>Đăng ký</button>
      </form>
      {message && <p>{message}</p>}

      <style jsx>{`
        .container {
          max-width: 300px;
          margin: 0 auto;
          padding: 20px;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        input {
          margin-bottom: 10px;
          padding: 5px;
        }
        button {
          margin-bottom: 10px;
          padding: 5px;
        }
      `}</style>
    </div>
  );
}