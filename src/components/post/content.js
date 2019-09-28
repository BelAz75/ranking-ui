import React, { Component } from 'react';
import { Cell } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

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
      <Cell size="l">
        <img src={content.url}
             style={{ width: '100%', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
             alt=''/>
      </Cell>
    )
  }
}

export default CosmoContent
