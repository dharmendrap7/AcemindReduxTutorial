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

import {createStore} from "redux";

const initialState={
    result : 1,
    lastValues : [],
    userName :"Marry"
};

const reducer = (state = initialState, action)=>{ // Here state will recieve the values from initialState if state is null, otherwise it will recieve the data from state if state is having any data.
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



const store = createStore(reducer); // second parameter is required for sending state

store.subscribe(()=> {
    console.log("StoreUpdated: ", store.getState());
});

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
