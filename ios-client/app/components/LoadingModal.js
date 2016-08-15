import React, { Component } from 'react';
import { Modal, Image, Dimensions, Text, TouchableHighlight, View } from 'react-native';
import StyleSheet from './StyleSheet';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    width: 175,
    height: 175,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    color: '$blue',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
  },
  image: {
    height: 100,
    width: 100,
  }
})
import { BlurView, VibrancyView } from 'react-native-blur';

class LoadingModal extends Component {
  render() {
    const loadingSource = require('../images/loading.gif');
    return (
      <Modal animationType={"slide"}
             transparent={true}
             visible={this.props.visible}
             onRequestClose={() => {}}>
        <View style={styles.container}>
          <BlurView blurType="light" style={styles.imgContainer}>
            <Image style={styles.image} source={loadingSource} />
            <Text style={styles.text}>Loading...</Text>
          </BlurView>
        </View>
      </Modal>
    );
  }
}

module.exports = LoadingModal;
