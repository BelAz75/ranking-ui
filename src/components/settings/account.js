import React, { Component } from 'react';
import { CellButton, Cell, Group, List } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

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
          <Cell>
            VK: {account.vkUrl}
          </Cell>

          <Cell>
            Instagram: {account.instagramUrl}
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
