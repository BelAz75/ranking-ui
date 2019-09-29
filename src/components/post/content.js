import React, { Component } from 'react';
import { Cell } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import uuid from 'uuid';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import placeholderImage from './placeholder-image.png';
import playButton from './play.png';

class CosmoContent extends Component {
  constructor (props) {
    super(props);

    const { content } = props;

    const id = uuid.v4();

    this.state = {
      content,
      id,
    };

    this.playVideo  = this.playVideo.bind(this);
    this.videoEnded = this.videoEnded.bind(this);
  }

  playVideo () {
    const video   = document.getElementById(`video-${this.state.id}`);
    const playBtn = document.getElementById(`play-btn-${this.state.id}`);

    if (video.paused) {
      video.play();

      playBtn.style.display = 'none';
    } else {
      video.pause();

      playBtn.style.display = 'block';
    }
  }

  videoEnded () {
    const playBtn         = document.getElementById(`play-btn-${this.state.id}`);
    playBtn.style.display = 'block';
  }

  render () {
    const { content } = this.state;

    return (
      <Cell>
        {
          content.videoUrl === null
            ? <LazyLoadImage
              width='100%'
              height='auto'
              style={{ minHeight: '250px' }}
              placeholderSrc={placeholderImage}
              src={content.imageUrl}/>
            : <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: '1',
                  width: '100%',
                  height: '100%',
                }}
                onClick={this.playVideo}>
                <img
                  id={`play-btn-${this.state.id}`}
                  src={playButton}
                  style={{
                    width: '50px',
                    height: '50px',
                    marginTop: '50%',
                    marginLeft: '50%',
                    transform: 'translate(-50%, -50%)',
                  }} alt=''/>
              </div>

              <video
                id={`video-${this.state.id}`}
                src={content.videoUrl}
                onEnded={this.videoEnded}
                preload='none'
                type='video/mp4'
                poster={content.imageUrl}
                style={{ width: '100%', height: 'auto' }}>
              </video>
            </div>
        }
      </Cell>
    )
  }
}

export default CosmoContent
