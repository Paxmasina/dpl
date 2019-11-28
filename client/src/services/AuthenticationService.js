import Api from '../services/Api'

export default {
    register (credentials) {
        return Api().post('register', credentials)
    },
    login (credentials) {
        return Api().post('login', credentials)
    },
    addTravel (data) {
        return Api().post('admin', data, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    async getTravels() {
        const response =  await Api().get('catalogue')
        return response
    },
    registerForTravel(credentials) {
        return Api().post('catalogue', credentials)
    },
    deleteTravel(credentials){
        return Api().post('catalogueAdmin', credentials)
    },
    async getUserTravels(credentials) {
        const response = await Api().post('mytravels', credentials)
        return response
    },
    cancelTravel(credentials){
        return Api().post('mytravelsCancel', credentials)
    },
    updateTravel (data) {
        return Api().post('update', data)
    },
    updateTravelImage(data){
        return Api().post('updateImg', data, {headers: {'Content-Type': 'multipart/form-data'}})
    }
}