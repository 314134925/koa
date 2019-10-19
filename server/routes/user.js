const mongoose = require('mongoose')
const {
    controller,
    get,
    post,
    put,
    del
} = require('../lib/decorator')
const {
     
} =require('../service/user')
@controller('/api/v0/user')
export class userController {
    @post('/')
    async login(ctx, next){
        const {email, password} = ctx.request.body
        const matchData = await checkPassword(email, password)
        if(!matchData.user){
            return (ctx.body = {
                success:false,
                err:'账号不存在'
            })
        }
        if(matchData.match){
            return (ctx.body = {
                success:true
            })
        }
        return (ctx.body = {
            success:false,
            err:'密码不正确'
        })
    }
}