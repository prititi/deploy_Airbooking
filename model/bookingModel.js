const mongoose= require('mongoose');

const bookingSchema= mongoose.Schema({
        user : { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        flight : { type: mongoose.Schema.Types.ObjectId, ref: 'flight' }
   
})

bookingModel= mongoose.model('book', bookingSchema)

module.exports={bookingModel}