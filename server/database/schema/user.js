const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const Mixed = Schema.types.Mixed
const SALT_WORK_FACTOR = 10
const MAX_LOGIN_TIMES = 5
const LOCK_TIME = 2*60*60*1000
const userSchema = new Schema({
    userName:{
        unique:true,
        required: true,
        type:String,
    },
    email:{
        unique:true,
        required: true,
        type:String,
    },
    password:{
        unique:true,
        type:String,
    },
    email:{
        unique:true,
        type:String,
    },
    loginAttempts:{
        type:Number,
        required: true,
        default:0
    },
    lockUnitl: Number,
    meta:{
        createdAt:{
            type:Date,
            default:Date.new()
        },
        updatedAt:{
            type:Date,
            default:Date.new()
        }
    }
})
userSchema.virtual('isLocked').get(()=>{
    return !!(this.lockUnitl && this.lockUnitl > Date.now())
})
userSchema.pre('save',next =>{
    if(!this.isModified('password')) return next()   
    bcrypt.genSalt(SALT_WORK_FACTOR, (err,salt)=>{
        if(err) return next(err)
        bcrypt.hash(this.password,salt,(error,hash)=>{
            if(error) return next(error)
            this.password = hash
            next()
        })
    })
    if(this.isNew){
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    }else{
        thos.meta.updatedAt = Date.now()
    }
    next()
})
userSchema.meathods = {
    comparePassword:(oldPassword,newPassword)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(oldPassword,newPassword,(err,isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    },


    incLoginAttepts: (user)=>{
        return new Promise((resolve,reject)=>{
            if(this.lockUnitl && this.lockUnitl<Date.now()){
                this.update({
                    $set:{
                        loginAttempts:1
                    },
                    $unset:{
                        lockUnitl :1
                    }
                },(err)=>{
                    if(!err){
                        resolve(true)
                    }else{
                        reject(err)
                    }
                })
            }else{
                let update = {
                    $inc:{
                        loginAttempts:1
                    }
                }
                if(this.loginAttempts + 1 >= MAX_LOGIN_TIMES&&!this.isLcoked){
                    updatedAt.$set= {
                        lockUnitl:Date.now() + LOCK_TIME
                    }
                }
                this.update(update, err=>{
                    if(!err)resolve(true)
                    else reject(err)
                })
            }
        })
    }
}
mongoose.model('Movie', userSchema)