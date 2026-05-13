import api from "./api"


export const crearReserva = async (citaId) => {
    try {
        console.log("ID que estoy enviando:", citaId);
        const response = await api.post("/reserva", {citaId: citaId});
        return response;
    } catch (error) {
        if (error.response?.status === 401) {
            alert("Debes iniciar sesión");
        } 
        else if (error.response?.status === 403) {
        alert("No tienes permisos");
        }
        console.log(error);
    }
    
}

export const getAgendaAdmin = async() => {

    try {
        const response = await api.get('/reserva/agenda')
        return response
    } catch (error) {
        consol.log(error);
    }
}