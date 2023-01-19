import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import concertsReducer from "./reducers/concertsReducer"
import artistsReducer from "./reducers/artistReducer";
import filterArtistReducer from "./reducers/filterArtistReducer";

export const store = configureStore({
    reducer:{
        userReducer,
        concerts: concertsReducer,
        artistsReducer,
        filterArtistReducer
    }
})

