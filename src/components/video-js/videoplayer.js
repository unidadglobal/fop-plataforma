import React from 'react';
import videojs from 'video.js'

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return null
  }

  componentDidUpdate(prevProps) {
    if (this.props.sources[0].src.includes("mp4") && !this.props.sources[0].type.includes("mp4")){
      this.player.src({ //set the players new source
        src: this.props.sources[0].src,
        type: "video/mp4"
      })
    }
    else{
      this.player.src({ //set the players new source
        src: this.props.sources[0].src,
        type: "application/x-mpegURL"
      })
    }
    /*
    if (prevProps.sources[0].src !== this.props.sources[0].src) { //see if the src changes
      console.log("CAMBIASTE PERRO")
      this.player.src({ //set the players new source
        src: this.props.sources[0].src,
        type: this.props.sources[0].src.includes(".mp4") ? "video/mp4" : "application/x-mpegURL"
      })
    }
    */
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video ref={node => this.videoNode = node} className="video-js vjs-big-play-centered" id="videoplayer" data-setup='{"fluid": true}'></video>
        </div>
      </div>
    )
  }
}