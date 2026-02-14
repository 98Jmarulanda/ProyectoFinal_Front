import axios from "axios";

const loginUrl = 'http://localhost:8080/login';

export const login = async ({email, password}) => {

    try {

        const response = await axios.post(loginUrl, {
            email,
            password
        });

        console.log("Respuesta completa Axios:", response);

        return response.data;
    } catch (error) {
        console.log("Error al iniciar sesion" + error);
        throw error;
    }
    
    return undefined;
    
}