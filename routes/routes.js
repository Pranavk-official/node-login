const express = require('express');
const axios = require('axios');

const router = express.Router();


router.get('',(req,res) => {
    res.render('landing', {
        title: 'Landing Page'
    })
})


router.get('/login', (req,res) => {
    res.render('login', {
        title: 'Login Page'
    })
})

router.get('/home', async (req,res) => {
    try {
        const user = await axios.get(`https://reqres.in/api/users`)
        // console.log(user.data);
        res.render('homepage', {
            title:'Home Page',
            users: user.data.data
        })

    } catch (error) {
        console.log(error);
    }
})


module.exports = router