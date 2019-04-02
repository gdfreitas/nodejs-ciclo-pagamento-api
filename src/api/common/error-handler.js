const _ = require('lodash')

const { mapErrorMessages } = require('./error-utils')

const { INTERNAL_SERVER_ERROR } = require('http-status-codes')

module.exports = (req, res, next) => {
    const bundle = res.locals.bundle

    if (bundle.errors) {
        let errors = mapErrorMessages(bundle.errors)
        res.status(INTERNAL_SERVER_ERROR).json({ errors })
    } else {
        next()
    }
}