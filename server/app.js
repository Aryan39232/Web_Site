const express = require('express')
const app = express()
const dotenv = require("dotenv")


dotenv.config({ path : './config.env'});
const PORT = process.env.PORT;

require('./DB/connection')
app.use(express.json());
app.use(require('./router/auth'));
// we link 
const middleware = (req , res , next) =>{
    console.log(`Hello my middleware`);
    next();
}



// app.get('/', (req , res) => {
//     res.send(`Hello word from the server`);
// });

// app.get('/about', middleware ,(req , res) => {
//     res.send(`Welcome to about Page`);
// })

// app.get('/contact' , (req , res) => {
//     res.send(`Welcome to contact Page`);
// })

// app.get('/signin' , (req , res) => {
//     res.send(`Welcome to signin Page`);
// })

// app.get('/signup' , (req , res) => {
//     res.send(`Welcome to signup Page`);
// })

app.listen(PORT , () =>{
    console.log(`server is running at port no ${PORT}`);
});
