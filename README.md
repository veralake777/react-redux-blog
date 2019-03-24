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

#### Rules of Reducers
- must return *any* value besides 'undefined'
- produces 'state', or data to be used inside of app
    - using only previous state and the action (reducers are pure!)
- Must not return reach 'out of itself' to decide what value to return
    - BAD `return document.querySelector(...)`
    - BAD `return axios.get(...)`
    - GOOD `return state + action`
- Should not mutate its input 'state' argument
    - mutate - change of contents of data
    - BAD `state[0] = newValue`
    - BAD `state.push(...)`
    - this is not ok because of how data is stored in memory not the actual values
    - Redux snippet from source code for combineReducer:
    ```
    let hasChanged = false
    const nextState = {}
    for (let i=0; i < finalReducerKeys.length; i++) {
        const key = final ReducerKeys[i]
        const reducer = finalReducers[key]
        const previousStateForKey = state[key]
        const nextStateForKey = reducer(previousStateForKey, action)
        if (typeof nextStateForKey = 'undefined') {
            const errorMessage = getUndefinedStateErrorMessage(key, action)
            throw error Error(errorMessage)
        }
        nextState[key] = nextStateForKey

        /*
        * this is the part that gets the next state or not
        * if this is still false then the function returns there is no change
        * therefore returning old state
        /*

        hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    return hasChanged ? nextState : state
    ```
- Syntax best practice:
```
// have default value for selectedItem to avoid undefined error
const selectedItemReducer = (selectedItem = null, action) => {
    // if correct return payload
    if(action.type === 'SELECTED_ITEM') {
        return action.payload
    }

    // else return deault value
    return selectedItem
}
```
|REDUCER                     | BAD                | GOOD                                             |
|--------------------------- |:------------------:|:------------------------------------------------:|
| Remove el from array       | state.pop()        | state.filter(element=>element!=='hi')            |
| Adding an el to array      | state.push('hi)    | [...state, 'hi']                                 |
| Replacing an el in array   | state[0]='hi'      | state.map(el=> el==='hi' ? 'bye':el)             |
| Updating a property Obj    | state.name = "Sam" | {...state, name: 'Sam'}                          |
| Adding a property to Obj   | state.age = 30     | {...state, age:30}                               |
|Removing a property from Obj| delete state.name  | {...state, age:undefined} || _.omit(state, 'age')|

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
**From Source Code**
This is the function that redux thunk is using to help with async
```
function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action {
        if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
        }
        return next(action);
    };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
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
