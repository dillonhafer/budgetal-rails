'use strict'

import React, {PropTypes,Component} from 'react';
import {AppState, NavigationExperimental, View,Linking} from 'react-native';
import StyleSheet from '../components/StyleSheet';
import { connect } from 'react-redux';
import LoadingModal from '../components/LoadingModal';

import SignInContainer from './SignInContainer';
import SignUpContainer from './SignUpContainer';
import BudgetsContainer from './BudgetsContainer';
import BudgetCategoryContainer from './BudgetCategoryContainer';
import BudgetItemFormContainer from './BudgetItemFormContainer';
import BudgetItemContainer from './BudgetItemContainer';
import BudgetItemExpenseFormContainer from './BudgetItemExpenseFormContainer';
import MenuContainer from './MenuContainer';
import Hamburger from '../components/Hamburger';
import NavigationTitle from '../components/NavigationTitle';
import StatisticsContainer from './StatisticsContainer';
import AnnualBudgetsContainer from './AnnualBudgetsContainer';
import AnnualBudgetItemFormContainer from './AnnualBudgetItemFormContainer';
import AccountContainer from './AccountContainer';
import PhotoFormContainer from './PhotoFormContainer';
import AccountInfoFormContainer from './AccountInfoFormContainer';
import ChangePasswordFormContainer from './ChangePasswordFormContainer';
import BudgetInfoContainer from './BudgetInfoContainer';
import BudgetInfoButtonContainer from './BudgetInfoButtonContainer';
import MonthlyIncomeFormContainer from './MonthlyIncomeFormContainer';
import PasswordResetRequestContainer from './PasswordResetRequestContainer';
import PasswordResetContainer from './PasswordResetContainer';
import DetailedBudgetsContainer from './DetailedBudgetsContainer';

import UserDefaults from 'react-native-userdefaults-ios';

import {setApiUrl} from '../data/API';
import SideMenu from 'react-native-side-menu';
import BackButton from '../components/BackButton';
import { navigatePush, navigatePop } from '../actions/Navigation';

const {
	Card: NavigationCard,
	CardStack: NavigationCardStack,
	Header: NavigationHeader
} = NavigationExperimental

import { navigateReset } from '../actions/Navigation'

