const jwtDecode = require('jwt-decode')
const ROOT_PATH = "http://localhost:3000"
let accessToken = null

exports.getAllQuestions = function (callback) {
    const request = new XMLHttpRequest()
    request.open("GET", ROOT_PATH + "/questions")
    request.send()
    request.addEventListener("load", () => {
        const status = request.status
        switch (status) {
            case 200:
                const bodyAsString = request.responseText
                const questions = JSON.parse(bodyAsString)
                callback([], questions)
                break
            case 500:
                callback(["Unknown server error"])
                break
            default:
                callback(["Unknown server error"])
        }
    })
}

exports.getQuestionById = function (id, callback) {
    const request = new XMLHttpRequest()
    request.open("GET", ROOT_PATH + "/questions/" + id)
    request.send()
    request.addEventListener("load", () => {
        const status = request.status
        switch (status) {
            case 200:
                const bodyAsString = request.responseText
                const question = JSON.parse(bodyAsString)
                callback([], question)
                break
            case 404:
                callback(["Question is not found"])
                break
            case 500:
                callback(["Unknown server error"])
                break
            default:
                callback(["Unknown server error"])
        }
    })
}

exports.createQuestion = function (accountId, title, description, callback) {
    const question = {
        accountId,
        title,
        description
    }
    const request = new XMLHttpRequest()
    request.open("POST", ROOT_PATH + "/questions")
    request.setRequestHeader("Content-Type", "application/json")
    request.setRequestHeader("Authorization", "Bearer " + accessToken)
    request.send(JSON.stringify(question))
    request.addEventListener("load", () => {
        const status = request.status
        switch (status) {
            case 201:
                const location = request.getResponseHeader("Location")
                const id = parseInt(location.substr("/questions/".length))
                callback([], id)
                break
            case 400:
                const errors = JSON.parse(request.responseText)
                callback(errors)
                break
            case 401:
                callback(["Unauthorized"])
                break
            case 500:
                callback(["Unknown server error"])
                break
            default:
                callback(["Unknown server error"])
        }
    })
}

module.exports.signOut = function (callback) {
    accessToken = null
    callback()
}

module.exports.signUp = function (username, name, password, callback) {
    const bodyToSend = {
        username,
        name,
        password,
    }
    const request = new XMLHttpRequest()
    request.open("POST", ROOT_PATH + "/accounts")
    request.setRequestHeader("Content-Type", "application/json")
    request.send(JSON.stringify(bodyToSend))
    request.addEventListener("load", () => {
        const status = request.status
        switch (status) {
            case 201:
                const location = request.getResponseHeader("Location")
                const id = parseInt(location.substr("/accounts/".length))
                callback([], id)
                break
            case 400:
                const errors = JSON.parse(request.responseText)
                callback(errors)
                break
            case 500:
                callback(["Unknown server error"])
                break
            default:
                callback(["Unknown server error"])
        }
    })
}


exports.signIn = function (username, password, callback) {
    const data = {
        username,
        password,
        grant_type: "password"
    }
    const request = new XMLHttpRequest()
    request.open("POST", ROOT_PATH + "/tokens")
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    const bodyToSend = new URLSearchParams()
    for (const key of Object.keys(data))
        bodyToSend.append(key, data[key])
    request.send(bodyToSend.toString())
    request.addEventListener("load", () => {
        const status = request.status
        switch (status) {
            case 200:
                const body = JSON.parse(request.responseText)
                accessToken = body.access_token
                const payload = jwtDecode(body.id_token)
                const signedAccount = {
                    id: payload.sub,
                    username: payload.preferred_username,
                    displayName: payload.name
                }
                callback([], signedAccount)
                break
            case 400:
                const error = JSON.parse(request.responseText).error
                if (error == "invalid_request")
                    callback(["Username and password are required."])
                else if (error == "invalid_client")
                    callback(["Username or password is incorrect."])
                else
                    callback(["Unknown 400 error"])
                break
            case 500:
                callback(["Unknown server error"])
                break
            default:
                callback(["Unknown server error"])
        }
    })
}

exports.getAnswerByQuestionId = function (id, callback) {
    const request = new XMLHttpRequest()
    request.open("GET", ROOT_PATH + "/questions/" + id + "/answers")
    request.send()
    request.addEventListener("load", () => {
        const status = request.status
        switch (status) {
            case 200:
                const bodyAsString = request.responseText
                const answers = JSON.parse(bodyAsString)
                callback([], answers)
                break
            case 500:
                callback(["Unknown server error"])
                break
            default:
                callback(["Unknown server error"])
        }
    })
}
