export const cardNumberFormatter = (text, cardNumber, setCardNumber, setCorrect) => {
    const lastCharacter = text.substr(text.length - 1)
    if (text.length === 0) {
        setCardNumber('')
        return
    }
    if (cardNumber.length > text.length) {
        if (lastCharacter === ' ') {
            setCardNumber(text.substr(0, text.length - 1))
        }
    }
    if (isNaN(parseInt(lastCharacter)) && lastCharacter !== '') {
        return
    } else {
        const res = text.replace(/\s/g, '').match(/.{1,4}/g).join(' ')
        setCardNumber(res)
    }

    const expDateRegExp = /\d{4}\s\d{4}\s\d{4}\s\d{4}/
    if (expDateRegExp.test(text)) {
        setCorrect(true)
    } else {
        setCorrect(false)
    }
}