class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
    }
  }

  signOut = () => {
    this.props.dispatch(navigateReset([{key: 'SignIn', title: ''}],0))
  }

  authorizedRequest = async(asyncFunction, success) => {
    try {
      const response = await asyncFunction();
      success(response)
    } catch(err) {
      this.signOut()
    } finally {
    }
  }

  loadingModal = async(asyncFunction, success, failure = console.warn) => {
    try {
      this.setState({modalVisible: true})
      const response = await asyncFunction();
      success(response)
    } catch(err) {
      failure(err)
      this.signOut()
    } finally {
      this.setState({modalVisible: false})
    }
  }

	setServer = async() => {
    try {
      let api_url = await UserDefaults.stringForKey('api_server_preference');
      if (this.props.testMode || api_url === null) {
        api_url = this.props.defaultApiUrl;
      }
      setApiUrl(api_url);
    } catch (err) {
      window.alert({title: 'Error', message: err});
    }
  }

	componentDidMount() {
    this.setServer();
    AppState.addEventListener('change', this._handleAppStateChange);
    Linking.addEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL = (event) => {
    const url = new URL(event.url)
    switch (url.pathname) {
      case '//reset-password':
        const password_reset_token = url.searchParams.get('reset_password_token');
        this.props.dispatch(navigatePush({key: 'PasswordReset', title: 'Change Password', password_reset_token}))
        break;
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  _handleAppStateChange = (currentAppState) => {
    if (currentAppState === 'active') {
      this.setServer();
    }
  }

	render() {
		let { navigationState, onNavigateBack } = this.props;
    let route = navigationState.routes[navigationState.index];
		return (
      <SideMenu openMenuOffset={265}
								ref='SideMenu'
                bounceBackOnOverdraw={true}
                touchToClose={true}
								disableGestures={this._disableGestures(navigationState)}
                edgeHitWidth={400}
                menu={<MenuContainer authorizedRequest={this.authorizedRequest} />}>
  			<NavigationCardStack
  				navigationState={navigationState}
          direction={this._cardDirection(route.key)}
  				style={styles.outerContainer}
          cardStyle={this._cardStyles(route.key)}
  				onNavigateBack={this.props.onNavigateBack}
  				renderOverlay={this._renderOverlay}
  				renderScene={this._renderScene}
  			/>
        <LoadingModal visible={this.state.modalVisible} />
      </SideMenu>
		)
	}

  _renderOverlay = (props) => {
    return (
      <NavigationHeader
        {...props}
        onNavigateBack={this.props.onNavigateBack}
        style={this._headerStyles(props.navigationState)}
        renderTitleComponent={this._renderTitle}
        renderLeftComponent={this._renderLeftComponent}
        renderRightComponent={this._renderRightComponent}
      />
    )
  }

	_renderTitle(props) {
		const title = String(props.scene.route.title || '');
		const isIcon = props.scene.route.key === 'BudgetCategory'
		return <NavigationTitle title={title} categoryIcon={isIcon} />
	}

	_disableGestures(navState) {
		const disabledScenes = [
			'SignIn',
			'SignUp',
			'Account',
			'BudgetCategory',
			'BudgetItem',
			'BudgetItemForm',
			'BudgetItemExpenseForm',
			'AnnualBudgets',
			'AnnualBudgetItemForm',
			'PhotoForm',
			'AccountInfoForm',
			'ChangePasswordForm',
			'BudgetInfo',
			'MonthlyIncomeForm',
			'PasswordResetRequest',
			'PasswordReset',
		]
		let child = navState.routes[navState.index]
		return child && disabledScenes.includes(child.key);
	}

	_openMenu = () => {
		this.refs.SideMenu.openMenu(true);
	}

  _renderRightComponent = (props) => {
    switch (props.scene.route.key) {
      case 'Budgets':
        return <BudgetInfoButtonContainer />
      default:
        return null
    }
  }

  _renderLeftComponent = (props) => {
    switch (props.scene.route.key) {
      case 'Budgets':
      case 'DetailedBudgets':
      case 'AnnualBudgets':
			case 'Statistics':
      case 'Account':
        return <Hamburger openMenu={this._openMenu} />
      case 'SignIn':
        return null
			case 'SignUp':
			case 'BudgetItemForm':
			case 'BudgetItemExpenseForm':
			case 'AnnualBudgetItemForm':
			case 'PhotoForm':
			case 'AccountInfoForm':
			case 'ChangePasswordForm':
			case 'MonthlyIncomeForm':
			case 'PasswordResetRequest':
			case 'PasswordReset':
				return <BackButton onNavigateBack={props.onNavigateBack} text='Cancel' />
      case 'BudgetInfo':
        return <BackButton onNavigateBack={props.onNavigateBack} text='Done' />
      default:
	      return <BackButton onNavigateBack={props.onNavigateBack} />
    }
  }

  _cardDirection(key) {
    switch (key) {
			case 'SignIn':
			case 'SignUp':
			case 'BudgetItemForm':
			case 'BudgetItemExpenseForm':
			case 'AnnualBudgetItemForm':
			case 'PhotoForm':
			case 'AccountInfoForm':
			case 'ChangePasswordForm':
			case 'BudgetInfo':
			case 'MonthlyIncomeForm':
			case 'PasswordResetRequest':
			case 'PasswordReset':
        return 'vertical'
			default:
				return 'horizontal'
		}
  }

	_cardStyles(key) {
		switch (key) {
			case 'SignIn':
				return {}
			default:
				return styles.visibleNav
		}
	}

  _headerStyles(navState) {
		let child = navState.routes[navState.index];
		let key = (child.key.length) ? child.key : '';

    switch (key) {
      case 'SignIn':
        return styles.hiddenNav
      default:
        return styles.navHeader
    }
  }

  _swipeBackScene(key) {
    const backScenes = ['BudgetCategory', 'BudgetItem'];
    return key && backScenes.includes(key);
  }

  _horizontalScene(key) {
    const horizontalScenes = [
			'SignIn',
			'SignUp',
			'BudgetItemForm',
			'BudgetItemExpenseForm',
			'AnnualBudgetItemForm',
			'PhotoForm',
			'AccountInfoForm',
			'ChangePasswordForm',
			'BudgetInfo',
			'MonthlyIncomeForm',
			'PasswordResetRequest',
			'PasswordReset',
		];
    return horizontalScenes.includes(key);
  }

	_renderScene = (props) => {
		const { navigationState } = props

		switch(props.scene.route.key) {
			case 'SignIn':
				return <SignInContainer authorizedRequest={this.authorizedRequest} />
			case 'SignUp':
				return <SignUpContainer authorizedRequest={this.authorizedRequest} />
	    case 'Budgets':
	      return <BudgetsContainer loadingModal={this.loadingModal} authorizedRequest={this.authorizedRequest} />
	    case 'DetailedBudgets':
	      return <DetailedBudgetsContainer authorizedRequest={this.authorizedRequest} />
			case 'Statistics':
	      return <StatisticsContainer authorizedRequest={this.authorizedRequest} />
			case 'BudgetCategory':
				return <BudgetCategoryContainer loadingModal={this.loadingModal} authorizedRequest={this.authorizedRequest} />
			case 'BudgetItem':
				return <BudgetItemContainer authorizedRequest={this.authorizedRequest} />
			case 'BudgetItemForm':
				return <BudgetItemFormContainer authorizedRequest={this.authorizedRequest} />
			case 'BudgetItemExpenseForm':
				return <BudgetItemExpenseFormContainer authorizedRequest={this.authorizedRequest} />
			case 'AnnualBudgets':
	      return <AnnualBudgetsContainer authorizedRequest={this.authorizedRequest} />
			case 'AnnualBudgetItemForm':
				return <AnnualBudgetItemFormContainer authorizedRequest={this.authorizedRequest} />
			case 'Account':
				return <AccountContainer authorizedRequest={this.authorizedRequest} />
			case 'PhotoForm':
				return <PhotoFormContainer authorizedRequest={this.authorizedRequest} />
			case 'AccountInfoForm':
				return <AccountInfoFormContainer authorizedRequest={this.authorizedRequest} />
			case 'ChangePasswordForm':
				return <ChangePasswordFormContainer authorizedRequest={this.authorizedRequest} />
      case 'BudgetInfo':
				return <BudgetInfoContainer authorizedRequest={this.authorizedRequest} />
      case 'MonthlyIncomeForm':
				return <MonthlyIncomeFormContainer authorizedRequest={this.authorizedRequest} />
      case 'PasswordResetRequest':
				return <PasswordResetRequestContainer authorizedRequest={this.authorizedRequest} />
      case 'PasswordReset':
				return <PasswordResetContainer authorizedRequest={this.authorizedRequest} />
		}
	}
}

AppContainer.propTypes = {
	navigationState: PropTypes.object,
	onNavigateBack: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	outerContainer: {
		backgroundColor: '$backgroundColor',
	},
	visibleNav: {
		marginTop: NavigationHeader.HEIGHT,
	},
  hiddenNav: {
    backgroundColor: '$clear',
    borderBottomWidth: 0,
  },
  navHeader: {
    backgroundColor: '$blue',
    borderBottomColor: '$blue',
  },
})

export default connect(
	state => ({
		navigationState: state.navigationState
	}),
	dispatch => ({
		onNavigateBack: (action) => {
  		dispatch(navigatePop())
		}
	})
)(AppContainer)
