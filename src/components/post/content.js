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

  render () {
    const { content } = this.state;

    return (
      <Cell>
        {content.videoUrl === null
        ? <LazyLoadImage
        width='100%'
        height='auto'
        style={{ minHeight: '350px' }}
        placeholderSrc={placeholderImage}
        src={content.imageUrl}/>
        : <div>video</div>}
      </Cell>
    )
  }
}

export default CosmoContent
