import {useState, useEffect } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({ accessToken}) {
  const[play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri])
  if (!accessToken) return null 
  return ( <spotifyPlayer
    token={accessToken}
    showSaveIcon
    callback={state => {if (!state.isPlaying) setPlay(false)
    }}
    play={play}
    uris={trackUri ? [trackUri] : []}
    />
  )
}
