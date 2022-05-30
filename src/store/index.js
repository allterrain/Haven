import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import reducers from './reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    timeout: null,

},

persistedReducer = persistReducer(persistConfig, reducers);

export function configureStore() {

    const store = createStore(
        persistedReducer,
        applyMiddleware(ReduxThunk),
    ),
        persistor = persistStore(store);
    return { store, persistor };
}