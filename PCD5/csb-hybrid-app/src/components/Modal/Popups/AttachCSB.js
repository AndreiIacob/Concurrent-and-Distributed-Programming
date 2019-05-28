import React from 'react';
import LoaderWrapper from "../../../hoc/LoaderWrapper/LoaderWrapper";
import Modal from "../Modal";
import {View} from "react-native";
import RestoreCloudSafeBox from "../../LandingPage/Restore/RestoreCloudSafeBox";
import NewCSB from "../../LandingPage/Wizard/WizardPages/NewCSB";

export default class AttachCSB extends React.Component {

    state = {
        isLoading: true
    };

    onCompleted(){
        this.props.closeModal(true);
        this.props.history.push(this.props.location.pathname);
    }

    render() {
        return (
            <Modal title="Attach CSB"
                   style={{width: "90%", height: "90%"}}
                   onClose={() => {
                       this.props.closeModal()
                   }}
            >
                <LoaderWrapper isLoaded={this.state.isLoading} modalLoader={true}>
                    <View style={{
                        height: "100%",
                        minHeight: 400,
                        width: "100%"
                    }}>

                        <RestoreCloudSafeBox csbsPath = {this.props.csbsPath} onCompleted={()=>this.onCompleted()} isAttach = {true}  existingCSBNames={this.props.safeBoxes.map(safeBox => {
                            return safeBox.name;
                        })}/>

                    </View>
                </LoaderWrapper></Modal>)
    }
}
