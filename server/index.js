const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./graphql/schema')
const { default: mongoose } = require('mongoose')
const root = require('./graphql/root')

const app = express()

app.use(cors())

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))

async function start() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017')
        app.listen(5000, () => {
            console.log('Server started at port 5000')
        })
    } catch (error) {
        console.log(error)   
    }
}

start()
