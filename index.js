const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));




app.use(todoRoutes)

async function start() {
  try {
    await mongoose.connect(
      // 'mongodb+srv://backyard:12345@cluster0-gsnsn.mongodb.net/bikeRent',
      'mongodb://localhost:27017/bikeRent',
      {
        useNewUrlParser: true,
        useFindAndModify: false
      }
    )
    app.listen(PORT, () => {
      console.log('Server has been started @...',PORT)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
