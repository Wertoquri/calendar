import {configureStore} from "@reduxjs/toolkit"
import AuthReducer from "./AuthReducer.js"
import EventsReducer from "./EventsReducer.js"
import logger from "redux-logger"


export default configureStore({
    reducer: {
        auth: AuthReducer,
        events: EventsReducer,
    },
    middleware: (def) => def().concat(logger)

})