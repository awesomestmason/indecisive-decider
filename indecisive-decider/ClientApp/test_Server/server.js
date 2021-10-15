const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

/*
    "id": '420',
    "name": "Amelia Watson",
    "email": "gremlin@gmail.com",
    "password": "tableKun"
*/

const database = {
    users:[
        {
            id: '426',
            name: 'Gawr Gura',
            email: 'Senzawa@gmail.com',
            hash: '',
            password: 'galaxyBrain',
            entries: 0,
            joined: new Date()
        },

        {
            id: '425',
            name: 'Takanashi Kiara',
            email: 'Australia@gmail.com',
            hash: '',
            password: 'KFPveggieChicken',
            entries: 0,
            joined: new Date()
        },   
    ],

    login: [
        {
            id: 56789,
            hash: '',
            email: 'takodachi@gmail.com',
        }
    ]
}

app.get('/', (req, res)=> {
    //res.send('this is working');
    res.json(database.users);
});

app.post('/signIn', (req, res)=> {
    //res.json('Signing In...');

    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            //res.json('Welcome Back ' + database.users[0].name);
            res.json('success')
        } else{
            res.status(400).json('error logging in');
        }
});

app.post('/register', (req, res)=> {
    const {email, name, password} = req.body;
    /*bcrypt.hash(password, null, null, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash);
    });*/
    database.users.push({
        id: '420',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })

    res.json(database.users[database.users.length - 1])
});

app.get('/profile/:id', (req, res)=> {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            return res.json(user);
        }   
    })

    if(!found){
        res.status(400).json("[USER NOT FOUND]");
    }
});

app.put('/image', (req, res)=> {
    //res.json('Signing In...');
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }   
    })

    if(!found){
        res.status(400).json("[USER NOT FOUND]");
    }
});

app.listen(3000, ()=> {
    console.log("App is Running on Port 3000.")
});

/*
/-- res = this is working
/signIn --> POST = succesful/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT --> user
*/