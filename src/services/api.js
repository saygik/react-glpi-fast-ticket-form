import axios from 'axios'

axios.defaults.timeout = 50000
// let _apiBase = 'https://glpi-go-api.brnv.rw/v1/'
let _apiBase = 'http://vm-say-work.brnv.rw:9009/v1/'
console.log('-env-',process.env.NODE_ENV)
if (process.env.NODE_ENV==='production') {
    _apiBase=process.env.REACT_APP_GLPI_API_URL
}


const api = {};
//const emptyObject={}
const apiData = async  (url, token='', method='get', data={}) => {
    const headers= {'Content-Type': 'application/json',}
    if (!!token) headers.Authorization='Bearer ' + token
    return axios({
        method: method,
        url: _apiBase + url,
        headers: headers,
        data: data
    })
}
api.findUser = async (user) => await apiData('user/findbymail/' +user )
api.getOrgs = async () => await apiData('organizations/level/3' )
api.addTicket = async (ticket) =>
    await apiData('ticket', '','post',JSON.stringify(ticket))

export default api
