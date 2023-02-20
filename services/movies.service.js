// // https://imdb-api.com/en/API/InTheaters/k_u3ip6m56


const axios = require('axios')

class ApiServiceTheaters {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://imdb-api.com/en/API'
        })
    }

    getAllMovies() {
        return this.api.get('/Top250Movies/k_u3ip6m56').then(response => response.data.items)
    }

    getInTheaters() {
        return this.api.get(`/InTheaters/k_u3ip6m56`).then(response => response.data.items)
    }

    getMostPopular() {
        return this.api.get(`/MostPopularMovies/k_u3ip6m56`).then(response => response.data.items)
    }

    getComingSoon() {
        return this.api.get(`/ComingSoon/k_u3ip6m56`).then(response => response.data.items)
    }

    getDetails(movieId) {
        return this.api.get(`/Top250Movies/k_u3ip6m56${movieId}`).then(response => response.data.items)
    }



}
module.exports = ApiServiceTheaters
