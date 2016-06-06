import React, {
  Component,
  AppState,
  Image,
  View,
  Text,

} from 'react';

import {
  AppRegistry,
  AsyncStorage,
  StatusBar,
  Animated,
  NavigationExperimental,
  ScrollView,
  StyleSheet,
} from 'react-native';

import NavigationStateUtils from 'NavigationStateUtils';
import {setApiUrl} from '../Utils/api';

import SignIn from '../Views/SignIn';
import MyAccount from '../Views/MyAccount';
import Budgets from '../Views/budgets';
import UserDefaults from 'react-native-userdefaults-ios';
import Menu from '../Views/Menu';
import MenuIcon from '../Views/MenuIcon';
import NavigationBar from 'react-native-navbar';
import SideMenu from 'react-native-side-menu';

let Dimensions = require('Dimensions');

const {
  AnimatedView: NavigationAnimatedView,
  Card: NavigationCard,
  Header: NavigationHeader,
  Reducer: NavigationReducer,
  RootContainer: NavigationRootContainer,
} = NavigationExperimental;

global._ = require('lodash-node');
global.images = require('../../components/app_images');
const initKey = 'key18';

const navigationReducer = function(state = initialState, action = {}) {
  switch (action.type) {
    case 'push':
      if (state.navigationState.children[state.navigationState.index].key === (action.state && action.state.key))
        return state;

      return {...state,...{
          navigationState: NavigationStateUtils.push(state.navigationState, action.state)
        }
      };

    case 'pop':
      if (state.navigationState.index === 0 || state.navigationState.children.length === 1)
        return state.navigationState;
      return {...state,...{
          navigationState: NavigationStateUtils.pop(state.navigationState)
        }
      };

    case 'jumpToKey':
      return {...state,...{
          navigationState: NavigationStateUtils.jumpTo(state.navigationState, action.key)
        }
      };

    case 'jumpToIndex':
      debugger
      return {...state,...{
          navigationState: NavigationStateUtils.jumpToIndex(state.navigationState, action.index)
        }
      };

    case 'reset':
      return {...state,...{
          navigationState: NavigationStateUtils.reset(state.navigationState, [action.state],0)
        }
      };

    case 'RootContainerInitialAction':
      return {...state,...{
          children: [],
          index: 0,
          key: 'SIGN_IN',
          scene: 'i',
          // navigationState: NavigationStateUtils.reset({key: 'HOME', children:[]}, ['HOME'],0)
        }
      };

    default:
      return {...state,...{
          navigationState: NavigationStateUtils.reset(state.navigationState, [action.state],0)
        }
      };
  }
}

// const NavigationBasicReducer = NavigationReducer.StackReducer({
//   getPushedReducerForAction: (action) => {
//     switch (action.type) {
//       case 'push':
//        console.log('push found')
//         switch (action.key) {
//           case 'MY_ACCOUNT':
//             return (state, newState) => {return {key: 'MY_ACCOUNT', title: 'My Account', scrollEnabled: true}};
//           case 'SIGN_IN':
//             return NavigationStateUtils.jumpTo(this.state)
//           case 'BUDGETS':
//             return (state, newState) => {return {key: 'BUDGETS', title: 'Budgets', scrollEnabled: true}};
//           default:
//             return (state) => state;
//         }
//       default:
//         return null;
//     }
//   },
//   getReducerForState: (initialState) => (state, newState) => {
//     return newState || initialState;
//   },
//   initialState: {
//     key: initKey,
//     index: 0,
//     children: [
//       {key: 'SIGN_IN', hideHeader: true},
//     ],
//   },
// });

const USER_KEY = '@BudgetalUserKey:user';

let windowSize = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
    marginTop: NavigationHeader.HEIGHT,
  },
  navCard: {
    flex: 1,
  }
});

class NavigationAnimatedExample extends React.Component {
  componentWillMount() {
    this._renderCard = this._renderCard.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._renderNavigation = this._renderNavigation.bind(this);
    this._renderScene = this._renderScene.bind(this);
    this._renderTitleComponent = this._renderTitleComponent.bind(this);
  }

  _navRef = (navRootContainer) => {
    this.navRootContainer = navRootContainer;
  }

  render() {
    return (
      <NavigationRootContainer
        reducer={navigationReducer}
        ref={this._navRef}
        persistenceKey={initKey}
        renderNavigation={this._renderNavigation}
      />
    );
  }

  handleBackAction() {
    return (
      this.navRootContainer &&
      this.navRootContainer.handleNavigation(NavigationRootContainer.getBackAction())
    );
  }

  _animation(pos, navState) {
    Animated.timing(pos, {toValue: navState.index, duration: 500}).start();
  }

  _renderNavigation(navigationState, onNavigate) {
    if (!navigationState) {
      return null;
    }
    return (
      <SideMenu openMenuOffset={280}
                bounceBackOnOverdraw={true}
                touchToClose={true}
                edgeHitWidth={400}
                menu={<Menu dispatch={this.props.onNavigate} />}>
        <NavigationAnimatedView
          navigationState={navigationState}
          style={styles.animatedView}
          renderOverlay={this._renderHeader}
          applyAnimation={this._animation}
          renderScene={this._renderCard}
        />
      </SideMenu>
    );
  }

