import React, { Component } from 'react';
import {
  View,
  ModalPage,
  FormLayout,
  Input,
  HeaderButton,
  Button,
  PanelSpinner,
  Epic,
  ModalPageHeader,
  ModalRoot,
  Panel,
  PanelHeader,
  Tabbar,
  TabbarItem,
  Select, Avatar, Cell,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon16UserAdd from '@vkontakte/icons/dist/16/user_add';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon24Users from '@vkontakte/icons/dist/24/users';
import Icon24Filter from '@vkontakte/icons/dist/24/filter';
import { COSMO_API_ENDPOINT, COSMO_ACCOUNTS_ENDPOINT } from '../../constants/endpoint.constant';
import CosmoAccount from './account';
import vkLogo from './VK_Blue_Logo_transparent.png';
import instagramLogo from './Instagram_AppIcon_Aug2017.png';

const MODAL_ADD_ACCOUNT = 'add-account';

class CosmoSettings extends Component {
  constructor (props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      accounts: [],
      activeModal: null,
      modalHistory: [],
      instagram: '',
      vk: '',
      activeStory: 'accounts',
    };

    this.modalBack = () => {
      this.setActiveModal(this.state.modalHistory[this.state.modalHistory.length - 2]);
    };

    this.modalDone = () => {
      const url    = new URL(`${COSMO_API_ENDPOINT}/${COSMO_ACCOUNTS_ENDPOINT}`);
      const params = {};

      if (this.state.vk) {
        params.vk = this.state.vk;
      }

      if (this.state.instagram) {
        params.instagram = this.state.instagram;
      }

      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

      fetch(url.href, {
        method: 'POST',
      })
        .then(() => {
          this.modalBack();
          this.getAccounts();

          this.setState({
            instagram: '',
            vk: '',
          });
        })
        .catch(console.log)
    };

    this.removeAccount = (account) => {
      fetch(`${COSMO_API_ENDPOINT}/${COSMO_ACCOUNTS_ENDPOINT}?id=${account.uuid}`, {
        method: 'DELETE',
      })
        .then(() => {
          this.getAccounts();
        })
        .catch(console.log)
    };

    this.onChange      = this.onChange.bind(this);
    this.onStoryChange = this.onStoryChange.bind(this);
  }

  onStoryChange (e) {
    this.setState({ activeStory: e.currentTarget.dataset.story })
  }

  setActiveModal (activeModal) {
    activeModal      = activeModal || null;
    let modalHistory = this.state.modalHistory ? [...this.state.modalHistory] : [];

    if (activeModal === null) {
      modalHistory = [];
    } else if (modalHistory.indexOf(activeModal) !== -1) {
      modalHistory = modalHistory.splice(0, modalHistory.indexOf(activeModal) + 1);
    } else {
      modalHistory.push(activeModal);
    }

    this.setState({
      activeModal,
      modalHistory,
    });
  };

  onChange (e) {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  getAccounts () {
    fetch(`${COSMO_API_ENDPOINT}/${COSMO_ACCOUNTS_ENDPOINT}`)
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            accounts: data,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      )
      .catch(console.log)
  }

  componentDidMount () {
    this.getAccounts();
  }

  render () {
    const { error, isLoaded, accounts, instagram, vk } = this.state;

    const modal = (
      <ModalRoot activeModal={this.state.activeModal}>
        <ModalPage
          id={MODAL_ADD_ACCOUNT}
          onClose={this.modalBack}
          header={
            <ModalPageHeader
              left={<HeaderButton onClick={this.modalBack}><Icon24Cancel/></HeaderButton>}
              right={<HeaderButton onClick={this.modalDone}><Icon24Done/></HeaderButton>}
            >
              Добавление аккаунта
            </ModalPageHeader>
          }
        >
          <FormLayout>
            <Cell multiline='true' before={<Avatar src={vkLogo}/>}>
              <Input placeholder="Ссылка на профиль" name="vk" value={vk} onChange={this.onChange}/>
            </Cell>

            <Cell multiline='true' before={<Avatar src={instagramLogo}/>}>
              <Input placeholder="Ссылка на профиль" name="instagram" value={instagram} onChange={this.onChange}/>
            </Cell>
          </FormLayout>
        </ModalPage>
      </ModalRoot>
    );

    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>
          {
            !isLoaded
              ? <PanelSpinner/>
              : <Epic activeStory={this.state.activeStory} tabbar={
                <Tabbar>
                  <TabbarItem
                    onClick={this.onStoryChange}
                    selected={this.state.activeStory === 'accounts'}
                    data-story="accounts"
                    text="Аккаунты"
                  >
                    <Icon24Users/>
                  </TabbarItem>

                  <TabbarItem
                    onClick={this.onStoryChange}
                    selected={this.state.activeStory === 'filters'}
                    data-story="filters"
                    text="Фильтры"
                  >
                    <Icon24Filter/>
                  </TabbarItem>
                </Tabbar>
              }>
                <View id="accounts" activePanel="accounts" modal={modal}>
                  <Panel id="accounts">
                    <PanelHeader theme="light">
                      <Button align={'center'} before={<Icon16UserAdd/>}
                              onClick={() => this.setActiveModal(MODAL_ADD_ACCOUNT)}>
                        Добавить аккаунт
                      </Button>
                    </PanelHeader>

                    {
                      accounts.map(account => (
                        <CosmoAccount key={account.uuid} account={account} remove={this.removeAccount}/>
                      ))
                    }
                  </Panel>
                </View>

                <View id="filters" activePanel="filters">
                  <Panel id="filters">
                    <FormLayout>
                      <Select value="date" top="Сортировать посты" placeholder="Выберите пол">
                        <option value="date">По дате</option>
                        <option value="like">По количеству лайков</option>
                      </Select>
                    </FormLayout>
                  </Panel>
                </View>
              </Epic>
          }
        </div>
      )
    }
  }
}

export default CosmoSettings;
