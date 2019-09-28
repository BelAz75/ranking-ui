import React, { Component } from 'react';
import { Panel, PanelHeader, Root, View, HeaderButton } from '@vkontakte/vkui';
import Icon28Menu from '@vkontakte/icons/dist/28/menu';
import '@vkontakte/vkui/dist/vkui.css';
import './App.css';
import CosmoFeed from './components/feed/feed';

class App extends Component {
  render () {
    return (
      <Root activeView="view">
        <View activePanel="panel" id="view">
          <Panel id="panel"
                 style={{ maxWidth: '550px', marginLeft: 'auto', marginRight: 'auto' }}>
            <PanelHeader
              left={<HeaderButton><Icon28Menu/></HeaderButton>}>
              Cosmos
            </PanelHeader>

            <CosmoFeed/>
          </Panel>
        </View>
      </Root>
    )
  }
}

export default App;
