function CustomWebView(webView) {

    let callbacks = {};

    this.webView = webView;
    this.postMessage = webView.postMessage;
    this.addEventListener = function (event, callback) {

        if (!callbacks[event]) {
            callbacks[event] = [];
        }
        if(callbacks[event].indexOf(callback) === -1){
            callbacks[event].push(callback);
        }
    };

    this.removeEventListener = function (event, callback) {
        if (callbacks[event]) {
            let index = callbacks[event].indexOf(callback);
            if (index > -1) {
                callbacks[event].splice(index, 1);
            }
        }
    };

    this.triggerEvent = function (eventName, eventData) {
        if (callbacks[eventName]) {
            for (let i = 0; i < callbacks[eventName].length; i++) {
                callbacks[eventName][i](eventData);
            }
        }
    };
}

export default CustomWebView;