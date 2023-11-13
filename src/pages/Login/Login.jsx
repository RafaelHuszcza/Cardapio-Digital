import { useState, useRef} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useToast } from '../../context/toastContext';
import api from '../../utils/api';
import {Header} from '../../components/Header/Header';
import {Footer} from '../../components/Footer/Footer';
import errorHandle from '../../helpers/errorHandle'
import {EyeInvisibleOutlined , EyeOutlined} from "@ant-design/icons"
import styles from "./Login.module.css"



const login = async ({ login, password }) => {
  try{
      if (login.length === 0) return { error: 'Insira uma mesa ou login cozinha.' };
      else if (password.length === 0) return { error: 'Insira uma senha.' };
      else if (password.length > 20 || password.length < 6) return {error: 'A senha deve conter entre 6 a 20 caracteres!'}
      
      const data = await api.post('/login', { username: login, password })
      if (data.status !== 200) return { error: data.data.message };
      return { user: data.data.user, error: null };

    } catch (e) {
        const error = errorHandle(e);
        return { user: null, error: error[0] };
    }
}

export const Login = () => {
  const [error, setError] = useState(null);
  const { signIn } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate();
  const formRef = useRef()
  const [inputType, setInputType] = useState("password")
  
  async function onSubmit(event) {
    event.preventDefault();
    const inputValues = [...formRef.current.elements]
      .reduce((total, {name, value})=>{
        if (name) return { ...total, [name]:value }
        return total       
      },{})

    const { user, error } = await login(inputValues);
    if (error) {
      setError(error);
      addToast({ type: "error", title: "Erro ao logar", message:"Cheque as credenciais" })
    }
    
    if (user) {
        addToast({ type: "success", title: "Login", message:"Realizado com sucesso" })
        signIn(user)       
        navigate("/home");
    }
  }
  return (
    <div>
      <Header/>
      <div className={styles.login}>
        <div className={styles.loginUser}>
          <form onSubmit={onSubmit} ref={formRef}>
            <div className={styles.loginForm}>
              <label htmlFor="user">E-mail:</label>
              <input
                placeholder="exemplo@mail.com"
                id="user"
                type="text"
                name="login"
              />
            </div>
            <div className={styles.loginForm} style={{position: 'relative'}}>
              <label htmlFor="password">Senha:</label>
              <input
                placeholder="********"
                id="password"
                type={inputType}
                name="password"
              />
              <div className ={styles.loginFormPasswordEye}>
              {inputType === 'password' && <EyeOutlined    onClick={()=>{setInputType('text')}}/>} 
              {inputType === 'text' && <EyeInvisibleOutlined   onClick={()=>{setInputType('password')}}/>}
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
        
      <Footer/>
    </div >
  );
};

