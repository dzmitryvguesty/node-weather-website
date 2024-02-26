const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')

// Define Paths for Express config
const app = express()
const port = process.env.PORT || 3000
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

app.get('*', (req, res) => {
    res.render('404', {
        title: 'My 404 page',
        name: 'Dima',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})