import React from "react";
import Modal from "../Modal";
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import WebView from "WebView";
import InteractionsManager from '../../../services/InteractionsManager';
import LoaderWrapper from '../../../hoc/LoaderWrapper/LoaderWrapper';
let InteractService;
export default class AttachFilePopup extends React.Component {

    state = {
        csbAlias: "",
        fileWasAttached: false,
        isLoading: true,
        progress:1
    };

    componentDidMount() {
        InteractService=InteractionsManager.getInstance(this.webView, "fileUploader");
            InteractService.notifyWhenFilesWereSelected((fileNames) => {
                this.setState({
                    csbAlias:this.state.csbAlias.length === 0?fileNames[0]:this.state.csbAlias,
                    fileWasAttached: true
                })
            })
    }

    addFilesToCSB() {
        this.setState({
            isLoading: false
        });
        InteractService.addFilesToCSB(this.props.csbsPath, this.state.csbAlias, (progress)=>{
            this.setState({progress: parseInt(progress)});
        },(info) => {
            console.log(info);
            this.props.closeModal(true);
        })
    }

    render() {

        return (
            <Modal title="Attach file"
                onClose={() => {
                    this.props.closeModal()
                }}
            >
                <LoaderWrapper progress={this.state.progress} isLoaded={this.state.isLoading} modalLoader={true}>
                    <View style={{
                        minWidth: 400,
                        padding: 10
                    }}>
                        <Text>
                            <View style={{ width: "100%", flexDirection: "column" }}>
                                <View style={{ width: "100%", flexDirection: "row", flex: 1 }}>
                                    <Text style={{ alignSelf: 'flex-start', fontWeight: 'bold' }}> File alias</Text>
                                </View>

                                <View style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    flex: 1,
                                    borderColor: "#DDD",
                                    borderBottomWidth: 1,
                                    padding: 10
                                }}>
                                    <Text style={{ alignSelf: 'flex-start' }}>{this.props.csbsPath + "/"}</Text>
                                    <View style={{ width: "100%", alignSelf: "flex-end" }}>
                                        <TextInput style={{ borderWidth: 1, borderColor: '#CCC', margin: 0, padding: 0 }}
                                            value={this.state.csbAlias}
                                            onChangeText={(text) => this.setState({ csbAlias: text })} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: "100%", flexDirection: "column" }}>
                            </View>


                            <View style={{ width: "100%", flexDirection: "row", flex: 1 }}>
                                <Text style={{ alignSelf: 'flex-start', fontWeight: 'bold' }}> File</Text>
                            </View>

                            <View style={{
                                width: "100%",
                                flexDirection: "row",
                                flex: 1,
                                borderColor: "#DDD",
                                borderBottomWidth: 1,
                                padding: 10,
                                height: 100
                            }}>
                                <WebView
                                    ref={(webView) => {
                                        this.webView = webView;
                                    }}
                                    source={{ uri: require('../../../../public/apps/csb/fileUploader/fileUploader.html') }} />
                            </View>

                            <View style={styleSheet.FooterActions}>

                                <TouchableOpacity onPress={() => this.props.closeModal()} style={styleSheet.CloseButton}>
                                    <Text style={styleSheet.CloseButtonText}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity disabled={this.state.csbAlias.length === 0 && this.state.fileWasAttached === false}
                                    onPress={() => this.addFilesToCSB()}
                                    style={[styleSheet.EncryptFilesButton, { opacity: this.state.csbAlias.length && this.state.fileWasAttached ? 1 : 0.6 }]}>
                                    <Text style={styleSheet.EncryptFilesButtonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </Text>
                    </View>
                </LoaderWrapper>
            </Modal>
        );
    }
}

const styleSheet = StyleSheet.create({
    FooterActions: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "100%"
    },
    CloseButton: {
        padding: 8,
        backgroundColor: "#d3d3d3",
        borderColor: "#C5C5C5",
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
    },

    CloseButtonText: {
        color: "#333333",
    },
    EncryptFilesButton: {
        padding: 8,

        borderColor: "#4cae4c",
        borderWidth: 1,
        backgroundColor: "#5cb85c",
        borderRadius: 5,
        margin: 5
    },
    EncryptFilesButtonText: {
        color: "#FFFFFF",
    }
});
