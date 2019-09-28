import React, { Component } from 'react';
import { Group, List } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import CosmoUser from './user';
import CosmoContent from './content';
import CosmoText from './text';

class CosmoPost extends Component {
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
      <List>
        <Group>
          <CosmoUser user={post.user}/>

          <CosmoContent content={post.content}/>

          <CosmoText text={post.text}/>
        </Group>
      </List>
    )
  }
}

export default CosmoPost
