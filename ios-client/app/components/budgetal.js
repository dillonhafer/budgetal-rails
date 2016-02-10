'use strict';

var React = require('react-native');
var {
  Image,
  Navigator,
  View,
  Text
} = React;

global.AppRoutes = require('../Utils/AppRoutes');
global._ = require('lodash-node');
global.images = require('../../components/app_images');
global.baseApi = 'https://api.budgetal.com';

var UserDefaults = require('react-native-userdefaults-ios');
var Menu = require('../Views/Menu');
var MenuIcon = require('../Views/MenuIcon');
var NavigationBar = require('react-native-navbar');
var SideMenu = require('react-native-side-menu');
var styles = require('../../styles');

import {AsyncStorage} from 'react-native';
import {setApiUrl} from '../Utils/api';

const USER_KEY = '@BudgetalUserKey:user';

let statusBar = {
  style: 'light-content',
  hidden: false,
  showAnimation: 'fade'
};

let defaultNavBar = <View style={styles.navBar}><NavigationBar statusBar={statusBar} style={styles.header} /></View>;

var Budgetal = React.createClass({
  getInitialState: function() {
    return ({
      loggedIn: false,
      gesturesAreDisabled: true,
      isOpen: false,
      routes: [AppRoutes.signIn],
      navBars: [defaultNavBar]
    });
  },
  setServer: async function() {
    try {
      let api_url = await UserDefaults.stringForKey('api_server_preference');
      if (api_url !== null) {
        setApiUrl(api_url);
      }
    } catch (err) {
      window.alert({title: 'Error', message: err});
    }
  },
  initialRoute: async function() {
    let user = await AsyncStorage.getItem(USER_KEY);
    if (user !== null) {
      this.enableGestures();
      this.updateRoute(AppRoutes.cashFlowPlans);
    }
  },
  componentDidMount() {
    this.setServer();
    this.initialRoute();
  },
  enableGestures: function() {
    this.setState({gesturesAreDisabled: false});
  },
  replaceNavBar: function(navBar) {
    this.setState({navBars: [navBar]})
  },
  popNavBar: function() {
    let navBars = this.state.navBars;
    navBars.shift();
    this.setState({navBars: navBars});
  },
  pushNavBar: function(navBar) {
    let navBars = this.state.navBars;
    navBars.unshift(navBar);
    this.setState({navBars: navBars});
  },
  updateRoute: function(newRoute) {
    let title  = <Text style={styles.navBarTitle}>{newRoute.title}</Text>;
    let left   = newRoute.left ? newRoute.left : <MenuIcon openMenu={this.openMenu} />;
    let next   = newRoute.nextButton ? newRoute.nextButton : '';
    let navBar = <NavigationBar title={title}
                                statusBar={statusBar}
                                titleColor='#FFF'
                                style={styles.header}
                                leftButton={left}
                                customNext={next}
                                hidePrev={!newRoute.showMenu}
                                route={newRoute}
                                data={newRoute.data}
                                navigator={navigator} />;

    navBar = <View style={styles.navBar}>{navBar}</View>;
    this.replaceNavBar(navBar)
    this.refs.navigator.replace(newRoute)
  },
  popRoute: function() {
    this.popNavBar()
    this.refs.navigator.pop();
  },
  pushRouteBack: function(newRoute) {
    let title = <Text style={styles.navBarTitle}>{newRoute.title}</Text>;
    let left   = newRoute.left ? newRoute.left : <MenuIcon openMenu={this.openMenu} />;
    let next = newRoute.nextButton ? newRoute.nextButton : '';
    let navBar = <NavigationBar title={title}
                                statusBar={statusBar}
                                tintColor='green'
                                titleColor='#FFF'
                                style={styles.header}
                                leftButton={left}
                                customNext={next}
                                hidePrev={!newRoute.showMenu}
                                route={newRoute}
                                data={newRoute.data}
                                navigator={navigator} />;
    navBar = <View style={styles.navBar}>{navBar}</View>;
    this.pushNavBar(navBar);
    this.refs.navigator.push(newRoute)
  },
  pushRoute: function(newRoute) {
    this.refs.navigator.push(newRoute);
  },
  nextButton: function(route) {
    return route.nextButton ? route.nextButton : '';
  },
  signOut: function() {
    this.setState({gesturesAreDisabled: true, navBars: [defaultNavBar]});
    this.refs.navigator.resetTo(AppRoutes.signIn);
  },
  renderScene: function(route, navigator) {
    var Component = route.component;
    return (
      <View style={styles.navigatorScene}>
        <Component navigator={navigator} route={route} enableGestures={this.enableGestures} />
      </View>
    );
  },
  updateAnnualBudgetId: function(id) {
    this.setState({annualBudgetId: id})
  },
  closeMenu() {
    this.setState({isOpen: false});
  },
  openMenu() {
    this.setState({isOpen: true});
  },
  render: function() {
    if (baseApi !== '') {
    return (
      <SideMenu openMenuOffset={280}
                isOpen={this.state.isOpen}
                disableGestures={this.state.gesturesAreDisabled}
                bounceBackOnOverdraw={true}
                touchToClose={true}
                edgeHitWidth={400}
                menu={
                  <Menu updateRoute={this.updateRoute}
                        closeMenu={this.closeMenu}
                        annualBudgetId={this.state.annualBudgetId}
                        pushRouteBack={this.pushRouteBack}
                        popRoute={this.popRoute}
                        pushRoute={this.pushRoute}
                        signOut={this.signOut} />
                }>
        <Navigator ref='navigator'
                   style={styles.navigator}
                   signOut={this.signOut}
                   popRoute={this.popRoute}
                   pushRouteBack={this.pushRouteBack}
                   updateRoute={this.updateRoute}
                   updateAnnualBudgetId={this.updateAnnualBudgetId}
                   initialRouteStack={this.state.routes}
                   enableGestures={this.enableGestures}
                   navigationBar={_.first(this.state.navBars)}
                   renderScene={this.renderScene}
                   configureScene={() => ({
                      ...Navigator.SceneConfigs.FloatFromBottom,
                      gestures: {}
                    })}>
        </Navigator>
      </SideMenu>
    )
    } else {
      return (
        <View style={[styles.navigator, {paddingTop: 100, alignItems: 'center'}]}>
          <Image style={styles.logo} source={require('image!logo')} />
          <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>No API found in settings</Text>
        </View>
      )
    }
  }
});

module.exports = Budgetal;
