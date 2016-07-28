import React from 'react'
import ReactDOM from 'react-dom'
import {BASE_PAGE_DIR} from 'macros.js'

import Video from "react-h5-video"
import 'react-h5-video/lib/react-html5-video.css'

import './VideoPlayer.less'
class VideoPlayer extends React.Component {
	componentDidMount = () => {
		// videojs("example_video_1", {}, function(){
		//   // Player (this) is initialized and ready.
		// });
		//'http://eisneim.github.io/react-html5-video/video/video.mp4'
	};
  render() {
    return (
      <div className="palyer-wrap" >
				{
					this.props.url ?
					(
						<Video
							sources={[this.props.url]}
							poster={this.props.screenshot}
							autoPlay={false}
							width={`${window.innerWidth}px`}
							height={`${window.innerWidth}px`}
							autoHideControls={false}
						>
						</Video>
					) : ''
				}


      </div>
    )
  }
}

export default VideoPlayer
