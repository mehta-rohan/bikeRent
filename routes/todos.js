const {
  Router
} = require('express')
const Todo = require('../models/Todo')
const router = Router()
const assert = require('assert')
const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/bikeRent';


router.get('/', async (req, res) => {
  const todos = await Todo.find({})

  res.render('index', {
    title: 'Todos list',
    isIndex: true,
    todos
  })
})

router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create new rent',
    type: 'Choose type',
    price: '$',
    status: 'false',
    isCreate: true
  })
})

router.post('/create', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    type: req.body.type,
    price: req.body.price,
    status: req.body.status
  })

  await todo.save()
  res.redirect('/')
})

router.post('/delete', async (req, res) => {
  const todo = await Todo.findByIdAndRemove(req.body.id)
  await todo.save()


  res.redirect('/')

});


router.get('/rented', async (req, res) => {
  const todos = await Todo.find({
    status: true
  })

  res.render('rented', {
    title: 'Rented Todos list',
    isIndex: true,
    todos
  })

});

router.post('/rented', function (req, res, next) {
  let status = req.body;
  console.log(status)
  Todo.updateOne({
    _id:req.body.id
  }, {
    $set: {
      status: true
    }
  }, function (err, result) {
    console.log(err,result)
    console.log('Item updated');
  });
  res.redirect('/')
});

router.post('/delete', async (req, res) => {
  const todo = await Todo.findByIdAndRemove(req.body.id)
  await todo.save()
  res.redirect('/')
});



module.exports = router