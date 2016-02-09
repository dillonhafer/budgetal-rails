var React = require('react-native')
var Router = require('../configs/Router')

var {
  PropTypes,
  Component,
  Navigator
} = React


class Nav extends Component {
  constructor(props) {
    super(props)
      this.initialRoute = {
        name: 'home',
        index: 0,
      }
  }

  componentDidMount() {
    this.props.actions.getLoginUserFromStorage()
      this.props.actions.getAllTopicsFromStorage()

      this.navigator.navigationContext.addListener('didfocus', e => {
        let route = e.data.route
        this[route.name] && this[route.name].componentDidFocus && this[route.name].componentDidFocus()
      })
  }

  renderScene(route, navigator) {
    this.router = this.router || new Router(navigator)
      if (route.component) {
        return React.createElement(route.component, Object.assign({}, route.props,
              {
                ref: view=>this[route.name] = view,
                actions: this.props.actions,
                state: this.props.state,
                router: this.router
              }
              ))
      }
  }

  configureScene(route) {
    if (route.sceneConfig) {
      return route.sceneConfig
    }
    return Navigator.SceneConfigs.FloatFromRight
  }


  render() {
    return (
        <Navigator
        ref={view => this.navigator=view}
        initialRoute={this.initialRoute}
        configureScene={this.configureScene.bind(this)}
        renderScene={this.renderScene.bind(this)} />
        )
  }
}

Nav.propTypes = {
  actions: PropTypes.object
}

module.exports = Nav
