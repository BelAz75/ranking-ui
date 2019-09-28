import React, { Component } from 'react';
import { Panel, PanelHeader, Root, View, HeaderButton } from '@vkontakte/vkui';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import '@vkontakte/vkui/dist/vkui.css';
import './App.css';
import CosmoFeed from './components/feed/feed';
import CosmoSettings from './components/settings/settings';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      activePanel: 'panel1',
      activeView: 'main',
    }
  }

  render () {
    return (
      <Root activeView={this.state.activeView}>
        <View id="main" activePanel={this.state.activePanel}>
          <Panel id="panel1"
                 style={{ maxWidth: '550px', marginLeft: 'auto', marginRight: 'auto' }}>
            <PanelHeader
              left={<HeaderButton onClick={() => this.setState({ activePanel: 'panel2' })}>
                <Icon24Settings/>
              </HeaderButton>}>
              Cosmos
            </PanelHeader>

            <CosmoFeed/>
          </Panel>

          <Panel id="panel2">
            <PanelHeader
              left={<HeaderButton onClick={() => this.setState({ activePanel: 'panel1' })}>
                <Icon24Back/>
              </HeaderButton>}>
              Настройки
            </PanelHeader>

            <CosmoSettings/>
          </Panel>
        </View>
      </Root>
    )
  }
}

export default App;
