const  { connect,initSchems } =require('./database/init')
const mongoose = require('mongoose')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const {resolve} = require('path')
// const router = require('./routes') 
const MIDDLEWARES = ['router']
const R = require('ramda')
const useMiddlewares = (app)=>{
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWidth => initWidth(app)
            ),
            require,
            name => resolve(__dirname,`./middlewares/${name}`)
        )(MIDDLEWARES)
    )
}
;(async ()=>{
    await connect()
    initSchems()
    const Movie = mongoose.model('Movie')
    const movies = await Movie.find({})
    // require('./tasks/movie')
    // require('./tasks/api')
    await useMiddlewares(app)
    app.listen(44567)
})()
// app.use(router.routes()).use(router.allowedMethods())