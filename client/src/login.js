import React from 'react'

import { Container } from 'react-bootstrap'

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=bf14bfb9cc244a3f99e7d027b077a331&response_type=code&redirect_url=https://localhost:3000&scope=streaming&20user-read-email%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


export default function Login() {
  
 return (
 <Container className="d-flex justify-center align-items-center" 
 style={{ minHeight: "100vh" }}
 >
    <a className="btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
    </a>
    </Container>
    )
}

