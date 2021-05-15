
export{};
const {Router} = require('express');
const router = Router();
const Todo = require('../models/todo');

//Получаем задачи
router.get('/', async (req: any, res: any) => {
    try {
        const todos = await Todo.findAll();
        res.status(200).json(todos);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Server error"});
    }
});

//Создаем задачу
router.post('/', async (req: any, res: any) => {
    try {
        const todo = await Todo.create({
            title: req.body.title,
            done: false
        });
        res.status(201).json({todo});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Server error"});
    }
});

//Изменение задачи
router.put('/:id', async (req: any, res: any) => {
    try {
        const todo = await Todo.findByPk(+req.params.id);
        if(todo){
            todo.done = req.body.done;
            await todo.save();
            res.status(200).json(todo);
        } else{
            res.status(400).json({message: "Bad request"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
});

//Удаление задачи
router.delete('/:id', async (req: any, res: any) => {
    try {
        const todos = await Todo.findAll({
            where: {
                id: +req.params.id
            }
        });

        if(todos){
            const todo = todos[0];
            await todo.destroy();
            res.status(200).json({});
        } else{
            res.status(400).json({message: "Bad request"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
});

module.exports = router;