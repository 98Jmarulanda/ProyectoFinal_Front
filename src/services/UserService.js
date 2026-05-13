import axios from "axios"
import api from "./api";

const baseUrl = 'http://localhost:8080/users/create';

export const create = async ({name, lastname, phone, email, password, adminCode}) => {

    try {

        const response = await axios.post(baseUrl, {
            name: name,
            lastname: lastname,
            phone: phone,
            email: email,
            password: password,
            adminCode: adminCode
        });
        return response.data;
    } catch (error) {
        console.log("Error al crear el usuario" + error);
        throw error;
    }
    
    return undefined;
    
}

export const getUserList = async() => {

    try {
        const response = await api.get('/users/lista');
        return response;
    } catch (error) {
        console.log("Error al cargar lista de usuarios" , error);
    }
}

export const getUserLogged = async() => {
    try {
        const response = await api.get('/users/myInfo');
        return response;
    } catch (error) {
        console.log("error al cargar información de usuario" + error);
    }
}

export const updatedUser = async ({id, name, lastname, phone, email}) => {

  try {
    const response = await api.put('/users/' + id, {
      name,
      lastname,
      phone,
      email
    });
      return response
  } catch (error) {
    console.log(error);
  }
  return undefined;
}

export const removeUser = async (id) => {
    try {
        await api.delete('/users/' + id);
    } catch (error) {
        console.log(error)
    }
}