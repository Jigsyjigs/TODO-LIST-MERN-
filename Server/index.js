import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import TodoModel from './Models/Todo.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://jigs:<password>@cluster0.9vpud.mongodb.net/todolist?retryWrites=true&w=majority&appName=Cluster0')

app.get('/get', (req,res) => {
    TodoModel.find()
    .sort ({createdAt: -1})
    .then (result => res.json(result))
    .catch (err => res.json(err))
})

app.put('/update/:id', (req,res) => {
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req,res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }) .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req,res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then (result => res.json(result))
    .catch (err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running")
})
