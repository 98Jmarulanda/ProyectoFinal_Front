import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { getUserList, removeUser, updatedUser } from "../../services/UserService";


const initialDataForm = {
    name: '',
    lastname: '',
    phone: '',
    email: ''
  }

export const UserList = () => {

    const navigate = useNavigate();
    
    const [userList, setUserList] = useState([]);

    const [form, setForm] = useState(initialDataForm); 

    const {name, lastname, phone, email} = form;

    const [userSelected, setUserSelected] = useState({
      name: '',
      lastname: '',
      phone: '',
      email: ''
    })


    const handlerRemoveUser = async (id) => {
        const confirmar = window.confirm('¿Está seguro que desea eliminar el usuario? el cambio es irreversible');
        if(!confirmar) return;

        try {
            await removeUser(id);
            //este filtro devuelve el arreglo con los valores que cumplan la función
            setUserList(userList.filter(user => user.id != id));
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            alert("No se pudo eliminar el usuario");
        }
        
    }

    const handlerUpdateUser = async () => {
    if (!userSelected.id) {
        alert("Selecciona un usuario primero");
        return;
    }

    try {
        const response = await updatedUser({
            id: userSelected.id,
            name,
            lastname,
            phone,
            email
        });
        setUserList(userList.map(user => 
            user.id === response.data.id ? { ...response.data } : user
        ));
        setForm(initialDataForm);
        setUserSelected({ name: '', lastname: '', phone: '', email: '' });
        alert("Usuario actualizado correctamente");
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        alert("No se pudo actualizar el usuario");
    }};


    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username")
      navigate("/")
      
    }

    const handlerSelectedUser = (userList) => {
      setUserSelected({...userList});
    }

    const loadUserList = async() => {
        try {
            const datos = await getUserList();
            setUserList(datos.data);
        } catch (error) {
            console.log("Error al cargar datos", error)
        }
    } 

    useEffect(() => {
        loadUserList();
    }, []);

    useEffect(() => {
        setForm(userSelected);
    }, [userSelected]);




    return(
        <div className="container">
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
                    <div className="container-fluid">
                    <a className="navbar-brand" href="#" onClick={(e) => {e.preventDefault(); navigate("/IndexAdm")}}>OdontoYa</a>

                    <button className="navbar-toggler" type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto me-4 mb-2 mb-lg-0">

                        <li className="nav-item me-3">
                            <a className="nav-link active" href="#" onClick={(e) => {e.preventDefault(); navigate("/IndexAdm")}}>Inicio</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button"
                            data-bs-toggle="dropdown">
                            Administración
                            </a>
                            <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); navigate("/IndexAdm")}}>Citas</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); navigate("/CitasAdmin")}}>Citas Usuarios</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); navigate("/MyInfo")}}>Mi información</a></li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={handleLogout}>Cerrar sesión</a>
                        </li>

                        </ul>
                    </div>

                    </div>
                </nav>
            </div>
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
                        onChange={(event => setForm({
                            ...form,
                            name: event.target.value
                        }))}
                      />
                    </div>
                    <div>
                      <input placeholder="Apellido"
                        className="form-control my-3 w-100 bg-secondary text-white"
                        name="lastname"
                        value={lastname}
                        onChange={(event => setForm({
                            ...form,
                            lastname: event.target.value
                        }))}
                      />
                    </div>
                    <div>
                      <input placeholder="Contacto"
                        className="form-control my-3 w-100 bg-secondary text-white"
                        name="phone"
                        value={phone}
                        onChange={(event => setForm({
                            ...form,
                            phone: event.target.value
                        }))}
                      />
                       <input placeholder="Correo electrónico"
                        className="form-control my-3 w-100 bg-secondary text-white"
                        name="email"
                        value={email}
                        onChange={(event => setForm({
                            ...form,
                            email: event.target.value
                        }))}
                      />
                    </div>
                    <div className="d-flex justify-content-center gap-3 mt-3 w-100">

                        <button type="button" className="btn btn-success btn-sm px-1" onClick={handlerUpdateUser}>
                            Actualizar
                        </button>

                        <button type="button" className="btn btn-danger btn-sm px-1" onClick={() => handlerRemoveUser(userSelected.id)}>
                            Eliminar
                        </button>

                    </div>
                    
                </form>
              </div>
                    <div className="col-md-10 mt-3">  
                        {
                            userList.length > 0 ? (
                                <table className="table table-hover table-striped">
                            <thead>
                                <tr>
                                <th>nombre</th>
                                <th>apellido</th>
                                <th>contacto</th>
                                <th>email</th>
                                <th>Estado</th>
                                </tr>   
                            </thead>
                            <tbody>
                            { userList.map((item, index) => (
                                <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.lastname}</td>
                                <td>{item.phone}</td>
                                <td>{item.email}</td>
                                <td>
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => handlerSelectedUser(item)}
                                        >
                                        Seleccionar
                                    </button>
                                </td>
                                </tr>
                            ))}
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