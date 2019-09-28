import React, { Component } from 'react';
import { Cell } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24Like from '@vkontakte/icons/dist/24/like';
import Icon24Comment from '@vkontakte/icons/dist/24/comment';

class CosmoFooter extends Component {
  constructor (props) {
    super(props);

    const { post } = props;

    this.state = {
      post,
    };
  }

  render () {
    const { post } = this.state;

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Cell expandable before={<Icon24Like />}>{post.likesCount}</Cell>
        <Cell expandable before={<Icon24Comment />}>{post.commentsCount}</Cell>
      </div>
    )
  }
}

export default CosmoFooter
