const express=require('express');
const app=express();
const blogRoutes=require('./routes/blogRoutes');
const conn=require("./services/db");
conn.dbConnection();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api/v1/blogs',blogRoutes);  
app.use("/*",(req,res)=>
{
    res.send("No routes");
});
app.listen(4000,()=>{
    console.log("Server is running in port number:4000");
});

