import mongoose, { connect } from 'mongoose'

const connectDb = async() => {
    try {

        mongoose.connection.on('connected' ,()=> console.log('Database Connected'))
        await mongoose.connect(`${process.env.MONGO_URI}/watchShow`)
        
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDb