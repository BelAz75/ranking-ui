import React, { Component } from 'react';
import { Cell } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import placeholderImage from './placeholder-image.png';

class CosmoContent extends Component {
  constructor (props) {
    super(props);

    const { content } = props;

    this.state = {
      content,
    };
  }

  playVideo () {
    const video = document.getElementById('video');

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
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
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1', width: '100%', height: '100%' }}
                onClick={this.playVideo}>
              </div>

              <video
                id='video'
                src={content.videoUrl}
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
