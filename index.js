import express from 'express'
import mongoose from 'mongoose';
import cors from "cors"
import { create, getAll, getOne, remove, update } from './controlles/PostController.js';

import { postValidator } from './validation.js';


mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.ypdaeoi.mongodb.net/blog?retryWrites=true&w=majority',)
.then(()=> {console.log("MongoDB OK!")})
.catch((err) => {console.log("error db", err)})

const app = express()

app.use(express.json());



app.post('/posts', postValidator, create );
app.get('/posts',  getAll );
app.get('/posts/:id',  getOne );
app.delete('/posts/:id', remove);
app.patch('/posts/:id',postValidator, update)

const port = process.env.PORT || 5000

app.listen(port, (err) => {
  if(err) {
    return console.log(err)
  }
  console.log('server ok!', port)
} )