const getStandardReponse=(status, message, data) => {
    return {
        status: status,
        message: message,
        content: data,
        error: message?message:null
    }
}

module.exports = getStandardReponse