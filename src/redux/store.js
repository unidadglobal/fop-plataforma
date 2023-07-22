import { createStore, applyMiddleware, combineReducers } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { authReducer } from './reducers/auth.reducer'
import {
   relatedVideoReducer,
} from './reducers/videos.reducer'
import { selectedVideoReducer } from './reducers/videos.reducer'
import { noticiasReducer } from './reducers/noticias.reducer'
import { radioReducer } from './reducers/radio.reducer'
import { webinfoReducer } from './reducers/webinfo.reducer'
import { publicidadReducer } from './reducers/publicidad.reducer'
import { searchReducer } from './reducers/search.reducer'

const rootReducer = combineReducers({
   auth: authReducer,
   selectedVideo: selectedVideoReducer,
   relatedVideos: relatedVideoReducer,
   noticias: noticiasReducer,
   radio: radioReducer,
   publicidad: publicidadReducer,
   search: searchReducer,
   webinfo: webinfoReducer
})

const store = createStore(
   rootReducer,
   {},
   composeWithDevTools(applyMiddleware(thunk))
)

export default store