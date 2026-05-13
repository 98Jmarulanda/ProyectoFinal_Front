import { useEffect, useState } from "react";
import { findAll, listCitas } from "../../services/CitaService";
import { useNavigate } from "react-router-dom";
import { crearReserva } from "../../services/UserCitaService";

  const initialDataForm = {
    id: 0,
    name: '',
    description: '',
    price: '',
    dateTime: ''
  }
  export const IndexUser = () => {

    const navigate = useNavigate();
    
    const [citas, setCitas] = useState([]);

    const [form, setForm] = useState(initialDataForm);

    const { id, name, description, price, dateTime} = form;

    const [citaSelected, setCitaSelected] = useState({
      id: 0,
      name: '',
      description: '',
      price: '',
      dateTime: ''
    })

    const getCitas = async () => {
      try {
        const result = await findAll();
        setCitas(result.data);
      } catch (error) {
        console.error("Error al cargar datos: ", error);
      }
    }

    useEffect(() => {
      getCitas();
    }, []);

    useEffect(() => {
      setForm(citaSelected);
    }, [citaSelected]);

    // const handlerAddCita = (cita) => {  
    //   if(cita.id > 0){
    //     setCitas(citas.map(cit => {
    //       if(cit.id == cita.id){
    //         return {...cita}
    //       }
    //       return cit;
    //     }));
    //   }else{
    //     setCitas([...citas, {...cita, id: new Date().getTime()}]);
    //   }
      
    // }

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username")
      navigate("/")
      
    }

    const handlerSelectedCita = (cita) => {
      setCitaSelected({...cita});
    }

    const reservar = async (idCita) => {
      const fechaCita = new Date(citaSelected.dateTime);
      const ahora = new Date();
      
      if (!citaSelected.id) {
        alert("Selecciona una cita primero");
        setForm(initialDataForm);
        return;
      }
      if (fechaCita < ahora) {
        alert("No puedes reservar una cita con fecha anterior a la actual");
        setForm(initialDataForm);
        return;
      }
      try {
        const response = await crearReserva(idCita);
        alert("Cita reservada correctamente"); 
        console.log(response);
      } catch (error) {
        console.error(error);
        alert("Error al reservar la cita ");
      }
    }

    
    
    return(
      <div className="container"> 
        <div>
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
                      <li><a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); navigate("/MyInfo")}}>Mi perfil</a></li>
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
        <h1 className="title mb-5">Panel de usuario</h1>
          <div className="row my-4">
              <div className="col">
                <form onSubmit={(event) => {
                  event.preventDefault();

                  // if(!name || !description || !price){
                  //   alert('debe seleccionar una cita')
                  //   return;
                  // }
                    // handlerAddCita(form);
                    setForm(initialDataForm);

                    }}>
                    <div>
                      <input placeholder="Nombre"
                        className="form-control my-3 w-75 bg-secondary text-white"
                        name="name"
                        value={name}
                        readOnly
                        onChange={(event => setForm({
                          ...form, 
                          name: event.target.value
                        }))}
                      />
                    </div>
                    <div>
                      <input placeholder="Descripcion"
                        className="form-control my-3 w-75 bg-secondary text-white"
                        name="description"
                        value={description}
                        readOnly
                        onChange={(event => setForm({
                          ...form, 
                          description: event.target.value
                        }))}
                      />
                    </div>
                    <div>
                      <input placeholder="Precio"
                        className="form-control my-3 w-75 bg-secondary text-white"
                        name="price"
                        value={price}
                        readOnly
                        onChange={(event => setForm({
                          ...form, 
                          price: event.target.value
                        }))}
                      />
                    </div>
                    <div>
                      <input
                        type="datetime-local" 
                        className="form-control my-3 w-75 bg-secondary text-white"
                        value={dateTime}
                        readOnly
                        onChange={(e) =>
                          setForm({
                            ...form,
                            dateTime: e.target.value
                          })
                        }
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-start" style={{width: '410px'}}>
                      <button type="submit" className="btn btn-primary m-3" onClick={() => reservar(citaSelected.id)}>
                        {id > 0 ? 'Reservar': 'seleccione una cita'}
                      </button>
                    </div>
                    
                </form>
              </div>
              <div className="col-md-6">                 
                {
                  citas.length > 0 ? (
                    <table className="table table-hover table-striped">
                      <thead>
                        <tr>
                          <th>nombre</th>
                          <th>descripción</th>
                          <th>precio</th>
                          <th>fecha</th>
                          <th>actualizar</th>
                        </tr>   
                      </thead>
                      <tbody>
                        { citas.map(cita => (
                          <tr key={cita.id}>
                            <td>{cita.name}</td>
                            <td>{cita.description}</td>
                            <td>{cita.price}</td>
                            <td>{cita.dateTime}</td>
                            <td>
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => handlerSelectedCita(cita)}
                              >
                                Reservar
                              </button>
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
    
  };

