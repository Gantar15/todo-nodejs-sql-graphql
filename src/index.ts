
export{};
const express = require('express');
const path = require('path');
const {graphqlHTTP} = require('express-graphql');
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
app.use((req: any, resp: any, next: any) => {
    resp.sendFile('/index.html');
    next();
});

!async function start() {
    try {
        await sequelize.sync();
    } catch (error) {
        console.log(error);
    }
}();

const POST = process.env.PORT ?? 5000; 
app.listen(POST, () => {
    console.log("Server running!!!");
});