import ImmersiveVideoPlayer from './player.jsx'
import { sel } from './utils.js'
import React from 'react'
import { createRoot } from 'react-dom/client'

const video = sel('video')
const videoUrl = video.querySelector('source').getAttribute('src')

export default function Test() {
  createRoot(sel('#app')).render(<App />)
}
function App() {
  return (
    <>
      <ImmersiveVideoPlayer videoUrl={videoUrl} />
    </>
  )
}
