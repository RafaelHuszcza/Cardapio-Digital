import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useToast } from '../../context/toastContext';
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import errorHandle from '../../helpers/errorHandle'
import styles from "./styles.module.css"
import api from '../../utils/api';





export const Login = () => {
  const [error, setError] = useState(null);
  const { signIn } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate();
  const formRef = useRef()
  const [inputType, setInputType] = useState("password")

  const login = async ({ user, password }) => {
    try {
      if (user.length === 0) return { error: 'Insira um usuário' };
      else if (password.length === 0) return { error: 'Insira uma senha.' };
      // else if (password !== "teste") throw new Error()
      const data = await api.post('/login', { username: user, password });
      addToast({ type: "success", title: "User", message: "Realizado com sucesso" })
      signIn(data.data.user)
      // if (user == "Cozinha") {
      //   signIn({ id: "1", name: user, userType: "kitchen", token: '1234567890' }})
      //   navigate("/kitchen");
      // }
      // else {
      //   signIn({ id: "1", name: user, userType: "client",  token: '1234567890' })
      //   navigate("/home");
      // }
    } catch (err) {
      addToast({ type: "error", title: "Erro ao logar", message: "Cheque as credenciais" })
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    const inputValues = [...formRef.current.elements]
      .reduce((total, { name, value }) => {
        if (name) return { ...total, [name]: value }
        return total
      }, {})
    login(inputValues);
  }
  return (
    <div>
      <Header />
      <div className={styles.login}>
        <div className={styles.loginUser}>
          <form onSubmit={onSubmit} ref={formRef}>
            <div className={styles.loginForm}>
              <label htmlFor="user">Usuário</label>
              <input
                placeholder="RHuszcza"
                id="user"
                type="text"
                name="user"
              />
            </div>
            <div className={styles.loginForm} style={{ position: 'relative' }}>
              <label htmlFor="password">Senha:</label>
              <input
                placeholder="********"
                id="password"
                type={inputType}
                name="password"
              />
              <div className={styles.loginFormPasswordEye}>
                {inputType === 'password' && <EyeOutlined onClick={() => { setInputType('text') }} />}
                {inputType === 'text' && <EyeInvisibleOutlined onClick={() => { setInputType('password') }} />}
              </div>
            </div>

            {error && <div className={styles.loginUserError}>{error}</div>}

            <button className={styles.loginSubmitButton}>Entrar</button>

            <div className={styles.loginForgotPassword}>
              <Link to="/esqueceu-senha">Esqueceu sua senha?</Link>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div >
  );
};

