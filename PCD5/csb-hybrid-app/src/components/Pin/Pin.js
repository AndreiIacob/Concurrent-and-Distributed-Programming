import React from 'react';
import {View, Text, TextInput, Image, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AddPin from "../LandingPage/Wizard/WizardPages/AddPin";
import InteractionsManager from "../../services/InteractionsManager";
import PinManager from "../../services/PinManager";
import TextInputWithValidation from "../Validators/TextInputWithValidation/TextInputWithValidation";

let InteractService = InteractionsManager.getInstance();

export default class Pin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pin: '',
            forgottenPin: false,
            seed: "",
            continueIsDisabled: false,
        }
    }

    updatePin = (value) => {
        this.setState({pin: value});
    };
    submitSeed = () => {
        this.setState({
            forgottenPin: true,
            forgotPinState: "changePin"
        });
    };

    forgetPin() {
        this.setState({
            forgottenPin: true,
            forgotPinState: "enterSeed"
        });
    }

    setPinHandler(pin) {
        this.setState({
            continueIsDisabled: false,
            pin: pin
        })
    }

    handleKeyPress(keyName) {
        if (keyName === "Enter") {
            this.props.submitPin(this.state.pin);
        }
    }

    changePin() {
        InteractService.resetPin(this.state.seed, this.state.pin, (err) => {
            if (err) {
                this.setState({forgotPinState: "enterSeed", continueIsDisabled: true, pin:""}, () => {
                    this.seedTextInput.invalidateInput(err.message);
                });
            }
            else {
                PinManager.managePin(this.state.pin);

                this.setState({
                    forgottenPin: true,
                    forgotPinState: "pinUpdated"
                });
            }
        });
    }


    render() {
        let errMessage = this.props.pinErrMessage ?
            <Text style={style.ErrorMessage}>{this.props.pinErrMessage}</Text> : null;

        let pinView = null;


        switch (this.state.forgotPinState) {
            case undefined:
                pinView =
                    <View style={[style.PinContainer,this.props.pinErrMessage?style.PinContainerWithError:null]}>
                        <Text style={style.PinTitle}>Enter your PIN to continue</Text>
                        <View style={{marginBottom: -10}}>
                            <LinearGradient
                                style={{backgroundColor: '#FFF'}}
                                locations={[0, 0.25, 0.25]}
                                colors={['rgba(220, 220, 220, 0.25)', 'rgba(220, 220, 220, 0.005)', '#FFF']}>
                                <TextInput
                                    onKeyPress={(evt) => {
                                        this.handleKeyPress(evt.key)
                                    }}
                                    style={[style.PinInput, {borderColor: this.props.pinErrMessage ? "red" : "#DDD"}]}
                                    value={this.state.pin}
                                    onChangeText={this.updatePin}
                                    secureTextEntry={true}
                                    keyboardType={"number-pad"}/>
                                <Image
                                    style={style.LockIcon}
                                    source={require('../../assets/global/images/key.png')}/>
                            </LinearGradient>
                        </View>
                        {errMessage}
                        <View style={style.ForgotPin}>

                            <TouchableOpacity onPressOut={() => this.forgetPin()}>
                                <Text>Forget your PIN?</Text>
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity onPressOut={() => this.props.submitPin(this.state.pin)}>
                            <View style={style.PinCheckPINButton}>
                                <Text style={{color: '#fff'}}>Go</Text>
                            </View>
                        </TouchableOpacity>
                    </View>;
                break;
            case "enterSeed":
                pinView = <View style={[style.ForgotPinContainer, {height: 250}]}>
                    <Text style={style.PinTitle}>Enter your recovery phrase to continue</Text>

                    <TextInputWithValidation
                        ref={(ref) => {
                            this.seedTextInput = ref;
                        }}
                        style={style.PinInput}
                        value={this.state.seed}
                        onChangeText={(seedValue) => {
                            this.setState({seed: seedValue, continueIsDisabled: false,})
                        }}
                    />

                    <TouchableOpacity
                        style={{opacity: this.state.continueIsDisabled || this.state.seed.length === 0 ? 0.6 : 1}}
                        disabled={this.state.continueIsDisabled}
                        onPressOut={() => this.submitSeed()}>
                        <View style={style.PinCheckPINButton}>
                            <Text style={{color: '#fff'}}>Next</Text>
                        </View>
                    </TouchableOpacity>
                </View>;
                break;

            case "changePin":
                pinView = <View style={style.ForgotPinContainer}>
                    <View style={{height: 250}}>
                        <AddPin
                            title={"Reset your PIN"}
                            breakpoint={this.props.breakpoint}
                            setPin={(pin) => {
                                this.setPinHandler(pin)
                            }}
                            disableContinue={(value) => this.setState({continueIsDisabled: true})}
                        />
                    </View>

                    <TouchableOpacity
                        style={{opacity: this.state.continueIsDisabled || this.state.pin.length === 0 ? 0.6 : 1}}
                        disabled={this.state.continueIsDisabled} onPressOut={() => this.changePin()}>
                        <View style={style.PinCheckPINButton}>
                            <Text style={{color: '#fff'}}>Change PIN</Text>
                        </View>
                    </TouchableOpacity>
                </View>;
                break;
            case "pinUpdated":
                pinView = <View style={style.ForgotPinContainer}>
                    <Text style={style.PinTitle}>PIN successfully changed</Text>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image style={{width: 64, height: 64}}
                               source={require("../../assets/global/images/success.png")}/>
                    </View>

                    <TouchableOpacity disabled={this.state.continueIsDisabled}
                                      onPressOut={() => this.props.submitPin(this.state.pin)}>
                        <View style={style.PinCheckPINButton}>
                            <Text style={{color: '#fff'}}>Go to Dashboard</Text>
                        </View>
                    </TouchableOpacity>
                </View>;
                break;
        }


        return (
            <View style={style.PinOverlay}>
                {pinView}
            </View>
        )
    }
}

const style = StyleSheet.create({
    PinOverlay: {
        width: "100%",
        height: "100%",
        position: "fixed",
        backgroundColor: "#777777CC",
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000
    },

    PinContainer: {
        backgroundColor: "#FFF",
        borderColor: "#DDD",
        borderWidth: 1,
        borderRadius: 3,
        zIndex: 10000,
        width: 350,
        height: 250,
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowColor: '#333',
        shadowOffset: {height: 0, width: 0},
        padding: 30,
        justifyContent: 'space-between'
    },
    PinContainerWithError:{
        height: 270,
    },
    PinCheckPINButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#51B122',
        borderRadius: 5,
        borderColor: "#DDD",
        borderWidth: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    PinTitle: {
        fontSize: 17,
        color: "#444",
        textAlign: "center",
        marginBottom: 30
    },

    PinInput: {
        width: "100%",
        height: 48,
        borderRadius: 5,
        backgroundColor: 'transparent',
        borderColor: '#D2D2D2',
        borderWidth: 1,
        fontSize: 30
    },

    LockIcon: {
        width: 32,
        height: 32,
        position: "absolute",
        right: 5,
        marginTop: 7
    },
    ErrorMessage: {
        color: "red",
        marginTop:15,
        marginBottom:5
    },
    ForgotPin: {
        marginTop: 10,
        marginBottom: 10
    },
    ForgotPinContainer: {
        backgroundColor: "#FFF",
        borderColor: "#DDD",
        borderWidth: 1,
        borderRadius: 3,
        zIndex: 10000,
        width: 450,
        height: 350,
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowColor: '#333',
        shadowOffset: {height: 0, width: 0},
        padding: 30,
        justifyContent: 'space-between'
    }
});
