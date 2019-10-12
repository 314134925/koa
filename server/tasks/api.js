const rp = require('request-promise-native')
async function fetchMovie(item) {
    const url = `https://api.douban.com/v2/movie/subject/${item.doubanId}`
    const res = await rp(url)
    return res
}
;(async()=>{
    let movies = [
        {
            doubanId: 3345485,
            title: '旅情'
        },
        {
            doubanId:30197538,
            title:'我不能恋爱的女朋友'
        }
    ]
    movies.map(async movie =>{
        let movieData = await fetchMovie(movie)
        console.log(movieData)
    })
})()