export const commonStyle = {
    wizardContent: {
        flexDirection: "row",
        width: "80%",
        height: 60
    },

    wizardStep: {
        height: 38,
        width: 38,
        borderRadius: 19
    },

    wizardStepText: {
        color: "#FFFFFF",
        paddingTop: 8,
        paddingLeft: 15
    },

    stepUncompleted: {
        backgroundColor: "#CCC"
    },
            
    stepCurrent: {
        backgroundColor: "#6b8ec6"
    },

    isCurrent: {
        position: "absolute",
        height: 52,
        width: 52,
        borderRadius: 26,
        backgroundColor: "#f7f8fc",
        borderWidth: 2,
        borderColor: "#6b8ec6",
        zIndex: -100,
        left: -7,
        top: -7
    }
}