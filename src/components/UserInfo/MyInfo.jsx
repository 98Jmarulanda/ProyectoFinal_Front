import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { getUserList, getUserLogged } from "../../services/UserService";
import { jwtDecode } from "jwt-decode";


const initialDataForm = {
    name: '',
    lastname: '',
    phone: '',
    email: ''
  }

export const MyInfo = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState(initialDataForm); 

    const [userLogged, setUserLogged] = useState(null);

    const {id, name, lastname, phone, email} = form;

    const [role, setRole] = useState(null);

    const [userSelected, setUserSelected] = useState({
      id: 0,
      name: '',
      lastname: '',
      phone: '',
      email: ''
    })



    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username")
      navigate("/")
      
    }

    const handlerSelectedUser = (userSelected) => {
      setUserSelected({...userSelected});
    }

    const getUserInfo = async () => {
        try {
            const result = await getUserLogged();
            setUserLogged(result.data);
        } catch (error) {
            console.log("Error al encontrar información del usuario" , error);
        }
    }


    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        setForm(userSelected);
    }, [userSelected]);

        useEffect(() =>{
        const token = localStorage.getItem("token");

        if(token){
            //Decodificar token
            const decoded = jwtDecode(token);

            // authorities viene como string JSON
            const authorities = JSON.parse(decoded.authorities);
            const userRole = authorities[0].authority; // ROLE_ADMIN o ROLE_USER
            setRole(userRole);
        }
    }, []);


    return(
        <div className="container">
            <div>
                {role === "ROLE_USER" && (
                    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
                        <div className="container-fluid">
                        <a className="navbar-brand" href="#">OdontoYa</a>

                        <button className="navbar-toggler" type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto me-4 mb-2 mb-lg-0">

                            <li className="nav-item me-3">
                                <a className="nav-link active" href="#">Inicio</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button"
                                data-bs-toggle="dropdown">
                                Información
                                </a>
                                <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); navigate("/IndexUser")}}>Programar cita</a></li>
                                <li><a className="dropdown-item" href="#">Mis citas</a></li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={handleLogout}>Cerrar sesión</a>
                            </li>

                            </ul>
                        </div>

                        </div>
                    </nav>
                )}
                {role === "ROLE_ADMIN" &&(
                    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
                        <div className="container-fluid">
                        <a className="navbar-brand" href="#">OdontoYa</a>

                        <button className="navbar-toggler" type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto me-4 mb-2 mb-lg-0">

                            <li className="nav-item me-3">
                                <a className="nav-link active" href="#">Inicio</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button"
                                data-bs-toggle="dropdown">
                                Administración
                                </a>
                                <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); navigate("/IndexAdm")}}>Citas</a></li>
                                <li><a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); navigate("/CitasAdmin")}}>Citas Usuarios</a></li>
                                <li><a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); navigate("/UserList")}}>Usuarios</a></li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={handleLogout}>Cerrar sesión</a>
                            </li>

                            </ul>
                        </div>

                        </div>
                    </nav>
                )}
            </div>
            <h1>Información personal</h1>
            <div className="row my-4 justify-content-center">
                 <div className="col-md-6 d-flex flex-column align-items-center">  
                <form onSubmit={(event) => {
                  event.preventDefault();
                    setForm(initialDataForm);
                    }}>
                    <div>
                      <input placeholder="Nombre"
                        className="form-control my-3 w-100 bg-secondary text-white"
                        name="name"
                        value={name}
                        readOnly
                      />
                    </div>
                    <div>
                      <input placeholder="Apellido"
                        className="form-control my-3 w-100 bg-secondary text-white"
                        name="lastname"
                        value={lastname}
                        readOnly
                      />
                    </div>
                    <div>
                      <input placeholder="Contacto"
                        className="form-control my-3 w-100 bg-secondary text-white"
                        name="phone"
                        value={phone}
                        readOnly
                      />
                       <input placeholder="Correo electrónico"
                        className="form-control my-3 w-100 bg-secondary text-white"
                        name="email"
                        value={email}
                        readOnly
                      />
                    </div>
                    <div className="d-flex justify-content-center gap-3 mt-3 w-100 mb-4">

                        <button type="button" className="btn btn-primary btn-sm px-1">
                            {name ? 'Actualizar':'Seleccione su información'}
                        </button>

                        <button type="button" className="btn btn-success btn-sm px-1" onClick={(e) => {e.preventDefault(); navigate("/IndexUser")}}>
                            Programar cita
                        </button>

                        <button type="button" className="btn btn-danger btn-sm px-1">
                            Eliminar cuenta
                        </button>

                    </div>
                    
                </form>
              </div>
                    <div className="col-md-10 mt-3">  
                        {
                            userLogged ? (
                                <table className="table table-hover table-striped">
                            <thead>
                                <tr>
                                <th>nombre</th>
                                <th>apellido</th>
                                <th>contacto</th>
                                <th>email</th>
                                <th>Actualizar información</th>
                                </tr>   
                            </thead>
                            <tbody>
                                <tr>
                                <td>{userLogged.name}</td>
                                <td>{userLogged.lastname}</td>
                                <td>{userLogged.phone}</td>
                                <td>{userLogged.email}</td>
                                <td>
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => handlerSelectedUser(userLogged)}
                                        >
                                        Seleccionar
                                    </button>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                        ) : (
                    <div className="alert alert-warning text-center">
                      No hay usuarios en el sistema
                    </div>
                  )
                    }               
                        
                        
                    </div>
            </div>
        </div>
        
    )
}