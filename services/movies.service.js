// // https://imdb-api.com/en/API/InTheaters/k_t1dvkm4d


const axios = require('axios')

class ApiServiceTheaters {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://imdb-api.com/en/API'
        })
    }

    getAllMovies() {
        return this.api.get(`/Top250Movies/${process.env.API_KEY}`).then(response => response.data.items)
    }

    getInTheaters() {
        return this.api.get(`/InTheaters/${process.env.API_KEY}`).then(response => response.data.items)
    }

    getMostPopular() {
        return this.api.get(`/MostPopularMovies/${process.env.API_KEY}`).then(response => response.data.items)
    }

    getComingSoon() {
        return this.api.get(`/ComingSoon/${process.env.API_KEY}`).then(response => response.data.items)
    }

    getMovieById(movieId) {
        return this.api.get(`/Title/${process.env.API_KEY}/${movieId}`).then(response => response.data)
    }



}
module.exports = ApiServiceTheaters
