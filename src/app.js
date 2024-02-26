const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')

// Define Paths for Express config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'My title',
        name: 'Dima'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.render('weather', {
            error: 'You must provide params'
        })
    }
    const address = req.query.address

    geocode(address, (error, { current } = {}) => {
        if (error) {
            return res.send({ error })
        }

        res.send(current)
    })
    // All query string key/value pairs are on req.query
    // return res.render('weather', {
    //     message: 'You provided "' +req.query.address + '" as the address."'
    // })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helpText: 'Help me!'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Dima'
    })
})

// app.get('/weather', (req, res) => {
//     // Provide an object to send as JSON
//     res.send({
//         forecast: 'It is snowing',
//         location: 'Philadelphia'
//     })
// })

app.get('*', (req, res) => {
    res.render('404', {
        title: 'My 404 page',
        name: 'Dima',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})