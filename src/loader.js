const DEFAULT_PORT = 3000

require('dotenv').config({ debug: process.env.DEBUG })

const Server = require('./config/server')
require('./config/routes')(Server)

const MongooseConnection = require('./config/database')

MongooseConnection
    .then(() => console.log('Mongoose sucessfully connected to MongoDB Atlas'))
    .then(() => Server.listen(process.env.PORT || DEFAULT_PORT, function () {
        console.log(`API is running at port ${process.env.PORT || DEFAULT_PORT}`);
    }))
    .catch((err) => {
        throw new Error({ message: 'Erro ao inicializar aplicação', error: err })
    })