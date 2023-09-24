const express = require('express');
const axios = require('axios');
const router = express.Router()

const credentials = {
    name: 'Admin',
    email: 'admin@gmail.com',
    password: 'admin@123'
}

// authMiddleware
const authMiddleware = (req,res,next) => {
    if (req.session.authorized) {
        next()
    }else {
        return res.render('login', {
            title: 'Login Page',
            error: null,
            authorized: false
        })
    }
}

router.get('/', authMiddleware, (req, res) => {
    return res.redirect('/home')
})

router.get('/login', (req, res) => {
    try {
        return res.redirect('/home')
    } catch (error) {
        console.log(error);
    }
})



router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body
        if (email === credentials.email && password === credentials.password) {
            req.session.user = credentials.name
            req.session.authorized = true
            res.redirect('/home')
        } else {
            if (email !== credentials.email || password !== credentials.password) {
                res.render('login', {
                    title: 'Login Page',
                    error: 'Incorrect Email or Password'
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
})


router.get('/home', authMiddleware,async (req, res) => {

    try {
        const userCards = await axios.get(`https://reqres.in/api/users`)
        return res.render('homepage', {
            title: 'Home Page',
            user_name: req.session.user,
            users: userCards.data.data,
            authorized: true
        })
    } catch (error) {
        console.log(error);
    }
})



/**
 * GET /
 * Logout
 */

router.get('/logout', (req,res) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                console.log(error);
                res.send(`Error: ${error}`)
            } else {
                res.redirect('/')
            }
        })
    } catch (error) {
        console.log(error);
    }
})




module.exports = router








