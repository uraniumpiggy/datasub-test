export const expDateFormatter = (text, expDate, setExpDate, setCorrect) => {
    const lastCharacter = text.substr(text.length - 1)
    if (text.length === 0) {
        setExpDate('')
        return
    }
    if (expDate.length > text.length) {
        if (lastCharacter === '/' || text.length === 2) {
            setExpDate(text.substr(0, text.length - 1))
            return
        }
    } else if (text.length === 1 && parseInt(text) > 1) {
        text = '0' + text[0]
        setExpDate(text)
    }
    if (isNaN(parseInt(lastCharacter)) && lastCharacter !== '') {
        return
    } else {
        setExpDate(text.length >= 2 && !text.includes('/') ? 
            text.substr(0, 2) + '/' + text.substr(2)
            : text
        )
    }

    const expDateRegExp = /[01,02,03,04,05,06,07,08,09,10,11,12]\/\d{4}/
    const inputDate = new Date(parseInt(text.slice(3), 10), parseInt(text.slice(0,3), 10))

    if (expDateRegExp.test(text) && Date.now() < inputDate) {
        setCorrect(true)
    } else {
        setCorrect(false)
    }
}