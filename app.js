const express=require('express');
const { ObjectId } = require('mongodb');
const {connectToDb,getDb}=require('./db')


const app=express();

let db

connectToDb((err)=>{
    if (!err){
        app.listen(3000,()=>{
            console.log("app listening on port 3000");  
        })
        db=getDb()
    }
})




app.get('/books',(req,res)=>{
    let books=[]

    db.collection('books')
        .find()
        .sort({author:1})
        .forEach(book=>books.push(book))
        .then(()=>{
            res.status(200).json(books)
        })
        .catch(()=>{
            res.status(500).json({error:"Could not fetch the documents"})
        })
    res.json({mssg:'Welcome to the api'})
})
app.get('/books/:id',(req,res)=>{
    let books=[]

    db.collection('books')
        .findOne({_id:ObjectId(req.params.id)})
        .then(doc=>{
            res.status(200).json(doc)
        })
        .catch(()=>{
            res.status(500).json({error:"Could not fetch the documents"})
        })
})