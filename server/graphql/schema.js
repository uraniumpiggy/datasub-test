const { buildSchema } = require('graphql')

const schema = buildSchema(`

    type CardData {
        id: ID,
        CardNumber: String,
        ExpDate: String,
        Cvv: String,
        Amount: Int
    }

    input CardDataInput {
        id: ID,
        CardNumber: String!,
        ExpDate: String!,
        Cvv: String!,
        Amount: Int!
    }

    type Query {
        getCard(id: ID): CardData
        getAllCards: [CardData]
    }

    type Mutation {
        createCard(input: CardDataInput): CardData
    }
`)

module.exports = schema