'use strict'

import React, {PropTypes,Component} from 'react';
import {AppState,NavigationExperimental,Text, View} from 'react-native';
import StyleSheet from '../components/StyleSheet';
import { connect } from 'react-redux';

import SignInContainer from './SignInContainer';
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

import UserDefaults from 'react-native-userdefaults-ios';

import {setApiUrl} from '../data/API';
import SideMenu from 'react-native-side-menu';
import BackButton from '../components/BackButton';
import { navigatePush, navigatePop } from '../actions/Navigation';

const {
	Transitioner: NavigationTransitioner,
	Card: NavigationCard,
	Header: NavigationHeader
} = NavigationExperimental

class AppContainer extends Component {
	setServer = async() => {
    try {
      let api_url = await UserDefaults.stringForKey('api_server_preference');
      if (api_url === null) {
        api_url = 'https://api.budgetal.com';
      }
      setApiUrl(api_url);
    } catch (err) {
      window.alert({title: 'Error', message: err});
    }
  }

	componentDidMount() {
    this.setServer();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (currentAppState) => {
    if (currentAppState === 'active') {
      this.setServer();
    }
  }

	render() {
		let { navigationState, onNavigate } = this.props

		return (
      // Note that we are not using a 'BackAction' handling
      // the reduction of our state for us. Instead, we grab the navigationState we have in
      // our Redux store and pass it directly to the <NavigationAnimatedView />.
      <SideMenu openMenuOffset={265}
								ref='SideMenu'
                bounceBackOnOverdraw={true}
                touchToClose={true}
								disableGestures={this._disableGestures(navigationState)}
                edgeHitWidth={400}
                menu={<MenuContainer />}>
			<NavigationTransitioner
				navigationState={navigationState}
				style={styles.outerContainer}
				onNavigate={onNavigate}
				renderOverlay={props => (
				  <NavigationHeader
						{...props}
            style={this._headerStyles(navigationState)}
						renderTitleComponent={this._renderTitle}
            renderLeftComponent={this._renderLeftComponent}
					/>
				)}
				renderScene={props => (
					// Again, we pass our navigationState from the Redux store to <NavigationCard />.
					// Finally, we'll render out our scene based on navigationState in _renderScene().
					<NavigationCard
						{...props}
						// Transition animations are determined by the StyleInterpolators. Here we manually
						// override the default horizontal style interpolator that gets applied inside of
						// NavigationCard for a vertical direction animation if we are showing a modal.
						style={this._cardStyles(props)}
						// By default a user can swipe back to pop from the stack. Disable this for modals.
						// Just like for style interpolators, returning undefined lets NavigationCard override it.
						panHandlers={this._swipeBackScene(props.scene.navigationState.key) ? undefined : null}
						renderScene={this._renderScene}
						key={props.scene.navigationState.key}
					/>
				)}
			/>
      </SideMenu>
		)
	}

	_renderTitle(props) {
		const title = props.scene.navigationState.title
		const isIcon = props.scene.navigationState.key === 'BudgetCategory'
		return <NavigationTitle title={title} categoryIcon={isIcon} />
	}

	_disableGestures(navState) {
		const disabledScenes = ['SignIn', 'BudgetCategory', 'BudgetItem', 'BudgetItemForm','BudgetItemExpenseForm']
		let child = navState.children[navState.index]
		return child && disabledScenes.includes(child.key);
	}

	_openMenu = () => {
		this.refs.SideMenu.openMenu(true);
	}

  _renderLeftComponent = (props) => {
    switch (props.scene.navigationState.key) {
      case 'Budgets':
      case 'DetailedBudgets':
      case 'AnnualBudgets':
			case 'Statistics':
      case 'Account':
        return <Hamburger openMenu={this._openMenu} />
      case 'SignIn':
        return null
			case 'BudgetItemForm':
			case 'BudgetItemExpenseForm':
			case 'AnnualBudgetItemForm':
				return <BackButton onNavigate={props.onNavigate} text='Cancel' />
      default:
	      return <BackButton onNavigate={props.onNavigate} text={props.scene.navigationState.back} />
    }
  }

	_cardStyles(props) {
		switch (props.scene.navigationState.key) {
			case 'SignIn':
				return NavigationCard.CardStackStyleInterpolator.forVertical(props)
			case 'BudgetItemForm':
			case 'BudgetItemExpenseForm':
			case 'AnnualBudgetItemForm':
				return [NavigationCard.CardStackStyleInterpolator.forVertical(props),styles.visibleNav]
			default:
				return [NavigationCard.CardStackStyleInterpolator.forHorizontal(props),styles.visibleNav]
		}
	}

  _headerStyles(navState) {
		let child = navState.children[navState.index];
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
    const horizontalScenes = ['SignIn', 'BudgetItemForm', 'BudgetItemExpenseForm', 'AnnualBudgetItemForm'];
    return horizontalScenes.includes(key);
  }

	_renderScene({scene}) {
		const { navigationState } = scene

		switch(navigationState.key) {
			case 'SignIn':
				return <SignInContainer />
	    case 'Budgets':
	      return <BudgetsContainer />
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
		}
	}
}

AppContainer.propTypes = {
	navigationState: PropTypes.object,
	onNavigate: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	outerContainer: {
		flex: 1,
		backgroundColor: '$backgroundColor',
	},
	visibleNav: {
		paddingTop: NavigationHeader.HEIGHT,
	},
	container: {
		flex: 1,
	},
  navTitle: {
    color: '$white',
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
		onNavigate: (action) => {
			// Two types of actions are likely to be passed, both representing "back"
			// style actions. Check if a type has been indicated, and try to match it.
			if (action.type && (
				action.type === 'BackAction' ||
				action.type === NavigationCard.CardStackPanResponder.Actions.BACK.type)
			) {
				dispatch(navigatePop())
			} else {
				// Currently unused by NavigationExperimental (only passes back actions),
				// but could potentially be used by custom components.
				dispatch(navigatePush(action))
			}
		}
	})
)(AppContainer)
