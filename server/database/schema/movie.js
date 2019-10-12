const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mixed = Schema.types.Mixed
const MovieSchema = new Schema({
    doubanId:  String,
    rate: Number,
    title:String,
    summary:String,
    video:String,
    poster:String,
    cover: String,

    videoKey:String,
    posterKey:String,
    coverKey:String,

    rawTitle:String,
    movieType:[String],
    pubdate: Mixed,
    year: Number,
    tags:Array,
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
MovieSchema.pre('save',next =>{
    if(this.isNew){
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    }else{
        thos.meta.updatedAt = Date.now()
    }
    next()
})
mongoose.model('Movie', MovieSchema)