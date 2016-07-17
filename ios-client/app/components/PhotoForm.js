import React, {Component} from 'react'
import {
  Image,
  Dimensions,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View
} from 'react-native'

import {showErrors} from '../utils/ViewHelpers';
import {savePhoto} from '../data/Users';
import ImagePicker from 'react-native-image-picker';

import StyleSheet from './StyleSheet'
const {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    marginLeft: 10,
    color: '$formLabel'
  },
  form: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '$formBackground'
  },
  text: {
    color: '$blue',
    textAlign: 'center',
    marginTop: 4,
  },
  saveButtonText: {
    textAlign: 'center',
    backgroundColor: '$white',
    color: '$blue',
    margin: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderColor: '$grayBorder',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '$blue',
  },
  imageContainer: {
    margin: 20,
    marginTop: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$white',
    width: width,
    paddingTop: 20,
    paddingBottom: 20,
  },
});

const options = {
  title: 'Change Profile Image', // specify null or empty string to remove the title
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'medium', // 'low', 'medium', or 'high'
  maxWidth: 300, // photos only
  maxHeight: 300, // photos only
  quality: 0.2, // 0 to 1, photos only
  allowsEditing: true, // Built in functionality to resize/reposition the image after selection
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
    skipBackup: true, // ios only - image will NOT be backed up to icloud
    path: 'images' // ios only - will save image at /Documents/images rather than the root
  }
};

class PhotoForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: props.user,
    };
  }

  savePhoto = async() => {
    const params = {
      user: {
        avatar: this.state.user.avatar
      }
    };

    try {
      const resp = await savePhoto(params);
      if (resp !== null && resp.errors === undefined) {
        this.props.updatePhoto(this.state.user)
        this.props.goBack();
      } else {
        showErrors(resp.errors);
      }
    } catch (err) {
      this.props.endSession();
    }
  }

  choosePhoto = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.data) {
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        const user = Object.assign({}, this.state.user, {avatar: source.uri})
        this.setState({
          user,
          changed: true,
        })
      }
    });
  }

  saveButton = () => {
    return (
      <TouchableHighlight
        style={styles.saveButton}
        underlayColor={'#6699ff'}
        onPress={this.savePhoto}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.form}>
        <Text style={styles.label}>PROFILE PHOTO</Text>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={this.choosePhoto}>
            <Image style={styles.avatar} source={{uri: this.state.user.avatar}} />
            <Text style={styles.text}>Tap to change</Text>
          </TouchableOpacity>
        </View>
        {this.saveButton()}
      </View>
    )
  }
}

module.exports = PhotoForm;
