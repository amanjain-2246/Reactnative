import React, { Component } from "react";
import DefaultInput from '../UI/DefaultInput/DefaultInput';
const PlaceInput = props => (
  <DefaultInput placeholder="Place Name"
    value={props.placeName}
    valid={props.valid}
    touched={props.touched}
    onChangeText={props.onChangeText} />
);



export default PlaceInput;
