/*
* catch action being dispatch from FETCH_USER
* userReducer needs to maintain an array of users
* add the reducer to reducers/index.js
* make data available to UserHeader 
*/

export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_USER':
            // add element/s to the state array
            // best practices is this way!
            return [...state, action.payload];
        default:
            return state;
    }
}