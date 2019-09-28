import React, { Component } from 'react';
import { Div } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

class CosmoText extends Component {
  constructor (props) {
    super(props);

    const { text } = props;

    this.state = {
      text,
    };
  }

  render () {
    const { text } = this.state;

    return (
      <Div>
        <div>
        {text}
        </div>
      </Div>
    )
  }
}

export default CosmoText
