const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())


let tasks = []



app.get('/tasks', (req, res)=> {
    res.json(tasks)
})


app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1, 
        task: req.body.task
    }
    tasks.push(newTask)
    res.status(201).json(newTask)
})

app.put('/tasks/:id', (req, res) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id))
    if(task){
        task.task = req.body.task
        res.json(task);
    }else {
        res.status(404).send('Task not found')
    }
})

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id)
    tasks = tasks.filter((t) => t.id !== taskId)
    res.status(204).send()
})
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})