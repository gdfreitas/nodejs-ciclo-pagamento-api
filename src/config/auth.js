const jwt = require('jsonwebtoken')

const { FORBIDDEN } = require('http-status-codes')

// filtro de autenticação genérico para aplicação
module.exports = (req, res, next) => {
    // CORS preflight request
    if (req.method === 'OPTIONS') {
        next()
    } else {
        // token pode vir no body, queryParams ou headers
        const token = req.body.token || req.query.token || req.headers['authorization'] || req.headers['Authorization']

        if (!token) {
            return res
                .status(FORBIDDEN)
                .send({ errors: ['Nenhum token foi fornecido.'] })
        }

        // verifica se o jwt token foi criado com base no .env secret da aplicação
        jwt.verify(token, process.env.AUTH_SECRET, function (err, decoded) {
            if (err) {
                return res
                    .status(FORBIDDEN)
                    .send({ errors: ['Não foi possível autenticar o token.'] })
            } else {
                req.decoded = decoded
                next()
            }
        })
    }
}
