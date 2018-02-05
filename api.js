require('dotenv').config()
const express = require ('express')
const app = express()
const HTTPError = require('node-http-error')
const bodyPaser = require('body-parser')
const port = process.env.PORT || 5000
const {pathOr, compose, filter, split, last, head, toLower} = require('ramda')

const cats = [
  {name: "Mittens", age: 3, gender: "Female", breed: "Tabby"},
  {name: "Muffins", age: 2, gender: "Male", breed: "Siamese"},
  {name: "Mr. Handsome", age: 8, gender: "Male", breed: "Tom"},
  {name: "Miss Krunkles", age: 5, gender: "Female", breed: "Torr"},
]

app.get('/', (req,res) => res.send('MEOW.'))

// http://localhost:5000/cats?filter=breed:Tabby

app.get('/cats', (req,res)=>{
// 'query' and 'filter' are properties of the req object that contains
// the request from the user...
// pathOr is taking req and returning the query and filter properties
// if there are none, then 'no filter' will be used.
  const queryFilter = pathOr('no filter', ['query','filter'], req)
  if (queryFilter === 'no filter'){
    res.send(cats)
  } else {
    const searchProp = compose(head, split(':')) (queryFilter)   // e.g.'breed'
    const searchValue = toLower(compose(last, split(':')) (queryFilter))  // e.g. 'Tabby'

  const catFilter = cat => {
    if (Number.isNaN(Number(searchValue))) {
      console.log('searchValue isNaN', searchValue)
      return (toLower(cat[searchProp]) == searchValue)
    } else {
      console.log('searchValue is a Number', searchValue)
      return cat[searchProp] == searchValue
    }
  }
  res.send(filter(catFilter, cats))
}
})


app.get('/cats', (req,res)=>res.send(cats))

app.listen(port, (req,res) => console.log('CATS running on port:!', port))
