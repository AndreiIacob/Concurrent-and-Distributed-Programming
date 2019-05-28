const PIN_TIMEOUT = 60 * 60 * 1000;//one hour


class PinManager {

    constructor(timeout) {
        this.timeout = timeout;
    }

    managePin(pin) {
        this.pin = pin;
        this.startCountDown();
    }

    setDefaultPin(defaultPin){
        let updateLocalStorageForName = require('../store/actions').updateLocalStorageForName;
        updateLocalStorageForName('local-storage-default-pin', defaultPin);
        this.managePin(defaultPin);
    }

    invalidatePin(){
        delete this.pin;
    }

    startCountDown() {
        setTimeout(() => {
            delete this.pin;
        }, this.timeout);
    }

    hasPin() {
        return this.pin !== undefined;
    }

    getPin() {
        return this.pin.toString();
    }

    setSubscriber(subscriber) {
        this.subscriber = subscriber;
    }

    getSubscriber() {
        return this.subscriber;
    }

    showModalPin(message, callback) {

        if (this.hasPin()) {
            callback(this.getPin());
        }
        else {
            let checkPin = (_pin) => {
                this.managePin(_pin);
                callback(_pin);
            };
            let subscriber = this.getSubscriber();
            subscriber({type:"access_denied", message:message}, checkPin);
        }
    }

    blockAccess(message) {
        let subscriber = this.getSubscriber();
        subscriber({type:"unauthorized_access", message:message});
    }

}

export default new PinManager(PIN_TIMEOUT);
