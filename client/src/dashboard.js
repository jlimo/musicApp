import {useState, useEffect } from 'react'
import useAuth from './useAuth'
import Player from './Player'
import TrackSearchResult from './TrackSearchResult'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new spotifyWebApi({
  clientId: "bf14bfb9cc244a3f99e7d027b077a331",
})

export default function dashboard({ code }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  // console.log(searchResults)

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearchResults('')

  }

  useEffect(() => {
    if(!accessToken) return
      spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
      if(!search) return setSearchResults([])
      if(!accessToken) return setSearchResults
   
      let cancel = false
      spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      res.body.tracks.items.map(tracks => {
        const smallestAlbumImage = track.album.images.reduce(smallest,image => {
          if (image.height < smallest.height) return image 
          return smallest
        }, track.album.images[0])


        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.url,
          albumUrl: smallestAlbumImage.url
        }
      })
    })
    return () => cancel = true
  }, [search, accessToken])


  

  return ( 
  <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
    <Form.Control type="search" placeholder='SearchSongs/Artists'
    value={search} onChange={e => setSearch(e.target.value)}
    />
    <div className="flex-grow-1 my -2" style={{ overflowY: "auto"}}>
      {searchResults.map(track => (
        <TrackSearchResult track= {track} key={track.url} 
        chooseTrack={chooseTrack}/>
      ))}
    </div>
    <div><Player accessToken={accessToken} trackUri={playingTrack?.uri} />
    </div>
  </Container>
  )
}
