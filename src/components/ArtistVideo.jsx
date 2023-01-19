import React from 'react'
import YoutubePlayer from 'react-native-youtube-iframe'

const ArtistVideo = ({videoId}) => {
  return (
    <YoutubePlayer webViewStyle={ {opacity:0.99} } height={300} videoId={videoId} />
  )
}

export default ArtistVideo