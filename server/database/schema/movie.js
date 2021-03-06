const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId,Mixed} = Schema.Types
const MovieSchema = new Schema({
    doubanId:  String,
    category:[{
        type:ObjectId,
        ref:'Category'
    }],
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
            default:Date.now()
        },
        updatedAt:{
            type:Date,
            default:Date.now()
        }
    }
})
MovieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    }else{
        thos.meta.updatedAt = Date.now()
    }
    next()
})
mongoose.model('Movie', MovieSchema)