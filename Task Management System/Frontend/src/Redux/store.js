import UserReducer from './slices/userSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    user: UserReducer
})

const persistConfig = {
    key: 'task',
    storage,
    version: 1

}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (defaultMiddleware) => defaultMiddleware({ serializableCheck: false })
})


const persistor = persistStore(store)
export { store, persistor }