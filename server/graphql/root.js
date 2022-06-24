const CardService = require("../services/CardService")

const root = {
    createCard: ({input}) => {
        return CardService.createCard(input)
    },
    getAllCards: () => {
        return CardService.getAllCards()
    },
    getCard: ({id}) => {
        return CardService.getCard(id)
    },
}

module.exports = root