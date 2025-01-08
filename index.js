const express = require('express')
const bodyParser = require('body-parser')
const db = require("./db");
const BookSchema = require('./BookModal')
const port = 3000
const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())



app.get('/book',async(req,res)=>{
     try {
        const bookData = await BookSchema.find();
        if(bookData){
            res.status(200).json({"books":bookData});
        }
     } catch (error) {
        res.status(500).json({"msg":"something wrong","error-msg":error});
     }
})

app.get('/book/:id',async(req,res)=>{
    const id=req.params.id;
    try {
        const bookData = await BookSchema.findById(id);
        if(bookData){
            res.status(200).json({"book":bookData});
        }
     } catch (error) {
        res.status(500).json({"msg":"something wrong"});
     }
})

app.post('/book',async(req,res)=>{
    try {
        const bookObj ={title:req.body.title,author:req.body.author,year:req.body.year};
        console.log(bookObj)
        const bookResult = new BookSchema(bookObj);
        const response = await bookResult.save();
        if(bookResult){
            res.status(200).json({"msg":"Book added","book":response});
        }
    } catch (error) {
        res.status(500).json({"msg":"something wrong","error-msg":error});
    }
})

app.delete('/book/:id',async(req,res)=>{
    const id=req.params.id;
    try {
        const bookData = await BookSchema.findByIdAndDelete(id);
        if(bookData){
            res.status(200).json({"book":bookData});
        }
     } catch (error) {
        res.status(500).json({"msg":"something wrong"});
     }
})

app.patch('/book/:id',async(req,res)=>{
    const id = req.params.id;
    console.log(req.body);
    try {
        const bookObj ={title:req.body.title,author:req.body.author,year:req.body.year};
        console.log(bookObj);
        const bookResult = await BookSchema.findByIdAndUpdate({_id:id},bookObj)
        if(bookResult){
            res.status(200).json({"msg":"Book updated"});
        }
    } catch (error) {
        res.status(500).json({"msg":"something wrong","error-msg":error});
        console.log(error)
    }

})

app.listen(port,()=>{
    console.log(`you app running on port${port}`);
})