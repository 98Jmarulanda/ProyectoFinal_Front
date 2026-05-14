import { useNavigate } from "react-router-dom";
import { getAgendaAdmin } from "../../services/UserCitaService";
import { useEffect,useState } from "react";

const initialDataForm = {
    name: '',
    lastname: '',
    phone: '',
    citaNombre: '',
    dateTime:''
  }

export const CitasAdmin = () => {

    const navigate = useNavigate();

    const [agendaAdmin, setAgendaAdmin] = useState([]);

    const [form, setForm] = useState(initialDataForm); 

    const {name, lastname, phone, citaNombre, dateTime} = form;

    const [estados, setEstados] = useState({});

    const [citaSelected, setCitaSelected] = useState({
      id: null,  
      name: '',
      lastname: '',
      phone: '',
      citaNombre: '',
      dateTime: ''
    })

    const handleEstado = (id, estado) => {
        setEstados(prev => ({ ...prev, [id]: estado }));
        setForm(initialDataForm);
    };

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username")
      navigate("/")
      
    }

    const handlerSelectedCita = (agendaAdmin) => {
      console.log(agendaAdmin); // ← mira qué campos llegan
      setCitaSelected({...agendaAdmin});
    }

    const loadAgenda = async() => {
        try {
            const datos = await getAgendaAdmin();
            setAgendaAdmin(datos.data);
        } catch (error) {
            console.log("Error al cargar datos", error)
        }
    } 

    useEffect(() => {
        loadAgenda();
    }, []);

    useEffect(() => {
        setForm(citaSelected);
    }, [citaSelected]);


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
                            <li><a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); navigate("/UserList")}}>Usuarios</a></li>
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
                       <input placeholder="Nombre Cita"
                        className="form-control my-3 w-100 bg-secondary text-white"
                        name="citaNombre"
                        value={citaNombre}
                        readOnly
                      />
                    </div>
                    <div>
                      <input
                        type="datetime-local" 
                        className="form-control my-3 w-100 bg-secondary text-white"
                        value={dateTime}
                        readOnly
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-center gap-3 mt-3 w-100">
                        <button 
                            type="button" 
                            className="btn btn-success btn-sm px-1"
                            onClick={() => handleEstado(citaSelected.id, 'Completado')}
                        >
                            Completado
                        </button>

                        <button 
                            type="button" 
                            className="btn btn-warning btn-sm px-1"
                            onClick={() => handleEstado(citaSelected.id, 'Reprogramar')}
                        >
                            Reprogramar
                        </button>

                        <button 
                            type="button" 
                            className="btn btn-danger btn-sm px-1"
                            onClick={() => handleEstado(citaSelected.id, 'Cancelada')}
                        >
                            Cancelada
                        </button>
                    </div>
                    
                </form>
              </div>
                    <div className="col-md-10 mt-3">  
                        {
                            agendaAdmin.length > 0 ? (
                                <table className="table table-hover table-striped">
                            <thead>
                                <tr>
                                <th>nombre</th>
                                <th>apellido</th>
                                <th>contacto</th>
                                <th>nombre cita</th>
                                <th>fecha</th>
                                <th>Estado</th>
                                </tr>   
                            </thead>
                            <tbody>
                            { agendaAdmin.map((item, index) => (
                                <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.lastname}</td>
                                <td>{item.phone}</td>
                                <td>{item.citaNombre}</td>
                                <td>{item.dateTime}</td>
                                <td>
                                    {estados[item.id] ? (
                                        <span className={`badge ${
                                            estados[item.id] === 'Completado' ? 'bg-success' :
                                            estados[item.id] === 'Reprogramar' ? 'bg-warning text-dark' :
                                            'bg-danger'
                                        }`}>
                                            {estados[item.id]}
                                        </span>
                                    ) : (
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => handlerSelectedCita(item)}
                                        >
                                            Seleccionar
                                        </button>
                                    )}
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        ) : (
                    <div className="alert alert-warning text-center">
                      No hay citas disponibles
                    </div>
                  )
                    }               
                        
                        
                    </div>
            </div>
        </div>
        
    )
}