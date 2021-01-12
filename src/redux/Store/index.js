import { createStore } from 'redux';
import  rootReducer from '../reducer/index';

const Store = createStore(rootReducer);

export default Store;