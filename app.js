// Send a request as JSON template, and receive the result
const express = require('express')
const bodyParser = require('body-parser')
const ST = require('stjs')
const app = express()
const chalk = require('chalk');
const db = {
  users: [{
    "user_id": 1, "title": "hello world", "content": "just setting up my blog", "created_at": 1505777155159
  }, {
    "user_id": 1, "title": "post2", "content": "second post", "created_at": 1505756257359
  }, {
    "user_id": 2, "title": "cool", "content": "cool blog bro", "created_at": 1504777258259
  }, {
    "user_id": 3, "title": "im here", "content": "im here too, welcome me", "created_at": 1503777259159
  }]
}
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('.'))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.post('/query', function(req, res){
  let jsonql = req.body;
  console.log(chalk.yellow("####################\n> Request: "), JSON.stringify(jsonql, null, 2));
  let response = ST.select(jsonql)
                    .transform(db)
                    .root();

  console.log(chalk.green("< Response: "), JSON.stringify(response, null, 2));
  res.json(response);
});
app.listen(process.env.PORT || 3000, function () { console.log(chalk.green('Express server started... Listening at http://localhost:3000!')) })
