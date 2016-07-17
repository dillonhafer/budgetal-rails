import React, {Component} from 'react'
import {
  Image,
  LayoutAnimation,
  Text,
  TouchableOpacity,
} from 'react-native'

import {
  FormContainer,
  FormInput,
  FormLabel,
  InputSeparator,
  InputContainer,
  InputButton,
} from './form-components'

import {showErrors} from '../utils/ViewHelpers';
import {savePhoto} from '../data/Users';
import ImagePicker from 'react-native-image-picker';

import StyleSheet from './StyleSheet'
const styles = StyleSheet.create({
  text: {
    color: '$blue',
    textAlign: 'center',
    marginTop: 4,
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
});

const options = {
  title: '', // specify null or empty string to remove the title
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

  render() {
    return (
      <FormContainer>
        <FormLabel label='PROFILE PHOTO' />
        <InputContainer>
          <TouchableOpacity style={{padding: 10}} onPress={this.choosePhoto}>
            <Image style={styles.avatar} source={{uri: this.state.user.avatar}} />
            <Text style={styles.text}>Tap to change</Text>
          </TouchableOpacity>
        </InputContainer>
        <InputButton onPress={this.savePhoto} text='Save' />
      </FormContainer>
    )
  }
}

module.exports = PhotoForm;
