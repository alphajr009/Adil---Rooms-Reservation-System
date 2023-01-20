const { default: mongoose } = require("mongoose");
mongoose.set('strictQuery', true);

var mongoURL = 'mongodb+srv://alpha09:alpha119911@cluster0.cd9yba2.mongodb.net/Mern-rooms-adil'

mongoose.connect(mongoURL ,{useUnifiedTopology : true ,useNewUrlParser : true ,})



var connection = mongoose.connection

connection.on('error', ()=> {
    console.log('MongDB Connection Failed')
})

connection.on('connected' , ()=>{
    console.log('MongoDB Connection Successful')
})

module.exports  = mongoose