import { configureStore } from "@reduxjs/toolkit"
import taskSlice from "./Featureslice"

const Store = configureStore({
    reducer:{
        addlist:taskSlice
    }
})

export default Store