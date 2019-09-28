import React, { Component } from 'react';
import { Avatar, Cell } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

class CosmoUser extends Component {
  constructor (props) {
    super(props);

    const { user } = props;

    this.state = {
      user,
    };
  }

  render () {
    const { user } = this.state;

    return (
      <Cell
        size="l"
        description={user.accountInfo}
        before={<Avatar src={user.profileIconUrl}/>}
      >
        {user.fullName}
      </Cell>
    )
  }
}

export default CosmoUser
