import React, { Component } from 'react';
import {
  View,
  ModalPage,
  FormLayout,
  Input,
  HeaderButton,
  Button,
  PanelSpinner,
  ModalPageHeader,
  ModalRoot, Panel,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon16UserAdd from '@vkontakte/icons/dist/16/user_add';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import { COSMO_API_ENDPOINT, COSMO_ACCOUNTS_ENDPOINT } from '../../constants/endpoint.constant';
import CosmoAccount from './account';

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
    };

    this.modalBack = () => {
      this.setActiveModal(this.state.modalHistory[this.state.modalHistory.length - 2]);
    };

    this.modalDone = () => {
      fetch(`${COSMO_API_ENDPOINT}/${COSMO_ACCOUNTS_ENDPOINT}?vk=${this.state.vk}&instagram=${this.state.instagram}`, {
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

    this.onChange = this.onChange.bind(this);
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
            <Input placeholder="Instagram" name="instagram" value={instagram} onChange={this.onChange}/>
            <Input placeholder="VK" name="vk" value={vk} onChange={this.onChange}/>
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
              : <View activePanel="modals" modal={modal}>
                <Panel id="modals">
                  <Button before={<Icon16UserAdd/>} onClick={() => this.setActiveModal(MODAL_ADD_ACCOUNT)}>
                    Добавить аккаунт
                  </Button>
                  {
                    accounts.map(account => (
                      <CosmoAccount key={account.uuid} account={account} remove={this.removeAccount}/>
                    ))
                  }
                </Panel>
              </View>
          }
        </div>
      )
    }
  }
}

export default CosmoSettings;
