import { gql } from "@apollo/client";


export const ADD_NEW_CARD = gql`
    mutation createCard($input: CardDataInput) {
        createCard(input: $input) {
            id, Amount
        }
    }
`