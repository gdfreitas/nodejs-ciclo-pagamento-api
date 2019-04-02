const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('./user')

const { mapErrorMessages } = require('../../common/error-utils')

const ALLOWED_EMAIL_PATTERN = /\S+@\S+\.\S+/
const ALLOWED_PASSWORD_PATTERN = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

const { OK, BAD_REQUEST } = require('http-status-codes')

const login = (req, res, next) => {
    const email = req.body.email || ''
    const password = req.body.password || ''

    User.findOne({ email }, (err, user) => {
        // se houver algum erro do banco, responder com as mensagens de erro
        if (err) {
            const errors = mapErrorMessages(err);
            return res.status(BAD_REQUEST).json({ errors })
        }

        // se achou um usuário, comparar os passwords
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(user.toJSON(), process.env.AUTH_SECRET, {
                expiresIn: '1 day'
            }) // gera um token com o .env authSecret de 1 day
            const { name, email } = user
            res.json({ name, email, token }) // responde com nome, email e token
        } else {
            return res
                .status(BAD_REQUEST)
                .send({ errors: ['Usuário ou senha inválidos'] })
        }
    })
}

const authorize = (req, res, next) => {
    const token = req.body.token || ''
    jwt.verify(token, process.env.AUTH_SECRET, function (err, decoded) {
        return res.status(OK).send({ valid: !err })
    })
}

const signup = (req, res, next) => {
    const name = req.body.name || ''
    const email = req.body.email || ''
    const password = req.body.password || ''
    const confirmPassword = req.body.confirm_password || ''

    // tem que bater com o regex de e-mail
    if (!email.match(ALLOWED_EMAIL_PATTERN)) {
        return res
            .status(BAD_REQUEST)
            .send({ errors: ['O e-mail informado está inválido'] })
    }

    // tem que bater com regex do password
    if (!password.match(ALLOWED_PASSWORD_PATTERN)) {
        return res
            .status(BAD_REQUEST)
            .send({
                errors: [
                    'A senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$ %) e tamanho entre 6 - 20.'
                ]
            })
    }

    const salt = bcrypt.genSaltSync() // "sal" auxilia geração do hash
    const passwordHash = bcrypt.hashSync(password, salt)

    // verifica se os hashs da senha bate com a confirmação
    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(BAD_REQUEST).send({
            errors: ['As senhas não conferem.']
        })
    }

    // verifica se já existe este usuário no banco pelo e-mail
    User.findOne({ email }, (err, user) => {
        // caso ocorra algum erro
        if (err) {
            const errors = mapErrorMessages(err);
            return res.status(BAD_REQUEST).json({ errors })
        }

        // se já existe, retorna usuário já cadastrado
        if (user) {
            return res.status(BAD_REQUEST).send({
                errors: ['Usuário já cadastrado.']
            })
        } else {
            // cria novo usuário
            const newUser = new User({ name, email, password: passwordHash })
            newUser.save(err => {
                if (err) {
                    const errors = mapErrorMessages(err);
                    return res.status(BAD_REQUEST).json({ errors })
                } else {
                    login(req, res, next)
                }
            })
        }
    })
}

module.exports = { login, signup, authorize }
