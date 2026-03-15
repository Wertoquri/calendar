import {configureStore} from "@reduxjs/toolkit"
import AuthReducer from "./AuthReducer.js"
import EventsReducer from "./EventsReducer.js"


export default configureStore({
    reducer: {
        auth: AuthReducer,
        events: EventsReducer,
    }

})