const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1] // BEARER token

        if (!token) {
            res.status(401).json({error: "Ошибка. Не авторизованный запрос."})
        }
        const decoded = jwt.verify(token, config.get('jwtSecretKey'))
        req.user = decoded
        next()
    }
    catch {
        res.status(401).json({error: "Ошибка. Не авторизованный запрос."})
    }
}


