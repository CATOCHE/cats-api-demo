require('dotenv').config()
const express = require ('express')
const app = express()
const HTTPError = require('node-http-error')
const bodyPaser = require('body-parser')
const port = process.env.PORT || 5000

app.get('/', (req,res) => res.send('MEOW.'))

app.listen(port, (req,res) => console.log('CATS running on port:!', port))
