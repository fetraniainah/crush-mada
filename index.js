const express = require('express')
const twig = require('twig')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const sqlite = require('sqlite3')



const db = new sqlite.Database('db.db',(err)=>{
    if(err) console.log(err)

    console.log("database connected")
})


app.set('views',path.join(__dirname,'templates'))
app.set('view engine', 'twig')

//middleware
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(bodyParser.urlencoded({extends:true}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.render('index',{name: 'fetra'})
})

app.get('/register',(req,res)=>{
    res.render('register',{name: 'fetra'})
})

app.post('/register',(req,res)=>{
    db.run('INSERT INTO user',[req.body.userName,req.body.password],(err,result)=>{
        if(err)
            console.log(err)
        res.redirect('home')
    })
})

app.post('/login',(req,res)=>{
    res.redirect('home')
})

app.get('/home',(req,res)=>{
    db.all("SELECT * FROM user", (err,result)=>{ 
        if(err)
            console.log(err)
            res.render('home',{user : result}); 
        })
})


















const port = process.env.PORT || 3000
    


app.listen(port,()=>{console.log(port)})

// index.js
module.exports = app