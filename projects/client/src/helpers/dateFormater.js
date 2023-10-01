const dateFormater = (date) => {
    return new Date(date).toLocaleDateString("en-EN", {
        year: "2-digit",
        month: "short",
        day: "2-digit"
        })
}

module.exports = dateFormater