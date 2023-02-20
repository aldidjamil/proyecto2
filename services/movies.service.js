// // https://imdb-api.com/en/API/InTheaters/k_u3ip6m56


const axios = require('axios')

class ApiServiceTheaters {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://imdb-api.com/en/API/InTheaters/k_u3ip6m56'
        })
    }

    getAllMovies() {
        return this.api.get('/movies')
    }

    getOneMovie(moviesId) {
        return this.api.get(`/movies/${moviesId}`)
    }

    saveMovies(characterData) {
        return this.api.post(`/movies`, characterData)
    }


}
module.exports = ApiServiceTheaters
