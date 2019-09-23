// import React from "react";
// import {render} from "react-dom";

// import { User } from './components/User';
// import { Main } from './components/Main';

// class App extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             username: "Max"
//         };
//     }

//     changeUsername(newName) {
//         this.setState({
//             username: newName
//         });
//     }

//     render() {
//         return (
//             <div className="container">
//                 <Main changeUsername={this.changeUsername.bind(this)}/>
//                 <User username={this.state.username}/>
//             </div>
//         );
//     }
// }

// render(<App />, window.document.getElementById('app'));

import {createStore, combineReducers, applyMiddleware} from "redux";
import {createLogger} from "redux-logger";

// const initialState={
//     result : 1,
//     lastValues : [],
//     userName :"Marry"
// };

const mathReducer = (state = { // defining here it self with initial values
    result : 1,
    lastValues : [],
    userName :"Marry"
}, action)=>{ // Here state will recieve the values from initialState if state is null, otherwise it will recieve the data from state if state is having any data.
switch(action.type){
    case "ADD": 
    state = {
        ...state,
        result : state.result + action.payload,
        lastValues : [...state.lastValues, action.payload]
    }
    break;
    case "SUBTRACT" : 
    state ={
        ...state,
        result: state.result - action.payload,
        lastValues : [...state.lastValues, action.payload]
    } 
    break;
}
return state;
};

const userReducer = (state = { // defining here it self with initial values
    name : "Marry",
    age : 27    
}, action)=>{ // Here state will recieve the values from initialState if state is null, otherwise it will recieve the data from state if state is having any data.
switch(action.type){
    case "SET_NAME": 
    state = {
        ...state,
        name : action.payload
    }
    break;
    case "SET_AGE" : 
    state ={
        ...state,
        age: action.payload
    } 
    break;
}
return state;
};

const myLogger = (store)=>(next)=>(action)=>{
    console.log("myLogger: ", action);
    next(action);
}
//Here this is custome middleware which can be later on as other predefined middleware we will be using
// It will be called before the store has changed. So as true middleware will be called before store updation.


const store = createStore(
    combineReducers({mathReducer, userReducer}),
    {},
    applyMiddleware(myLogger, createLogger())
); //this is being used as key value pair as mathReducer: mathReducer, but because of ES6 syntak it can be shotened as mathReducer. Here two different states are being used as by mathReducer uses math State and userReducer uses user State
// Here the second parameter for createStore is to pass initial state which can be passed by reducer which has their own initial state.
//logger is used from redux-logger which logs the actions.

//So we are having one global state which has sub state

store.subscribe(()=> {
    console.log("StoreUpdated: ", store.getState());
});

// The order the dispatch is being used...the same order the state will change

store.dispatch({
    type: "ADD",
    payload: 100
});

store.dispatch({
    type: "ADD",
    payload: 50
});

store.dispatch({
    type: "SUBTRACT",
    payload: 25
});

store.dispatch({
    type: "SET_AGE",
    payload: 25
});


