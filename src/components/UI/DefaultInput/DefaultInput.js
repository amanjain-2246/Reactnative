import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const defaultInput = props => (

    <TextInput
        placeholder={props.placeholder}
        {...props}
        style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]}
        underlineColorAndroid="transparent"

    />

);


const styles = StyleSheet.create({
    input: {
        width: "100%",
        borderWidth: 1,
        padding: 5,
        borderColor: "grey",
        margin: 8

    },
    invalid: {
        backgroundColor: '#f9c0c0',
        borderColor: "red"
    }

});
export default defaultInput;