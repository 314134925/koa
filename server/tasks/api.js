const rp = require('request-promise-native')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')
async function fetchMovie(item) {
    const url = `https://api.douban.com/v2/movie/subject/${item.doubanId}`
    const res = await rp(url)
    console.log(res)
    return res
}
;(async()=>{
    let movies = await Movie.find({
        $or:[
            {summary:{$exists:false}},
            {summary:null},
            {summary:''},
            {title:''},
        ]
    })
    for(let i=0;i<movies.length;i++){
        let movie = movies[i]
        let movieData = await fetchMovie(movie)
        if(movieData){
            let tags = movieData.tags || []
            movie.tags = tags
            movie.summary = movieData.summary ||''
            movie.title = movieDatas.alt_title||movieData.title ||''
            movie.rwaTitle = movieData.title || ''
            if(movieData.attrs){
                movie.movieTypes = movieData.attrs.movie_type||[]
                for(let i=0;i<mpvie.movieTypes.length;i++){
                    let item = mpvie.movieTypes[i]
                    let cat = await Category.findOne({
                        name:item
                    })
                    if(!cat){
                        cat = new Category({
                            name:item,
                            movies:[movie._id],
                        })
                    }else{
                        if(cat.movie.indexOf(movie._id) === -1){
                            cat.movies.push(movie._id)
                        }
                    }
                    await cat.save()
                    if(!movie.category){
                        movie.category.push(cat._id)
                    }else{
                        if(movie.category.indexOf(cat._id) === -1){
                            movie.category.push(cat._id)
                        }
                    }
                }
                let dates = movieData.attrs.pubdate || []
                let pubdates = []
                dates.map(item =>{
                    if(item && item.split('(').length >0 ){
                        let parts = item.split('(')
                        let date = parts[0]
                        let country = "未知"
                        if(parts[1]){
                            country = parts[1].split(')')[0]
                        }
                        pubdates.push({
                            date:new Date(date),
                            country:country
                        })
                    }
                })
                movie.pubdate = pubdates
            }
            tags.forEach(tag =>{
                movie.tags.push(tag.name)
            })
            await movie.save()
        }
    }
})()