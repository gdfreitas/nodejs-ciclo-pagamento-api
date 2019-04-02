const _ = require('lodash')

function mapErrorMessages(bundledErrors) {
    const errors = []
    _.forIn(bundledErrors, error => errors.push(error.message))
    return errors
}

module.exports = { mapErrorMessages }