## Purpose of App
The purpose of this app is to ensure that I **absolutely** understand:
- the purpose of reducers
- making API requests with Redux
- the purpose of redux-thunk

*This app is not intended to showcase how pretty I can make it.* 

## Tools used
[Node.js](https://nodejs.org/en/download/)<br/>
[create-react-app](https://github.com/facebook/create-react-app)<br/>
[React](https://reactjs.org/docs/getting-started.html)<br/>
[Redux](https://redux.js.org/)<br/>
[React-Redux](https://react-redux.js.org/)<br/>
[Redux-Thunk](https://github.com/reduxjs/redux-thunk)<br/>
[Visual Studio](https://code.visualstudio.com/download)<br/>
[JSON Placeholder API](jsonplaceholer.typicode.com/)

## To run
npm install
npm start

## Skills Learned
### Redux Cycle
1. To change state of App --> **Action Creator** -->
```
const createAction() = (x, y) => {
   return {
      type: 'CREATE_ACTION',
      payload: {
         xName: x,
         yName: y 

         OR just
         x, y
      }
   }
}
```
 Produces an... --> 
2. Action --> Gets Fed to... --> 
3. dispatch --> Forwards an action to... -->
4. Reducers -->
```
const reducerName = (oldInfo = [], action) => {
   if(action.type === 'ACTION_NAME') {
      // we care about this action
      // ...oldInfo copied and added to action.payload
         // creates a brand new array
         // oldInfo.push(action.payload) only adds to an existing array
            // NEVER USE THIS === BAD DATA
      return [...oldInfo, action.payload]
   };

   // we dont care about this action
   return oldInfo;
}
```
Creates new... --> 
5. State --> Wait until need to update state again (newAction)
<hr />

6. Store = actions and reducers
```
const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
   name1: name1,
   name2: name2,
   name3: name3
})

const store = createStore(ourDepartments);

// call action
const action = createAction('x', 'y');

store.dispatch(action);

// get state
store.getState(); 
```
### React-Redux
- integration between react and redux
### Redux-Thunk
- middleware to help make requests in a redux application