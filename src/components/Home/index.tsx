import React from 'react';
import './style.scss';
import cover from '../../images/cover.jpg';
import SearchBar from '../../oakui/SearchBar';
import constants from '../Constants';
import { sendMessage, receiveMessage } from '../../events/MessageService';
import {
  searchTextChangedEvent$,
  searchEvent$,
} from '../../events/SearchEvent';
import { getBanner } from '../Tenant/TenantService';
import { httpGet, httpPost, httpPut } from '../Lib/RestTemplate';
import { Authorization } from '../Types/GeneralTypes';
import OakDialog from '../../oakui/OakDialog';
import { isEmptyOrSpaces } from '../Utils';
import OakPrompt from '../../oakui/OakPrompt';
import OakText from '../../oakui/OakText';
import OakButton from '../../oakui/OakButton';

const pageYOffsetCutoff = 10;

interface Props {
  setProfile: Function;
  profile: any;
  match: any;
  authorization: Authorization;
  history: any;
}

interface State {
  banner: any;
  prevScrollpos: number;
  showMainSearchBar: boolean;
  searchResults: any[];
  isCreateRequestDialogOpen: boolean;
  isNotLoggedInPromptOpen: boolean;
  searchTitle: string;
  searchDescription: string;
  requestId?: string;
  stages: any;
}