  _renderHeader(props) {
    if (!props.navigationState.hideHeader) {
      return (
        <NavigationHeader
          {...props}
          renderLeftComponent={this._renderLeftComponent}
          renderTitleComponent={this._renderTitleComponent}
        />
      );
    }
  }

  _renderTitleComponent(props) {
    return (
      <NavigationHeader.Title>
        {props.scene.navigationState.title || '?'}
      </NavigationHeader.Title>
    );
  }

  _renderLeftComponent(props) {
    return (
      <NavigationHeader.BackButton />
    );
  }

  _renderCard(props) {
    const marginTop = props.scene.navigationState.hideHeader ? 0 : NavigationHeader.HEIGHT;
    const backgroundColor = props.scene.navigationState.backgroundColor || '#333';
    const height = windowSize.height - marginTop;

    return (
      <NavigationCard
        {...props}
        style={[styles.navCard, {height,marginTop,backgroundColor}]}
        key={`card_${props.scene.navigationState.key}`}
        renderScene={this._renderScene}
      />
    );
  }

  _toggleDirection() {
    this.setState({isHorizontal: !this.state.isHorizontal});
  }

  _renderScene(props) {
    let route;
    switch (props.scene.navigationState.key) {
      case 'SIGN_IN':
        route = <SignIn dispatch={props.onNavigate} />;
        break;
      case 'MY_ACCOUNT':
        route = <MyAccount dispatch={props.onNavigate} />;
        break;
      case 'BUDGETS':
        route = <Budgets dispatch={props.onNavigate} />;
        break;
    }

    const scrollEnabled = props.scene.navigationState.scrollEnabled || false;
    return (
      <ScrollView scrollEnabled={scrollEnabled}>
        {route}
      </ScrollView>
    );
  }
}

var Budgetal = React.createClass({
  getInitialState: function() {
    return NavigationReducer(null, { key: 'home', type: 'home' });
  },
  dispatch(action) {
    this.setState(NavigationReducer(this.state, action));
  },
  setServer: async function() {
    try {
      let api_url = await UserDefaults.stringForKey('api_server_preference');
      if (api_url === null) {
        api_url = 'https://api.budgetal.com';
      }
      setApiUrl(api_url);
    } catch (err) {
      window.alert({title: 'Error', message: err});
    }
  },
  componentDidMount() {
    this.setServer();
    AppState.addEventListener('change', this._handleAppStateChange);
  },
  componentWillUnmount: function() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  },
  _handleAppStateChange: function(currentAppState) {
    if (currentAppState === 'active') {
      this.setServer();
    }
  },
  enableGestures: function() {
    this.setState({gesturesAreDisabled: false});
  },
  closeMenu() {
    this.setState({isOpen: false});
  },
  openMenu() {
    this.setState({isOpen: true});
  },
  openChat(id) {
    this.dispatch({ type: 'openChat', id });
  },
  goBack() {
    this.dispatch({ type: 'back' });
  },
  render() {
    let nav = <NavigationRootContainer
        reducer={navigationReducer}
        ref={navRootContainer => { this.navRootContainer = navRootContainer; }}
        persistenceKey={initKey}
        renderNavigation={this._renderNavigation} />
    return nav;
  },

  _renderNavigation(navigationState, onNavigate) {
    if (!navigationState) {
      return null;
    }
    return (
      <NavigationAnimatedView
        navigationState={navigationState}
        style={styles.animatedView}
        renderOverlay={this._renderHeader}
        applyAnimation={(pos, navState) => {
          Animated.timing(pos, {toValue: navState.index, duration: 500}).start();
        }}
        renderScene={this._renderCard}
      />
    );
  },

  _renderHeader(props) {
    const scene = this.state.children[this.state.children.length - 1];
    return (
      <Header
        {...props}
        style={{backgroundColor: 'blue'}}
        getTitle={()=>scene.key}
        renderTitleComponent={this._renderTitleComponent}
      />
    );
  },

  _renderTitleComponent(/*NavigationSceneRendererProps*/ props) {
    return (
      <Header.Title>
        {props.scene.navigationState.key}
      </Header.Title>
    );
  },

  _renderCard(/*NavigationSceneRendererProps*/ props) {
    return (
       <NavigationCard
        {...props}
        style={styles.navCard}
        key={'card_' + props.scene.navigationState.key}
        renderScene={this._renderScene}
      />
    );
  },

  _renderScene(/*NavigationSceneRendererProps*/ props) {
    const scene = this.state.children[this.state.children.length - 1];
    let route;
    console.log(scene.key);

    switch (scene.key) {
      case 'home':
        route = <SignIn dispatch={this.dispatch} />
        break;

      case 'my_account':
        route = <MyAccount dispatch={this.dispatch} />
        break;
    }

    return (
      <ScrollView style={styles.navCard}>{route}</ScrollView>
    );
  }
});

module.exports = NavigationAnimatedExample;
