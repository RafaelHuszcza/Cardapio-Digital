import { Navigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== passwordConfirmation) {
      return setError("As senhas não são iguais");
    }
    try {
      setError("");
      setLoading(true);
      await register(email, password, name);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Cadastrar</h1>
        {error && <p>{error}</p>}
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassowrd(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirme a senha"
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          Cadastrar
        </button>
        <a href="/login">Já tenho uma conta</a>
      </form>
    </div>
  );
}
