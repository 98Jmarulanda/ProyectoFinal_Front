import { useEffect, useState } from "react";
import { create, findAll, remove, updated } from "../../services/CitaService";
import { useNavigate } from "react-router-dom";

  const initialDataForm = {
    id: 0,
    name: '',
    description: '',
    price: '',
    dateTime: ''
  }
  export const IndexAdm = () => {
    
    const navigate = useNavigate();
    const [citas, setCitas] = useState([]);

    const [form, setForm] = useState(initialDataForm);

    const { id, name, description, price, dateTime} = form;

    const [errors, setErrors] = useState({});

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
        console.log(result.data);
        setCitas(result.data);       
      } catch (error) {
        console.error("Error al cargar datos: ", error);
      }
      
    }

    /*EL useEffect no puede tener una fucnion async, pero los handdle sí */
    useEffect(() => {
      getCitas();
    }, []);

    useEffect(() => {
      setForm(citaSelected);
    }, [citaSelected]);

    /*EL Handler puede tener una fucnion async, pero los useEffect no */
    const handlerAddCita = async (cita) => {
      
      try {
        setErrors({});
        if (cita.id > 0) {
          const response = await updated(cita);
          setCitas(citas.map(cit => cit.id === response.data.id ? { ...response.data } : cit));
          alert("Se ha modificado la cita correctamente")
        } else {
          const response = await create(cita);
          setCitas([...citas, { ...response.data }]);
          alert("Se ha creado la cita correctamente")
        }
        setForm(initialDataForm);
      } catch (error) {
        if (error.response?.data) {
          setErrors(error.response.data);
        } else {
          setErrors({ general: 'Ocurrió un error inesperado' });
        }
        
      }
   }

    const handlerRemoveCita = async (id) => {
      const confirmar = window.confirm('¿Está seguro que desea eliminar la cita? el cambio es irreversible');
      if(!confirmar) return;

      try {
        await remove(id);
        //este filtro devuelve el arreglo con los valores que cumplan la función
        setCitas(citas.filter(cita => cita.id != id));
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert("No se pudo eliminar el usuario");
      }
      
    }

    const handlerSelectedCita = (cita) => {
      setCitaSelected({...cita});
    }

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username")
      navigate("/")
      
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
                      Administración
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); navigate("/UserList")}}>Usuarios</a></li>
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
        <h1 className="title mb-5">Panel administrativo</h1>
          <div className="row my-4">
              <div className="col">
                <form onSubmit={(event) => {
                  event.preventDefault();

                  if(!name || !description || !price){
                    alert('debe completar los datos')
                    return;
                  }
                    handlerAddCita(form);
                    setForm(initialDataForm);                    

                    }}>
                    <div>
                      <input placeholder="Nombre"
                        className={`form-control my-3 w-75 ${errors.name ? 'is-invalid' : ''}`}
                        name="name"
                        value={name}
                        onChange={(event => setForm({
                          ...form, 
                          name: event.target.value
                        }))}
                        required
                      />
                      {errors.price && (
                          <div className="text-danger small ms-1 ">{errors.price}</div>
                      )}
                    </div>
                    <div>
                      <input placeholder="Descripcion"
                        className={`form-control my-3 w-75 ${errors.description ? 'is-invalid' : ''}`}
                        name="description"
                        value={description}
                        onChange={(event => setForm({
                          ...form, 
                          description: event.target.value
                        }))}
                        required
                      />
                      {errors.price && (
                          <div className="text-danger small ms-1">{errors.price}</div>
                      )}
                    </div>
                    <div>
                      <input placeholder="Precio"
                        className={`form-control my-3 w-75 ${errors.price ? 'is-invalid' : ''}`}
                        name="price"
                        value={price}
                        onChange={(event => setForm({
                          ...form, 
                          price: event.target.value
                        }))}
                        required
                      />
                      {errors.price && (
                          <div className="text-danger small ms-1">{errors.price}</div>
                      )}
                    </div>
                    <div>
                      <input
                        type="datetime-local"
                        className={`form-control my-3 w-75 ${errors.dateTime ? 'is-invalid' : ''}`}
                        value={dateTime}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            dateTime: e.target.value
                          })
                        }
                        required
                      />
                      {errors.dateTime && (
                          <div className="text-danger small ms-1 text-center">{errors.dateTime}</div>
                      )}
                    </div>
                    <div className="d-flex justify-content-start" style={{width: '410px'}}>
                      <button type="submit" className="btn btn-primary m-3">
                        {id > 0 ? 'Actualizar': 'Crear'}
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
                          <th>eliminar</th>
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
                                className="btn btn-secondary btn-sm"
                                onClick={() => handlerSelectedCita(cita)}
                              >
                                Actualizar
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handlerRemoveCita(cita.id)}
                              >
                                Eliminar
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