export default class Home extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      banner: null,
      prevScrollpos: window.pageYOffset,
      showMainSearchBar: true,
      searchTitle: '',
      searchDescription: '',
      isCreateRequestDialogOpen: false,
      isNotLoggedInPromptOpen: false,
      searchResults: [],
      stages: [],
    };
  }

  componentDidMount() {
    // sendMessage('navbar-transparency', true);
    window.addEventListener('scroll', this.handleScroll);
    this.props.setProfile({
      ...this.props.profile,
      tenant: this.props.match.params.tenant,
    });

    httpGet(`${constants.API_URL_STAGE}/${this.props.match.params.tenant}/`, {
      headers: {
        Authorization: this.props.authorization.token,
      },
    })
      .then(response => {
        this.setState({
          stages: response.data.stage,
        });
      })
      .catch(error => {
        console.log(error);
      });

    searchEvent$.subscribe(searchText => this.search(searchText));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.authorization) {
      getBanner(this.props.match.params.tenant, {
        headers: {
          Authorization: nextProps.authorization.token,
        },
      })
        .then(response => {
          if (response.status === 200 && response.data) {
            this.setState({
              banner: `data:image/jpeg;base64,${response.data}`,
            });
          } else {
            this.setState({ banner: cover });
          }
        })
        .catch(() => {
          this.setState({ banner: cover });
        });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    sendMessage('show-navbar-element', false);
    searchTextChangedEvent$.next('');
    // sendMessage('navbar-transparency', false);
  }

  search = (searchText: string) => {
    this.setState({
      searchTitle: searchText,
      requestId: undefined,
    });
    httpPost(
      `/learning/${this.props.match.params.tenant}${constants.API_URL_PREDICT}`,
      searchText,
      {
        headers: {
          Authorization: this.props.authorization.token,
        },
      }
    ).then(response => {
      const predictionMap: any = {};
      response.data.prediction.forEach(element => {
        predictionMap[element.rank] = element.label;
      });
      httpGet(
        `${constants.API_URL_FAQ}/${this.props.match.params.tenant}/category/${predictionMap[0]}`,
        {
          headers: {
            Authorization: this.props.authorization.token,
          },
        }
      ).then(faqs => {
        this.setState({
          searchResults: faqs.data.data,
        });
      });
    });
  };

  handleScroll = () => {
    // const { prevScrollpos } = this.state;

    const currentScrollPos = window.pageYOffset;
    const showMainSearchBar = currentScrollPos < pageYOffsetCutoff;

    if (this.state.showMainSearchBar !== showMainSearchBar) {
      if (!showMainSearchBar) {
        // sendMessage('navbar-transparency', false);
        sendMessage('show-navbar-element', true);
      } else {
        // sendMessage('navbar-transparency', true);
        sendMessage('show-navbar-element', false);
      }
    }

    this.setState({
      prevScrollpos: currentScrollPos,
      showMainSearchBar,
    });
  };

  notHelpful = () => {
    if (this.props.authorization && this.props.authorization.token) {
      this.toggleEditDialog();
    } else {
      this.toggleNotLoggedInPrompt();
    }
  };

  helpful = () => {
    console.log('not implemented');
  };

  toggleEditDialog = () => {
    this.setState({
      isCreateRequestDialogOpen: !this.state.isCreateRequestDialogOpen,
      // editDialogLabel: 'Add'
    });
  };

  toggleNotLoggedInPrompt = () => {
    this.setState({
      isNotLoggedInPromptOpen: !this.state.isNotLoggedInPromptOpen,
    });
  };

  redirectToLogin = () => {
    this.props.history.push(`/${this.props.match.params.tenant}/login`);
  };

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };

  addRequest = () => {
    const stage = [...this.state.stages];
    const request = {
      title: this.state.searchTitle,
      description: this.state.searchDescription,
      priority: 'Low',
      stage: stage[0]._id,
      status: 'assigned',
    };
    if (isEmptyOrSpaces(request.title)) {
      sendMessage('notification', true, {
        type: 'failure',
        message: 'Title is missing',
        duration: 5000,
      });
      return;
    }

    if (isEmptyOrSpaces(request.description)) {
      sendMessage('notification', true, {
        type: 'failure',
        message: 'Description is missing',
        duration: 5000,
      });
      return;
    }

    httpPut(
      `${constants.API_URL_SR}/${this.props.match.params.tenant}/main`,
      request,
      {
        headers: {
          Authorization: this.props.authorization.token,
        },
      }
    ).then(response => {
      if (response.status === 200) {
        sendMessage('notification', true, {
          type: 'success',
          message: `Request created [${response.data.data._id}]`,
          duration: 10000,
        });
        this.toggleEditDialog();
        this.setState({
          requestId: response.data.data._id,
        });
      }
    });
  };

  render() {
    return (
      <div className="home full">
        <OakDialog
          visible={this.state.isCreateRequestDialogOpen}
          toggleVisibility={this.toggleEditDialog}
        >
          <div className="dialog-body">
            <OakText
              label="Title"
              data={this.state}
              id="searchTitle"
              handleChange={e => this.handleChange(e)}
            />
            <OakText
              label="Description"
              data={this.state}
              id="searchDescription"
              handleChange={e => this.handleChange(e)}
            />
          </div>
          <div className="dialog-footer">
            <OakButton
              action={this.toggleEditDialog}
              theme="default"
              variant="animate in"
              align="left"
            >
              <i className="material-icons">close</i>Cancel
            </OakButton>
            <OakButton
              action={this.addRequest}
              theme="primary"
              variant="animate out"
              align="right"
            >
              <i className="material-icons">double_arrow</i>Create Service
              Request
            </OakButton>
          </div>
        </OakDialog>
        <OakPrompt
          action={this.redirectToLogin}
          visible={this.state.isNotLoggedInPromptOpen}
          toggleVisibility={this.toggleNotLoggedInPrompt}
          text="You are not logged in. Do you want to login to submit a service request?"
        />
        <div className="cover">
          <img src={this.state.banner} alt="Red dot" />
        </div>
        {this.state.showMainSearchBar && <SearchBar />}

        <div className="search-results">
          <div className="action-bar">
            <OakButton
              theme="primary"
              action={this.helpful}
              variant="animate in"
              align="left"
            >
              Helpful
            </OakButton>
            <OakButton
              theme="primary"
              variant="animate in"
              align="right"
              action={this.notHelpful}
            >
              Not Helpful
            </OakButton>
          </div>
          {this.state.searchResults &&
            this.state.searchResults.map(item => (
              <div key={item.question} className="result-record">
                <div className="question typography-4 space-bottom-2">
                  {item.question}
                </div>
                <div className="answer typography-5">{item.answer}</div>
              </div>
            ))}
          {this.state.requestId && (
            <div className="request-created">
              <div className="request-icon">
                <i className="material-icons">file_copy</i>
              </div>
              <div className="request-id typography-4">
                {this.state.requestId}
              </div>
              <div className="request-message typography-5">
                Your request has been created and an email has been sent to your
                inbox with details
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
