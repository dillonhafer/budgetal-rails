export default function(name) {
  switch (name) {
    case 'logo':
      return require('./logo_icon.png');
    case 'coin':
      return require('./coin_icon.png');
    case 'left':
      return require('./left_icon.png');
    case 'cash':
      return require('./cash_icon.png');
    case 'list':
      return require('./list_icon.png');
    case 'calendar':
      return require('./calendar_icon.png');
    case 'statistics':
      return require('./statistics_icon.png');
    case 'account':
      return require('./account_icon.png');
    case 'sign_out':
      return require('./sign_out_icon.png');
    case 'plus':
      return require('./plus_icon.png');
    case 'charity':
      return require('./Charity.png');
    case 'saving':
      return require('./Saving.png');
    case 'housing':
      return require('./Housing.png');
    case 'utilities':
      return require('./Utilities.png');
    case 'food':
      return require('./Food.png');
    case 'clothing':
      return require('./Clothing.png');
    case 'transportation':
      return require('./Transportation.png');
    case 'health':
      return require('./Health.png');
    case 'insurance':
      return require('./Insurance.png');
    case 'personal':
      return require('./Personal.png');
    case 'recreation':
      return require('./Recreation.png');
    case 'debts':
      return require('./Debts.png');
  }
}
