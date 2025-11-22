
import { useEffect, useState } from 'react';
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { create } from "../../services/UserService";
import { login } from '../../services/LoginService';
import { useNavigate } from 'react-router-dom';

const initialDataForm = {
        name: '',
        lastname: '',
        phone: '',
        email: '',
        password:'',
        confPassword:'',
        adminCode:''
    }

export const LoginRegister = () => {

    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState("");

    const [loginPassword, setLoginPassword] = useState("");

    const [loginError, setLoginError] = useState("");

    const [isAdmin, setIsAdmin] = useState(false);

    const [errors, setErrors] = useState({});

    const handledAdminChange = (e) => {
        setIsAdmin(e.target.checked);
    };

    const [action, setAction] = useState('');

    const registerLink = () => {
        setAction(' active');
    };

    const loginLink = () => {
        setAction('');
    };

    const [form, setForm] = useState(initialDataForm);

    const {name, lastname, phone, email, password, confPassword, adminCode} = form;

    const handlerAddUser = async (user) => {

        try {
            const response = await create(user);
            console.log('Usuario creado:', response.data);
            alert('Usuario registrado correctamente');
            setErrors({});
        } catch (error) {
            if (error.response && error.response.status === 400){
                setErrors(error.response.data);
            }else {
                console.error("Error inesperado:", error);
                alert("Error al crear usuario");
            }
            setTimeout(() => setErrors({}), 7000);
        }

    }

    const handlerLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await login({
                email: loginEmail,
                password: loginPassword
            });

            
            // if (response.status !== 200) {
            // setLoginError("Credenciales incorrectas");
            // setTimeout(() => setLoginError(""), 7000);
            // return;
            // }

            const { token, username } = data;

            // Guardar token y username
            localStorage.setItem("token", token);
            localStorage.setItem("username", username);

            // console.log("Respuesta login:", data);

            alert("Inicio de sesión exitoso")
            navigate("/IndexAdm"); 

        } catch (error) {
            console.error(error);
            if (error.response?.status === 401) {
            setLoginError("Credenciales incorrectas");
        } else {
            setLoginError("Error en el servidor");
        }
         setTimeout(() => setLoginError(""), 7000);
        }

    };

  return (
    <div className={`wrapper${action}${isAdmin ? ' admin-active' : ''}`}>
        <div className="form-box login">
            <form onSubmit={handlerLogin}>
                <h1>Ingreso</h1>
                <div className="input-box">
                    <input type="text" placeholder="Correo electronico" id="emailUser" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}></input>
                    <FaUser className='icon'/>
                </div>
                

                <div className="input-box">
                    <input type="password" placeholder="Contraseña" id="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}></input>
                    <FaLock className='icon'/>
                </div>

                <div className="remember-forgot">
                        <label>
                            <input type="checkbox"></input>
                            Recordarme
                        </label>
                        <a href='#'>Olvidé la contraseña</a>
                </div>

                <button type="submit">Login</button>

                <div className="register-link">
                    <p>No tiene cuenta? <a href="#" onClick={registerLink}>Registrarse</a></p>
                    
                </div>
            </form>
        </div>


        <div className="form-box register">
            <form onSubmit={async (event) => {    

                event.preventDefault();
                
                if(password != confPassword){
                    alert('Las contraseñas deben de coincidir')
                    return;
                }

                // console.log({
                //     name,
                //     lastname,
                //     phone,
                //     email,
                //     password,
                //     adminCode: isAdmin ? adminCode : null
                // });

                await handlerAddUser({
                    name,
                    lastname,
                    phone,
                    email,
                    password,
                    adminCode: isAdmin ? adminCode : null
                });
                // console.log(form)
                setForm(initialDataForm);
                
            }}>
                <h1>Registro</h1>
                <div className="input-box">
                    <input type="text" placeholder="Nombre" value={name} required  onChange={(event) => setForm({
                        ...form, name: event.target.value
                    })}></input>
                    <FaUser className='icon'/>
                    {errors.name && (
                        <p className="error-text">{errors.name}</p>
                    )}
                </div>

                <div className="input-box">
                    <input type="text" placeholder="Apellido" value={lastname} required onChange={(event) => setForm({
                        ...form, lastname: event.target.value
                    })}></input>
                    <FaUser className='icon'/>
                    {errors.lastname && (
                        <p className="error-text">{errors.lastname}</p>
                    )}
                </div>

                <div className="input-box">
                    <input type="text" placeholder="Número de contacto" value={phone} required onChange={(event) => setForm({
                        ...form, phone: event.target.value
                    })}></input>
                    <FaUser className='icon'/>

                    {errors.phone && (
                        <p className="error-text">{errors.phone}</p>
                    )}
                </div>

                <div className="input-box">
                    <input type="text" placeholder="Correo electronico" value={email} required onChange={(event) => setForm({
                        ...form, email: event.target.value
                    })}></input>
                    <FaEnvelope className='icon'/>

                    {errors.email && (
                        <p className="error-text">{errors.email}</p>
                    )}
                </div>

                <div className="input-box">
                    <input type="password" placeholder="Contraseña" value={password} required onChange={(event) => setForm({
                        ...form, password: event.target.value
                    })}></input>
                    <FaLock className='icon'/>

                    {errors.password && (
                        <p className="error-text">{errors.password}</p>
                    )}
                </div>

                <div className="input-box">
                    <input type="password" placeholder="Confirmar contraseña" value={confPassword} required onChange={(event) => setForm({
                        ...form, confPassword: event.target.value
                    })}></input>
                    <FaLock className='icon'/>

                    {errors.confPassword && (
                        <p className="error-text">{errors.confPassword}</p>
                    )}
                </div>

                <div className="remember-forgot">
                        <label>
                            <input type="checkbox" checked={isAdmin} onChange={(event) => handledAdminChange(event)} ></input>
                            Administrador
                        </label>
                        
                </div>

                {isAdmin && (
                    <div className="input-box">
                        <input type="password" placeholder="Codigo de Administrador" value={adminCode} onChange={(event) => setForm({
                        ...form, adminCode: event.target.value
                    })}></input>
                        <FaLock className='icon'/>

                        {errors.adminCode && (
                        <p className="error-text">{errors.adminCode}</p>
                    )}
                    </div>
                )}

                <button type="submit">Registrarme</button>

                <div className="register-link">
                    <p>Ya tiene una cuenta? <a href='#' onClick={loginLink}>Ingrese aquí</a></p>
                    
                </div>
            </form>
        </div>
    </div>
  )
}

