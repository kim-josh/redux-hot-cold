import {createStore} from 'redux';

import gameReducer from './reducer';

export default createStore(gameReducer);