import api from "./api";

const initCitas = [
  {
    id: 1,
    name: 'Limpieza general',
    price: '85000',
    description: 'Limpieza profunda',
    dateTime: '2026-02-09T14:30'
  },
  {
    id: 2,
    name: 'Cirugía de cordales',
    price: '500000',
    description: 'Cirugía para remover cordales',
    dateTime: '2026-02-05T14:30'
  },  
];


export const listCitas = () => {
  return initCitas;
}

export const findAll = async() => {

  try {
    const response = await api.get('/citas');
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
  
}

export const create = async ({name, description, price, dateTime}) => {
    const response = await api.post('/citas', {
    name,
    description,
    price,
    dateTime
  });
  
  return response
}

export const updated = async ({id, name, description, price, dateTime}) => {

  try {
    const response = await api.put('/citas/' + id, {
      name,
      description,
      price,
      dateTime
    });
      return response
  } catch (error) {
    console.log(error);
  }
  return undefined;
}

export const remove = async (id) => {

  try {
     await api.delete('/citas/' + id);
  } catch (error) {
    console.log(error)
  }
}