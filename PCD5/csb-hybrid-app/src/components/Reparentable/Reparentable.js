import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**This component is working only for web application**/
const store = {};

function getMountNode(uid) {
    if (!store[uid]) {
        store[uid] = {
            mountNode: document.createElement('div'),
            inUse: true
        };
    } else {
        store[uid].inUse = true;
    }

    return store[uid].mountNode;
}

function removeMountNode(uid) {
    const record = store[uid];

    record.inUse = false;

    setTimeout(() => {
        if (!store[uid].inUse) {
            ReactDOM.unmountComponentAtNode(store[uid].mountNode);
            delete store[uid];
        }
    }, 0);
}


export default class Reparentable extends Component {

    componentDidMount() {
        const mountNode = getMountNode(this.props.uid);
        this.el.appendChild(mountNode);

        this.renderChildrenIntoNode(mountNode);
    }

    componentDidUpdate() {
        const mountNode = getMountNode(this.props.uid);
        this.renderChildrenIntoNode(mountNode);
    }

    componentWillUnmount() {
        removeMountNode(this.props.uid);
    }

    renderChildrenIntoNode(node) {
        // We use this instead of `render` because this also handles
        // passing the context
        ReactDOM.unstable_renderSubtreeIntoContainer(this, this.props.children, node);
    }

    render() {
        return <div ref={(el) => { this.el = el; }}></div>;
    }}