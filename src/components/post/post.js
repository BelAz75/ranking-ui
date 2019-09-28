import React, { Component } from 'react';
import { Group, List } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import CosmoUser from './user';
import CosmoContent from './content';
import CosmoText from './text';
import CosmoFooter from './footer';

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
          <CosmoUser post={post}/>

          <CosmoContent content={post.content[0]}/>

          <CosmoFooter post={post}/>

          <CosmoText text={post.text}/>
        </Group>
      </List>
    )
  }
}

export default CosmoPost
