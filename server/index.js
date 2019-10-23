const Koa = require('koa')
const mongoose = require('mongoose')
const views = require('koa-views')
const {resolve} = require('path')
const  { connect,initSchems } =require('./database/init')
const R = require('ramda')
const MIDDLEWARES = ['router']
// const router = require('./routes') 
const useMiddlewares = (app)=>{
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith(app)
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
    const app = new Koa()
    await useMiddlewares(app)
    app.listen(44567)
})()
// app.use(router.routes()).use(router.allowedMethods())