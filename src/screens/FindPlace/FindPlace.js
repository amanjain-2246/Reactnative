import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from "react-native-navigation";
import PlaceList from '../../components/PlaceList/PlaceList';
import { getPlaces } from '../../store/actions/index';
class FindPlaceScreen extends Component {

    state = {
        placesLoaded: false,
        removeAnim: new Animated.Value(1),
        placesAnim: new Animated.Value(0)
    }
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.onLoadPlaces();
    }


    placesLoadedHandler = () => {
        Animated.timing(this.state.placesAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    };

    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placesLoaded: true
            });
            this.placesLoadedHandler();
        });
    };

    placeSelectedHandler = key => {
        const selPlace = this.props.places.find(place => {
            return place.key === key;
        })

        Navigation.push(this.props.componentId, {
            component: {
                name: 'myapp-place.PlaceDetailScreen',
                passProps: {
                    selectedPlace: selPlace
                },
                options: {
                    topBar: {
                        title: {
                            text: selPlace.name
                        }
                    }
                }
            }
        });


    };

    render() {
        let content = (
            <Animated.View style={{
                opacity: this.state.removeAnim,
                transform: [
                    {
                        scale: this.state.removeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [12, 1]
                        })
                    }
                ]
            }}>
                <TouchableOpacity onPress={this.placesSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Find Places</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
        if (this.state.placesLoaded) {
            content = (
                <PlaceList places={this.props.places} onItemSelected={this.placeSelectedHandler} />

            );
        }
        return (
            <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    searchButton: {
        backgroundColor: "#eee",
        borderColor: "#bbb",
        borderWidth: 5,
        borderRadius: 50,
        padding: 10
    },
    searchButtonText: { color: "orange", fontWeight: "bold", fontSize: 26 }

});
const mapStateToProp = state => {
    return {
        places: state.places.places
    };
};

const mapDispatchToProps = dispatch => {

    return {
        onLoadPlaces: () => dispatch(getPlaces())
    };
};
export default connect(mapStateToProp, mapDispatchToProps)(FindPlaceScreen);