import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

class PickLocation extends Component {

    state = {
        focusedLocation: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0922,

        },
        locationChosen: false
    }

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        });
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            };
        });
        this.props.onLocationPick({
            latitude: coords.latitude,
            longitude: coords.longitude
        });

    };

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const coordsEvents = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coordsEvents);

        }, err => {
            alert('failed!!');
        });
    };

    render() {
        let marker = null;
        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />
        }
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <MapView
                        // region={this.state.focusedLocation}
                        initialRegion={this.state.focusedLocation}
                        style={styles.map}
                        onPress={this.pickLocationHandler}
                        ref={ref => this.map = ref}>
                        {marker}
                    </MapView>
                </View>
                <View style={styles.button}>
                    <Button title="locate Me" onPress={this.getLocationHandler} />
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
    map: {

        width: "100%",
        height: 250

    },
    placeholder: {

        width: "100%",
        height: 250
    },
    button: {
        margin: 8
    }
});
export default PickLocation;