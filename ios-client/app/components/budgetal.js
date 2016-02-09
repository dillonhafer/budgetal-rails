'use strict';

var React = require('react-native');
var UserDefaults = require('react-native-userdefaults-ios');
var {
  Image,
  Navigator,
  View,
  Text
} = React;

global.AppRoutes = require('../Utils/AppRoutes');
global._ = require('lodash-node');
global.images = require('../../components/app_images');

var Menu = require('../Views/Menu');
var MenuIcon = require('../Views/MenuIcon');
var NavigationBar = require('react-native-navbar');
var SideMenu = require('react-native-side-menu');
var styles = require('../../styles');

let statusBar = {
  style: 'light-content',
  hidden: false,
  showAnimation: 'fade'
}

var Budgetal = React.createClass({
  getInitialState: function() {
    return ({
      loggedIn: false,
      baseApi: 'https://www.budgetal.com',
      gesturesAreDisabled: true,
      routes: [AppRoutes.signIn],
      navBars: [this.defaultNavBar()]
    });
  },
  _setServer() {
    var self = this;
    UserDefaults.stringForKey('api_server_preference')
     .then(api => {
       if (api !== null) {
         self.setState({baseApi: api})
       }
       global.baseApi = this.state.baseApi
     })
  },
  componentDidMount() {
    this._setServer();
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
    var customTitle = newRoute.customTitle ? newRoute.customTitle : this.customTitle(newRoute.title);
    var title = <Text style={styles.navBarTitle}>{newRoute.title}</Text>;
    var left = newRoute.left ? newRoute.left : <MenuIcon />;
    var navBar = <NavigationBar title={title}
                                statusBar={statusBar}
                                titleColor='#FFF'
                                style={styles.header}
                                leftButton={left}
                                customNext={this.nextButton(newRoute)}
                                hidePrev={!newRoute.showMenu}
                                route={newRoute}
                                data={newRoute.data}
                                navigator={navigator}
                                customTitle={customTitle} />;

    navBar = <View style={styles.navBar}>{navBar}</View>;
    this.replaceNavBar(navBar)
    this.refs.navigator.replace(newRoute)
  },
  popRoute: function() {
    this.popNavBar()
    this.refs.navigator.pop();
  },
  pushRouteBack: function(newRoute) {
    var customTitle = newRoute.customTitle ? newRoute.customTitle : this.customTitle(newRoute.title)
    var title = <Text style={styles.navBarTitle}>{newRoute.title}</Text>;
    var navBar = <NavigationBar title={title}
                                statusBar={statusBar}
                                tintColor='green'
                                titleColor='#FFF'
                                style={styles.header}
                                leftButton={this.prevButton(newRoute)}
                                customNext={this.nextButton(newRoute)}
                                hidePrev={!newRoute.showMenu}
                                route={newRoute}
                                data={newRoute.data}
                                navigator={navigator}
                                customTitle={customTitle} />;
    navBar = <View style={styles.navBar}>{navBar}</View>;
    this.pushNavBar(navBar);
    this.refs.navigator.push(newRoute)
  },
  pushRoute: function(newRoute) {
    this.refs.navigator.push(newRoute);
  },
  prevButton: function(route) {
    if (route.leftCorner) {
      return route.leftCorner;
    } else if (route.showMenu) {
      return <MenuIcon />
    } else {
      return '';
    }
  },
  nextButton: function(route) {
    return route.nextButton ? route.nextButton : '';
  },
  signOut: function() {
    this.setState({gesturesAreDisabled: true});
    this.updateRoute(AppRoutes.signIn);
  },
  customTitle: function(title) {
    if (title === 'Budgetal') {
      return <Image source={images.logo} />
    }
  },
  defaultNavBar: function(navbar) {
    return (
      <View style={styles.navBar}><NavigationBar statusBar={statusBar} style={styles.header} /></View>
    );
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
  render: function() {
    if (this.state.baseApi !== '') {
    return (
      <SideMenu openMenuOffset={280}
                disableGestures={this.state.gesturesAreDisabled}
                touchToClose={true}
                edgeHitWidth={400}
                menu={
                  <Menu updateRoute={this.updateRoute}
                        annualBudgetId={this.state.annualBudgetId}
                        pushRouteBack={this.pushRouteBack}
                        popRoute={this.popRoute}
                        pushRoute={this.pushRoute}
                        signOut={this.signOut} />
                }>
        <Navigator ref='navigator'
                   style={styles.navigator}
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
      return <View style={styles.navigator}><Text>No API in settings</Text></View>
    }
  }
});

module.exports = Budgetal;
