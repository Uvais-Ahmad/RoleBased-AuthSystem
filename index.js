const express = require('express');
const app = express();
const port = 8000;
app.listen(port , (err)=>{
    if(err){
        console.log(`Error while running the server on Port : ${port}`);
    }
    console.log(`Server running on Port ${port}`);
})