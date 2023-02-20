// // https://imdb-api.com/en/API/InTheaters/k_t1dvkm4d


const axios = require('axios')

class ApiServiceTheaters {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://imdb-api.com/en/API'
        })
    }

    getAllMovies() {
        return this.api.get('/Top250Movies/k_t1dvkm4d').then(response => response.data.items)
    }

    getInTheaters() {
        return this.api.get(`/InTheaters/k_t1dvkm4d`).then(response => response.data.items)
    }

    getMostPopular() {
        return this.api.get(`/MostPopularMovies/k_t1dvkm4d`).then(response => response.data.items)
    }

    getComingSoon() {
        return this.api.get(`/ComingSoon/k_t1dvkm4d`).then(response => response.data.items)
    }

    getMovieById(movieId) {
        return this.api.get(`/Title/k_t1dvkm4d${movieId}`).then(response => response.data.items)
    }



}
module.exports = ApiServiceTheaters
