const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const spotifyWebApi = require('spotify-web-api-node');
const SpotifyWebApi = require('spotify-web-api-node');


const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('/refresh', (req,res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUrl: 'http://localhost:3000', 
        clientId: 'bf14bfb9cc244a3f99e7d027b077a331',
        clientSecret: '3c53d32b3b9e48dc87f2ac3ceafd2de4',
        refreshToken,
    })

spotifyApi.refreshAccessToken()
.then(data => {
        res.json({
            accessToken: data.body.accessToken,
            expiresIn: data.body.expiresIn,
        })
    }).catch(() => {
       res.sendStatus(400) 
    })
})
   


app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyWebApi = new spotifyWebApi ({
        redirectUrl: 'http://localhost:3000', 
        clientId: 'bf14bfb9cc244a3f99e7d027b077a331',
        clientSecret: '3c53d32b3b9e48dc87f2ac3ceafd2de4'
    })

    spotifyApi.authorizeCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access.token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    })
    .catch(() => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.listen(3001)