'use strict'

import React, {PropTypes,Component} from 'react';
import {AppState, NavigationExperimental, View,Linking} from 'react-native';
import StyleSheet from '../components/StyleSheet';
import { connect } from 'react-redux';

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

class AppContainer extends Component {
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
                menu={<MenuContainer />}>
  			<NavigationCardStack
  				navigationState={navigationState}
          direction={this._cardDirection(route.key)}
  				style={styles.outerContainer}
          cardStyle={this._cardStyles(route.key)}
  				onNavigateBack={this.props.onNavigateBack}
  				renderOverlay={this._renderOverlay}
  				renderScene={this._renderScene}
  			/>
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

	_renderScene(props) {
		const { navigationState } = props

		switch(props.scene.route.key) {
			case 'SignIn':
				return <SignInContainer />
			case 'SignUp':
				return <SignUpContainer />
	    case 'Budgets':
	      return <BudgetsContainer />
	    case 'DetailedBudgets':
	      return <DetailedBudgetsContainer />
			case 'Statistics':
	      return <StatisticsContainer />
			case 'BudgetCategory':
				return <BudgetCategoryContainer budgetCategory={navigationState.budgetCategory} />
			case 'BudgetItem':
				return <BudgetItemContainer budgetItem={navigationState.budgetItem} />
			case 'BudgetItemForm':
				return <BudgetItemFormContainer budgetItem={navigationState.budgetItem} />
			case 'BudgetItemExpenseForm':
				return <BudgetItemExpenseFormContainer budgetItemExpense={navigationState.budgetItemExpense} />
			case 'AnnualBudgets':
	      return <AnnualBudgetsContainer />
			case 'AnnualBudgetItemForm':
				return <AnnualBudgetItemFormContainer budgetItem={navigationState.budgetItem} />
			case 'Account':
				return <AccountContainer />
			case 'PhotoForm':
				return <PhotoFormContainer />
			case 'AccountInfoForm':
				return <AccountInfoFormContainer />
			case 'ChangePasswordForm':
				return <ChangePasswordFormContainer />
      case 'BudgetInfo':
				return <BudgetInfoContainer />
      case 'MonthlyIncomeForm':
				return <MonthlyIncomeFormContainer />
      case 'PasswordResetRequest':
				return <PasswordResetRequestContainer />
      case 'PasswordReset':
				return <PasswordResetContainer />
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
