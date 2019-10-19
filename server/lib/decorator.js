const Router = require('koa-router')
const {resolve} = require('path')
const symbolPrefix = Symbol('prefix')
const routerMap = new Map()
const _ = require('lodash')
const glob = require('glob')
const isArray = c => _.isArray(c)?c:[c]
export class Route{
    constructor(app,apiPath){
        this.app = app
        this.apiPath = apiPath
        this.router = new Router()
    }

    init(){
        glob.sync(resolve(this.apiPath,'**/*.js')).forEach(require)
        for(let [conf,controller] of routerMap){
            const controllers = isArray(controller)
            const prefixPaht = conf.target[symbolPrefix]
            if(prefixPaht){
                prefixPaht = normalizePath(prefixPaht)
            }
            const routerPath = prefixPaht +conf.path
            this.router[conf.method](routerPath,...controllers)
        }
        this.apiPath.use(this.router.routes())
        this.apiPath.use(this.router.allowedMethods())
    }
}
const normalizePath = path => path.startsWidth('/')?path:`/${path}`
const router =conf =>(target,key,descriptor)=>{
    conf.path = normalizePath(conf.path)
    console.log(778888888)
    routerMap.set({
        'target':target, path:conf.path
    },target[key])
}
export const controller = path =>target =>(target.propotype[symbolPrefix = path])
export const get = path => router({
    'method':'get',
    'path':path
})
export const post = path => router({
    'method':'post',
    'path':path
})
export const put = path => router({
    'method':'put',
    'path':path
})
export const del = path => router({
    'method':'del',
    'path':path
})
export const use = path => router({
    'method':'use',
    'path':path
})
export const all = path => router({
    'method':'all',
    'path':path
})