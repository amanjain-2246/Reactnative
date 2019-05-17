import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { addPlace } from '../../store/actions/index';
import { Navigation } from "react-native-navigation";
import PickImage from '../../components/PickImage/Pickimage';
import PickLocation from '../../components/PickLocation/PickLocation';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import validate from "../../Utility/Validation";
import { startAddPlace } from '../../store/actions/index';
class SharePlaceScreen extends Component {
    state = {
        controls: {
            placeName: {
                value: "",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            location: {
                value: null,
                valid: false
            },
            image: {
                value: null,
                valid: false
            }
        }
    };
        constructor(props) {
            super(props);
            this.sideDrawerVisible = false;

        }

       componentDidMount() {
            this.navigationEventListener = Navigation.events().bindComponent(this);
            Navigation.events().registerComponentDidDisappearListener(({ componentId }) => {
                if (componentId === 'OpenSideDrawer') {
                    this.sideDrawerVisible = false;
                }
                this.updateNavigationState();
            });
        }

        navigationButtonPressed({ buttonId }) {
            if (buttonId == 'OpenSideDrawer') {
                (!this.sideDrawerVisible) ? this.sideDrawerVisible = true : this.sideDrawerVisible = false;
                this.updateNavigationState();
            }
        }

        updateNavigationState() {
            Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                    left: {
                        visible: this.sideDrawerVisible
                    }
                }
            });
        }

    placeNameChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            };
        });
    };

    placeAddedHandler = () => {
        this.props.onAddPlace(
            this.state.controls.placeName.value,
            this.state.controls.location.value,
            this.state.controls.image.value);
    };

    locationPickedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            };
        });
    };

    imagePickedhandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            };
        });
    };

    render() {
        let submitButton = (
            <Button title="Share the place" onPress={this.placeAddedHandler}
                disabled={
                    !this.state.controls.placeName.valid ||
                    !this.state.controls.location.valid ||
                    !this.state.controls.image.valid
                }
            />
        );
        if (this.props.isLoading) {
            submitButton = <ActivityIndicator />
        }

        return (
            <ScrollView >
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Share a Place with us!</HeadingText>
                    </MainText>
                    <PickImage onImagePick={this.imagePickedhandler} />
                    <PickLocation onLocationPick={this.locationPickedHandler} />
                    <PlaceInput
                        placeName={this.state.controls.placeName}
                        onChangeText={this.placeNameChangedHandler}
                    />
                    <View style={styles.button}>

                        {submitButton}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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


const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
       // placeAdded: state.places.placeAdded
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
      //  onStartAddPlace: () => dispatch(startAddPlace())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);