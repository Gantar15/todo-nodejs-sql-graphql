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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const { graphqlHTTP } = require('express-graphql');
const sequelize = require('./utils/db');
const schema = require('./graphql/schema.js');
const resolver = require('./graphql/resolver.js');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true
}));
app.use((req, resp, next) => {
    resp.sendFile('/index.html');
    next();
});
!function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.sync();
        }
        catch (error) {
            console.log(error);
        }
    });
}();
const POST = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
app.listen(POST, () => {
    console.log("Server running!!!");
});
