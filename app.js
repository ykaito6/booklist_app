const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));

//MySQL－－－－－－－－－－－－－－－－－－－－－－－－
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kHs6aBmysql',
  database: 'booklist_app'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

//－－－－－－－－－－－－－－－－－－－－－－－－

// 練習欄-----------------------------------------
app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM users',
    (error, results) => {
      console.log(results);
      res.render('title.ejs');
    }
  );
});
//-----------------------------rennshuu owari


//画面遷移ーーーーーーーーーーーーーーーーーーーーーーーーーーーー


app.get('/', (req, res) => {
  res.render('title.ejs');
});

app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM book_info',
    (error, results) => {
      res.render('index.ejs',{book_info: results});
    }
  );


});

app.get('/add-book',(req,res)=>{
  res.render('add-book.ejs');
});

//ーーーーーーーーーーーーーーーーーーーーーーーーーーーー

//データ処理ーーーーーーーーーーーーーーーーーーーーーーー
app.use(express.urlencoded({extended: false}));

app.post('/create',(req, res)=>{
  
  connection.query(
    'INSERT INTO book_info (name,author,status_id) VALUES (?,?,?)',
    [req.body.bookTitle,req.body.bookAuthor,req.body.bookStatus],
    (error,results)=>{
      res.redirect('/index');
    }
    );
  
});

app.post('/delete/:id', (req, res)=>{
  connection.query(
    'DELETE FROM book_info WHERE id=?',
    [req.params.id],
    (error, results)=>{
      res.redirect('/index');
    }
  );
});

//ーーーーーーーーーーーーーーーーーーーーーーー
app.listen(3000);