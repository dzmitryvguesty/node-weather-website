const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4e4f018bb444d929130c111d84068884&query=' + address

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else {
            callback(undefined, {
                current: body.current
            })
        }
        console.log(body.current)
    })
}
module.exports = geocode