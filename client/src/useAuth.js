import React, { useEffect } from 'react'

export default function useAuth(code) {
 const [accessToken, setAccessToken] = useState()
 const [refreshToken, setRefreshToken] = useState()
 const [expiresIn, setExpriesIn] = useState()

// console.log(refreshToken)

 useEffect(() => {
    axios
    .post('http://localhost:3001/refresh', {
        refreshToken,
    }).then(res => {
        setAccessToken(res.data.accessToken) 
        setExpriesIn(res.data.expiresIn)
        // takes out from url
        window.history.pushState({}, null, "/")
    })
    .catch(() => {
        window.location = "/"
    })
 },
    
useEffect(() => {

 },[refreshToken, expiresIn])


 return accessToken
}
