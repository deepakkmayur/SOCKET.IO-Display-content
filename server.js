const express=require('express')
const dotenv=require('dotenv').config()  
const app=express()

const http=require('http').createServer(app)      
const io=require('socket.io')(http)   

app.get('/',(req,res)=>{
   res.sendFile(__dirname+'/public/display.html')   
})

app.get('/admin',(req,res)=>{
   res.sendFile(__dirname+'/public/admin.html')
})

io.on("connection",(socket)=>{
console.log("new connection established  ");

socket.on("disconnect",()=>{
   console.log("connection disconnect");
})
socket.on("message",(txt)=>{   
console.log(txt);
io.emit("display_content",txt) 
})
})

http.listen(process.env.PORT,()=>console.log(`server connected to port : ${process.env.PORT}`)) 