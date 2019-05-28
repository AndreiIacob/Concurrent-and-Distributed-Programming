import * as actionTypes from './actions';

const initialState = {
    id: "12093Hgdkajsh09182",
    version: 1,
    storageProtocolVersion: 1,
    title: "Test Cloud Safe Box",
    localImageName: "secret.png",
    seedHash: "1h23lkjh12l3kjh7823bhb598cwe1",
    shares: [
        "www.privateSky.com",
        "www.google.drive.com",
        "www.dropbox.com"
    ],
    records: {
        "Online Password": [
            {
                "id": "1n9u2ew109ms1s1s12s",
                "Title": "PrivateSky Password",
                "Username": "john_gollan@mail.com",
                "Password": "Beton123",
                "URL": "https://www.privatesky.com"
            }, 
            {
                "id": "asdf145324gfsd",
                "Title": "Google Password",
                "Username": "john_gollan@gmail.com",
                "Password": "Beton123",
                // "URL": "https://www.google.com"
            },
        ],
        "Credit Card": [
            {
                "id": "123niu1uhwo182whws",
                "Title": "Raiffeisen Debit Card",
                "Card Holder": "John Gollan",
                "Issuer": "Raiffeisen Bank",
                "Card Number": "5555 1203 1203 5555",
                "Expiry": "01.05.2025T00.00.00",
                "Card Security Code": "795"
            }
        ],
        "Notes": [
            {
                "id": "n1ui2h3w12h",
                "Title": "Love Letter",
                "Notes": "John Gollan loves Ivona Ciollan"
            }
        ],
        "Invoice": [
            {
                "id": "no1ilkhjhk1j2g129",
                "Title": "Bitcoin Transfer",
                "Amount": "5",
                "Print": {
                    "encryptionKey": "H!23UhJh19hjq0L901ba0sd801iu2",
                    "filename": "odt-IV-f4e54901b35621ac504274803112f5ce.dat"
                }
            }
        ]
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CSB_TITLE:
            return {
                ...state,
                csbName: action.title
            };
        
        default:
            return state;
    }

};
export default reducer;