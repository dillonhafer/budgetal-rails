import React, {Component} from 'react'
import {Dimensions,Keyboard,LayoutAnimation,View,Text,TouchableOpacity} from 'react-native'

const {width} = Dimensions.get('window');
import {dismissKeyboard} from '../utils/ViewHelpers'
import StyleSheet from './StyleSheet'

const ACCESSORY_HEIGHT = 40;
const BUTTON_PADDING   = 10;
const BORDER_HEIGHT    = 0.5;
const TOTAL_ACCESSORY_HEIGHT = ACCESSORY_HEIGHT + BUTTON_PADDING - (BORDER_HEIGHT * 2);

const styles = StyleSheet.create({
  numberDoneContainer: {
    borderTopColor: '$graySeparator',
    borderTopWidth: BORDER_HEIGHT,
    borderBottomColor: '$graySeparator',
    borderBottomWidth: BORDER_HEIGHT,
    backgroundColor: '$inputAccessory',
    height: ACCESSORY_HEIGHT,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  numberDoneButton: {
    padding: BUTTON_PADDING,
    paddingRight: 20,
    alignSelf: 'flex-end',
  },
  doneText: {
    fontWeight: 'bold',
    color: '$inputAccessoryButton'
  }
})

class NumberPadAccessory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      keyboardHeight: Dimensions.get('window').height
    }
  }

  componentWillMount () {
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
  }

  keyboardWillShow (e) {
    this.setState({keyboardHeight: e.endCoordinates.height})
  }

  render() {
    if (this.props.numberPadPresent) {
      const top = this.state.keyboardHeight - TOTAL_ACCESSORY_HEIGHT;
      return (
        <View style={[styles.numberDoneContainer, {top}]}>
          <TouchableOpacity style={styles.numberDoneButton} onPress={dismissKeyboard}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return null;
    }
  }
}

module.exports = NumberPadAccessory;
