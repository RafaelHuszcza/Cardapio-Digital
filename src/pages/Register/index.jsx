import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import styles from './styles.module.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== passwordConfirmation) {
      return setError('As senhas não são iguais');
    }
    try {
      setError('');
      setLoading(true);
      const response = await register(email, password, name);
      if (response.status === 201) {
        window.location.href = '/login';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <h1 className={styles.title}>Cadastrar</h1>
        {error && <p className={styles.error}>{error}</p>}
        <input
          className={styles.input}
          type='text'
          placeholder='Nome'
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          className={styles.input}
          type='email'
          placeholder='Email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          className={styles.input}
          type='password'
          placeholder='Senha'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <input
          className={styles.input}
          type='password'
          placeholder='Confirme a senha'
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          required
        />
        <button
          className={styles.button}
          type='submit'
          disabled={loading}
        >
          Cadastrar
        </button>
        <a
          className={styles.link}
          href='/login'
        >
          Já tenho uma conta
        </a>
      </form>
    </div>
  );
}
