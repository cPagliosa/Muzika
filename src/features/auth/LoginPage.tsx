import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from './authSlice';
import { isValidEmail } from '../../utils/validators';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setLocalError('Formato de email inválido.');
      return;
    }
    if (password.length < 6) {
      setLocalError('Senha deve ter ao menos 6 caracteres.');
      return;
    }
    setLocalError(null);
    dispatch(login({ email, password }) as any);
    navigate('/home');
  };

  return (
    <div style={{ maxWidth: 420, margin: '2rem auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label><br/>
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Senha</label><br/>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {localError && <div style={{ color: 'red' }}>{localError}</div>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}