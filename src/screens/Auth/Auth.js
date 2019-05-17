import React, { Component } from 'react';
import { View, Dimensions, ImageBackground, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ActivityIndicator, YellowBox } from 'react-native';
import ButtonWithBackground from '../../components/UI/Button/ButtonWithBackground';
import backgroundImage from '../../assets/beautiful.jpg'
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import validate from '../../Utility/Validation';
import { connect } from 'react-redux';
import { tryAuth, authAutoSignIn } from '../../store/actions/index';
class AuthScreen extends Component {

    state = {
        authMode: "login",
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: "password"
                },
                touched: false
            }
        }
    };

    componentDidMount() {
        this.props.onAutoSignIn();
    }
    switchAuthModeHandler = () => {
        this.setState(preState => {
            return {
                authMode: preState.authMode === "login" ? "signup" : "login"
            };
        });
    };



    authHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        this.props.onTryAuth(authData, this.state.authMode);


    };
    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }
        if (key === "password") {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid:
                            key === "password"
                                ? validate(
                                    prevState.controls.confirmPassword.value,
                                    prevState.controls.confirmPassword.validationRules,
                                    connectedValue
                                )
                                : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                            connectedValue
                        ),
                        touched: true
                    }
                }
            };
        });
    };


    render() {

        let confirmPasswordControl = null;
        let headingText = null;
        YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);
        console.disableYellowBox = true;
        let submitbutton = (
            <ButtonWithBackground
                color="#29aaf4"
                onPress={this.authHandler}
                disabled={
                    (!this.state.controls.confirmPassword.valid && this.state.authMode === "signup") ||
                    !this.state.controls.email.valid ||
                    !this.state.controls.password.valid
                }
            >Submit</ButtonWithBackground>
        );
        if (Dimensions.get('window').height > 500) {
            headingText = (
                <MainText>
                    <HeadingText>Please log In</HeadingText>
                </MainText>
            );
        }
        if (this.state.authMode === "signup") {
            confirmPasswordControl = (
                <DefaultInput placeholder="Confirm Password"
                    value={this.state.controls.confirmPassword.value}
                    onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                    style={styles.input}
                    valid={this.state.controls.confirmPassword.valid}
                    touched={this.state.controls.confirmPassword.touched}
                    secureTextEntry
                />);
        }

        if (this.props.isLoading) {
            submitbutton = <ActivityIndicator />;
        }
        return (


            <ImageBackground source={backgroundImage} style={styles.backgroundImg}>

                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    {headingText}
                    <ButtonWithBackground
                        color="#29aaf4"
                        onPress={this.switchAuthModeHandler}

                    >Switch to {this.state.authMode === "login" ? "Signup" : "Login"}
                    </ButtonWithBackground>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inputContainer} >
                            <DefaultInput placeholder="Email"
                                style={styles.input}
                                value={this.state.controls.email.value}
                                onChangeText={(val) => this.updateInputState('email', val)}
                                valid={this.state.controls.email.valid}
                                touched={this.state.controls.email.touched}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address" />

                            <DefaultInput placeholder="Password"
                                style={styles.input}
                                value={this.state.controls.password.value}
                                onChangeText={(val) => this.updateInputState('password', val)}
                                valid={this.state.controls.password.valid}
                                touched={this.state.controls.password.touched}
                                secureTextEntry
                            />
                            <View>{confirmPasswordControl}</View>
                        </View>
                    </TouchableWithoutFeedback>
                    {submitbutton}
                </KeyboardAvoidingView>
            </ImageBackground>
        );


    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {
        width: "80%"
    },
    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb"
    },
    backgroundImg: { width: '100%', flex: 1 }


});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    };
};
const mapDisapatchToProps = dispatch => {
    return {
        onTryAuth: (authdata, authMode) => dispatch(tryAuth(authdata, authMode)),
        onAutoSignIn: () => dispatch(authAutoSignIn())

    }
};
export default connect(mapStateToProps, mapDisapatchToProps)(AuthScreen);