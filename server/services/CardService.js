const Card = require("../models/Card");

class CardService {
    async getCard(id) {
        return await Card.findById(id)
    }

    async createCard(cardData) {
        const card = new Card(cardData)
        await card.save()
        return card
    }

    async getAllCards() {
        return await Card.find()
    }
}

module.exports = new CardService()