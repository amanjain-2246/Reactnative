import React, { Component } from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { authLogout } from '../../store/actions/index';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
class SideMenu extends Component {

    render() {
        return (
            <View style={[styles.container, {
                width: Dimensions.get("window").width * 0.8
            }]}>
                <TouchableOpacity onPress={this.props.onLogout}>
                    <View style={style.drawerItem}>
                        <Icon name={Platform.OS === 'android' ? "md-log-out" : "ios-log-out"}
                            size={30}
                            color={"#bbb"}
                            style={styles.drawrIconItem} />
                        <Text>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "white"
    },
    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#eee"

    },
    drawrIconItem: {
        marginRight: 10
    }

});

const mapDispatchToProp = dispatch => {
    return {
        onLogout: () => dispatch(authLogout())
    };
}
export default connect(null, mapDispatchToProp)(SideMenu);