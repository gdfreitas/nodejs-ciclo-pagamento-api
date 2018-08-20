const express = require('express')
const auth = require('./auth')

// instância do server deve vir por para decorar
module.exports = (server) => {

   // ROTAS PROTEGIDAS por JWT
   const protectedApi = express.Router()
   server.use('/api', protectedApi)

   // ROTAS PÚBLICAS
   const openApi = express.Router()
   server.use('/oapi', openApi)

}