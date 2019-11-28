const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const db = require('./config/config.js')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use('/uploads', express.static(__dirname + '/../uploads'))

require('./routes')(app)


db.sync({force: false})
  .then(() => {
    app.listen(8888)
    console.log(`Server started...`)
  })


  
  
