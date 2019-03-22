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
[smeantic-ui](https://cdnjs.com/libraries/semantic-ui)
- `https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css`
## To run
npm install
npm start

## Skills Learned
### Redux
#### Redux Cycle
1. To change state of App --> **Action Creator** -->
- action creator must return plain JS objects with a type property
    - axios + async, await causes ^^this^^ error in the browser
    - bc of babel transpiling ot ES2015
    - solution => redux-thunk middleware
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
 **Produces an... -->** <br/>
2. Action --> Gets Fed to... --> <br/>
3. dispatch --> middleware --> Forwards an action to... --><br/>
- **Middleware in Redux**
    - Function that gets called with every action dispatched
    - ability to STOP, MODIFY, or mess around with actions
    - most popular usage ==> *asnyc actions*
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
**Creates new...** --> <br/>
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
<hr />

#### General Data Loading with Redux
- Components are generally responsible for fetching data they need
  by calling an action creator
    - Component gets rendered
    - Component's *componentDidMount* lifecycle method called
    - Call action creator from *componentDidMount*
- Action creators are responisble for making API requests
    - redux-thunk works here
    - Action creator runs code to make API request
    - API responds with data
    - Action creator returns 'action' with fetched data on the 'payload' property
- Fetched data shows in a component with new state in redux store, `mapStateToProps`
    - Some reducer sees the action, returns the data off the 'payload'
    - Because of new state object, redux/react-redux cause rerender
### React-Redux
- integration between react and redux
### Redux-Thunk
- middleware to help make requests in a redux application
- most popular use *async funcitons*
```            
dispatch -->   Action Creator Obj or Function
                            /\
                            /  \
                        Obj    Fxn
                        /        \
            to reducers           called with dispatch and getState -->
                                    manually dispatch fxn when request is finished -->
                                        New Action! --> back to top dispatch with returned request
```
#### Rules
| Normal Rules for Actions                         | Redux Thunk Rules                                      |
| ------------------------------------------------ |:-------------------------------------------------------|
| Action creators **must** return action objects   | Action creators can return action objects or Functions!|
| Actions must have a type property                | If Obj gets returns, must have a type                  |    
| Actions can *optionally* have a 'payload'        | If an obj type gets returned, payload is optional      |

#### Shorthand Syntax with Redux Thunk
```

```
