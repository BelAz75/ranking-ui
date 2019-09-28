import React, { Component } from 'react';
import { Cell } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

class CosmoFooter extends Component {
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
      <Cell>3 cообщества</Cell>
    )
  }
}

export default CosmoFooter
