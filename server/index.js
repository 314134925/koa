const  { connect } =require('./database/init')

const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const {resolve} = require('path')
;(async ()=>{
    await connect()
})()
app.listen(44567)