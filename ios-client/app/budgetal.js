import React, {Component} from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reducers from './reducers'
import AppContainer from './containers/AppContainer'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = createStoreWithMiddleware(reducers)

export default class Budgetal extends Component {
  componentDidMount() {
  }

  _defaultApiUrl = () => {
    switch(this.props.testMode) {
      case 'INTEGRATION_TEST_MODE':
        return 'http://localhost:3389'
      default:
        return 'https://api.budget.com'
    }
  }

  _testMode = () => {
    switch(this.props.testMode) {
      case 'INTEGRATION_TEST_MODE':
        return true
      default:
        return false
    }
  }

	render() {
    const api = this._defaultApiUrl();
    const testMode = this._testMode();

		return (
			<Provider store={store}>
				<AppContainer dispatch={store.dispatch} defaultApiUrl={api} testMode={testMode} />
			</Provider>
		)
	}
}
