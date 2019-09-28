import React, { Component } from 'react';
import { CellButton, Cell, Group, List, Avatar } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import vkLogo from './VK_Blue_Logo_transparent.png';
import instagramLogo from './Instagram_AppIcon_Aug2017.png';

class CosmoAccount extends Component {
  constructor (props) {
    super(props);

    const { account } = props;

    this.state = {
      account,
    };
  }

  render () {
    const { account } = this.state;

    return (
      <Group title={account.name}>
        <List>
          <Cell multiline='true' before={<Avatar src={vkLogo}/>}>
            {account.vkUrl}
          </Cell>

          <Cell multiline='true' before={<Avatar src={instagramLogo}/>}>
            {account.instagramUrl}
          </Cell>
        </List>

        <CellButton level="danger" onClick={() => this.props.remove(account)}>
          Удалить аккаунт
        </CellButton>
      </Group>
    )
  }
}

export default CosmoAccount
