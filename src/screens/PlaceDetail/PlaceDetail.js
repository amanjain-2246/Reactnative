import React, { Component } from "react";
import { Platform } from 'react-native';
import { View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Navigation } from "react-native-navigation";
import { deletePlace } from '../../store/actions/index';
import MapView from "react-native-maps";

class PlaceDetail extends Component {

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    Navigation.pop(this.props.componentId);

  }


  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image source={this.props.selectedPlace.image} style={styles.placeImage} />
          <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
        </View>
        <View style={styles.subContainer}>
          <MapView
            initialRegion={{
              ...this.props.selectedPlace.location,
              latitudeDelta: 0.0122,
              longitudeDelta:
                Dimensions.get("window").width /
                Dimensions.get("window").height *
                0.0122
            }}
            style={styles.map}
          >
            <MapView.Marker coordinate={this.props.selectedPlace.location} />
          </MapView>
        </View>

        <View>
          <TouchableOpacity onPress={this.placeDeletedHandler}>
            <View style={styles.deleteButton}>
              <Icon size={30} name={Platform.OS === 'android' ? "md-trash" : "ios-trash"} color="red" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

}



const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  deleteButton: {
    alignItems: "center"
  },
  map: {

    width: "100%",
    height: 250

  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key))
  };
};
export default connect(null, mapDispatchToProps)(PlaceDetail);
