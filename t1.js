// import 'videojs-vr'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-xr'
import 'videojs-contrib-quality-levels'
import hlsQualitySelector from 'videojs-hls-quality-selector'

import 'videojs-hls-quality-selector'

import { sel } from './utils'

export default function t1() {
  const video = sel('video')
  const player = videojs(video, {
    controls: true,
    sources: [
      {
        src: 'https://stream.mux.com/TKvJKNt871kHyxXiUuTWjDKAUVRAFPizG7GQPHgAxcI.m3u8',
        type: 'application/x-mpegURL',
      },
    ],
  })

  // videojs.registerPlugin('hlsQualitySelector', hlsQualitySelector)
  player.ready(() => {
    player.controls(true)
    // player.vr({ projection: '360' })
    player.xr()
    player.hlsQualitySelector({
      displayCurrentQuality: true,
    })
    // console.log(player.hlsQualitySelector)

    // Log available quality levels
    // for (let i = 0; i < qualityLevels.length; i++) {
    //   const level = qualityLevels[i]
    //   console.log(`Quality level: ${level.height}p`)
    // }
    const qualityLevels = player.qualityLevels()

    // Wait until quality levels are populated
    qualityLevels.on('addqualitylevel', () => {
      // Iterate over the available quality levels
      for (let i = 0; i < qualityLevels.length; i++) {
        const level = qualityLevels[i]

        // Set the default quality (e.g., 720p)
        if (level.height === 720) {
          level.enabled = true // Enable the 720p level
        } else {
          level.enabled = false // Disable other levels
        }
      }
    })

    console.log(player.paused(), qualityLevels.length)
  })
  setTimeout(() => {
    console.log(player.pause())
  }, 300)
}
