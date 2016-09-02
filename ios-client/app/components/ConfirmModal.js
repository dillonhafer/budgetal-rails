import React, { Component } from 'react';
import { Modal, Image, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import StyleSheet from './StyleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';

const iconSize = 80;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    width,
    height,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    color: '$white',
    padding: 6,
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '$blue',
  },
  actionContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50
  },
  buttonContainer: {
    width: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize / 2,
    borderWidth: 1,
    borderColor: '$white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '$white',
    fontSize: 40,
  },
})
import { BlurView, VibrancyView } from 'react-native-blur';

class ConfirmModal extends Component {
  deleteFunction = () => {
    this.props.deleteFunction();
    this.props.cancelFunction();
  }

  render() {
    return (
      <Modal animationType={"fade"}
             transparent={true}
             visible={this.props.visible}
             onRequestClose={() => {}}>
        <BlurView blurType="dark" style={styles.container}>
          {this.props.message}

          <View style={styles.actionContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this.deleteFunction}>
                <View style={styles.iconContainer}>
                  <Icon name={this.props.actionIcon} style={styles.icon} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this.props.cancelFunction}>
                <View style={styles.iconContainer}>
                  <Icon name="times" style={styles.icon} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
    );
  }
}

module.exports = ConfirmModal;
