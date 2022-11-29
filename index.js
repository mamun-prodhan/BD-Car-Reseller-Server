const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;



// middle wares
app.use(cors());
app.use(express.json());


// start 
app.get('/', (req, res) =>{
    res.send('assignment 12 server is running')
})



app.listen(port, ()=>{
    console.log(`assignment 12 server running on ${port}`);
})