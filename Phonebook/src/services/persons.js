import axios from 'axios'

const baseUrl = 'https://part-3-ibb1.onrender.com/api/persons'

const getAll=()=>axios.get(baseUrl).then(response=>response.data)
const create=(newPerson)=>axios.post(baseUrl, newPerson).then(response=>response.data)
const update=(id,updatedPerson)=>axios.put(`${baseUrl}/${id}`,updatedPerson).then(response=>response.data)
const remove=(id)=>axios.delete(`${baseUrl}/${id}`)

export default {getAll,create,update,remove}
