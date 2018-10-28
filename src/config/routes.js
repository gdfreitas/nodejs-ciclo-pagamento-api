const express = require('express')
const auth = require('./auth')

module.exports = server => {
  // rotas protegidas por JWT
  const protectedApi = express.Router()
  protectedApi.use(auth)

  server.use('/api', protectedApi)

  const CicloPagamento = require('../api/modules/ciclo-pagamento/ciclo-pagamento.service')
  CicloPagamento.register(protectedApi, '/ciclos-pagamentos')

  // ROTAS PÚBLICAS
  const openApi = express.Router()
  server.use('/oapi', openApi)

  const AuthService = require('../api/core/user/auth.service')
  openApi.post('/login', AuthService.login)
  openApi.post('/signup', AuthService.signup)
  openApi.post('/authorize', AuthService.authorize)
}
