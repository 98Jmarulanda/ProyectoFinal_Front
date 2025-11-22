import axios from "axios"

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