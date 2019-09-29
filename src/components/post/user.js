import React, { Component } from 'react';
import { Avatar, Cell } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import instagramLogo from '../settings/Instagram_AppIcon_Aug2017.png';
import vkLogo from '../settings/VK_Blue_Logo_transparent.png';

class CosmoUser extends Component {
  constructor (props) {
    super(props);

    const { post } = props;

    this.state = {
      post,
    };
  }

  render () {
    const { post } = this.state;
    const { user } = post;

    return (
      <Cell
        size="l"
        description={user.accountInfo}
        before={<Avatar src={user.profileIconUrl}/>}
        bottomContent={
          post.sourceType === 'INSTAGRAM'
            ? <img src={instagramLogo} style={{ width: '20px', height: '20px' }} alt=''/>
            : <img src={vkLogo} style={{ width: '20px', height: '20px' }} alt=''/>
        }
      >
        {user.fullName}
      </Cell>
    )
  }
}

export default CosmoUser
