import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
class PickImage extends Component {

    state = {
        pickedImaged: null
    }

    pickImagehandler = () => {
        ImagePicker.showImagePicker({ title: "Pick an image",maxWidth:800,maxHeight:600}, res => {

            if (res.didCancel) {
                console.log("user cancelled!");
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                this.setState({
                    pickedImaged: {
                        uri: res.uri
                    }
                });

                this.props.onImagePick({ uri: res.uri , base64 : res.data });
            }
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={this.state.pickedImaged} style={styles.image} />
                </View>
                <View style={styles.button}>
                    <Button title="Pick image" onPress={this.pickImagehandler} />
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150

    },
    button: {
        margin: 8
    },
    image: {
        width: "100%",
        height: "100%"
    }
});

export default PickImage;