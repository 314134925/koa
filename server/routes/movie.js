const mongoose = require('mongoose')
const {
    controller,
    get,
    post,
    put,
    del
} = require('../lib/decorator')
const {
    getAllMovies,
    getMovieDetail,
    getRelativeMovies
} =require('../service/movie')
console.log(878878)
@controller('/api/v0/movies')
export class movieController {
    @get('/')
    async getMovies(ctx, next){
        console.log('fangwen')
        const {type,year} = ctx.query
        const movies = await getAllMovies(type,year)
        ctx.body = {
            movies 
        }    
    }
    @get('/:id')
    async getMovieDetail(ctx,next){
        const id = ctx.params.id
        const movie = await getMovieDetail(id)
        const relativeMovies = await getRelativeMovies(movie)

        ctx.body = {
            data:{
                movie,
                relativeMovies
            },
            success:true
        }    
    }
}