
export {};
const Todo = require('../models/todo');

interface User {
    name?: string,
    age?: number,
    email?: string
}

interface Todo{
    id: number;
    title: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
}

const users: User[] = [
    {name: "askd", age: 1232, email: "ninsindfu@mail.ru"},
    {name: "OgBuda", age: 666, email: "aspdp@mail.ru"}
];

module.exports = {
    test(): {
        number?: number,
        users?: User[]
    }{
        return {
            number: users.length,
            users
        };
    },
    random(object:{min: number, max: number, count: number}): number[]{
        const {count, min, max} = object;
        const arr: number[] = [];
        for (let index = 0; index < count; index++) {
            arr.push(+(min + Math.random() * (max - min)).toFixed(3));
        }
        return arr;
    },
    addTestUser({user: {name, email}}: {user: User}): User{
        const newUser: User = {
            name, email,
            age: Math.round(Math.random()*120)
        };
        users.push(newUser);

        return newUser;
    },
    async getTodos(): Promise<User>{
        try{
            return await Todo.findAll();
        } catch(err){
            throw new Error('Get todos is not work');
        }
    },
    async createTodo({todo} : {todo: Todo}): Promise<Todo>{
        try {
            const todoObj: Todo = await Todo.create({
                ...todo,
                done: false
            });
            return todoObj;
        } catch (error) {
            throw new Error('create todo is does not work');
        }
    },
    async completeTodo({id} : {id: string}): Promise<Todo>{
        try {
            const todoObj: any = await Todo.findByPk(+id);
            todoObj.done = true;
            await todoObj.save();
            return todoObj;
        } catch (error) {
            throw new Error('I can`t complete this task');
        }
    },
    async removeTodo({id} : {id: string}): Promise<boolean>{
        try {
            await Todo.destroy({
                where: {
                    id: +id
                }
            });
            return true;
        } catch (error) {
            throw new Error('I can`t remove this task');
            return false;
        }
    }
}