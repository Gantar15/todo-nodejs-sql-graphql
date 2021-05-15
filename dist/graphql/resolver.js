"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Todo = require('../models/todo');
const users = [
    { name: "askd", age: 1232, email: "ninsindfu@mail.ru" },
    { name: "OgBuda", age: 666, email: "aspdp@mail.ru" }
];
module.exports = {
    test() {
        return {
            number: users.length,
            users
        };
    },
    random(object) {
        const { count, min, max } = object;
        const arr = [];
        for (let index = 0; index < count; index++) {
            arr.push(+(min + Math.random() * (max - min)).toFixed(3));
        }
        return arr;
    },
    addTestUser({ user: { name, email } }) {
        const newUser = {
            name, email,
            age: Math.round(Math.random() * 120)
        };
        users.push(newUser);
        return newUser;
    },
    getTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Todo.findAll();
            }
            catch (err) {
                throw new Error('Get todos is not work');
            }
        });
    },
    createTodo({ todo }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todoObj = yield Todo.create(Object.assign(Object.assign({}, todo), { done: false }));
                return todoObj;
            }
            catch (error) {
                throw new Error('create todo is does not work');
            }
        });
    },
    completeTodo({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todoObj = yield Todo.findByPk(+id);
                todoObj.done = true;
                yield todoObj.save();
                return todoObj;
            }
            catch (error) {
                throw new Error('I can`t complete this task');
            }
        });
    },
    removeTodo({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Todo.destroy({
                    where: {
                        id: +id
                    }
                });
                return true;
            }
            catch (error) {
                throw new Error('I can`t remove this task');
                return false;
            }
        });
    }
};
