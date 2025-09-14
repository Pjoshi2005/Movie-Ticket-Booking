import mongoose from 'mongoose'
import Movie from './movie.js'

const showSchema = new mongoose.Schema(
    {
        movie:{type : String , required : true , ref: Movie},

        showDateTime:{type : Date , required : true},

        showPrice:{type : Number , required : true},

        occupied_seats : {type : Object , default : {}}

    },{minimize : false} // for deafault  value we use minimize = false
)

const Show = mongoose.model('Show' , showSchema)

export default Show