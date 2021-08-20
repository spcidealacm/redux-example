import { createStore } from "redux";

const initialState = {}

function reducer(initialState, action) {}

const store = createStore(reducer) // core store

store.subscribe(()=>{

})

store.dispatch(action)