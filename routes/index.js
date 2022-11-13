var express = require('express');
var router = express.Router();

const todo = require('../controllers/todo.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/list/:action', todo.todo)

router.get('/list/:action/:id', todo.todo)

router.post('/list/:action', todo.todo);

router.put('/list/:action/:id', todo.todo);

router.delete('/list/:action/:id', todo.todo);


module.exports = router;
