import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// add task call
export const addTask = createAsyncThunk("addtask",async(obj)=>{
    const accesstoken = localStorage.getItem("accesstoken");
    try{
        const data = await axios.post("https://tick-tick-api.vercel.app/addData",obj,{
            headers:{
                Authorization:"Bearer " +accesstoken
            }
        })
        return data.data
    }
    catch(err){
        console.log("Add task error "+err);
    }
})

// get data call
export const getTask = createAsyncThunk("gettask",async()=>{
    const accesstoken = localStorage.getItem("accesstoken");
    try{
        const data = await axios.get("https://tick-tick-api.vercel.app/getdata",{
            headers:{
                Authorization:"Bearer " +accesstoken
            }
        })
        return data.data
    }
    catch(err){
        console.log("Add task error "+err);
    }
})

// update api call
export const updateTask = createAsyncThunk("updatetask",async(obj)=>{
    const accesstoken = localStorage.getItem("accesstoken");
    try{
        const data = await axios.post("https://tick-tick-api.vercel.app/updatedata",obj,{
            headers:{
                Authorization:"Bearer " +accesstoken
            }
        })
        return data.data
    }
    catch(err){
        console.log("Add task error "+err);
    }
})

// delete api call
export const deleteTask = createAsyncThunk("deletetask",async(i)=>{
    const accesstoken = localStorage.getItem("accesstoken");
    try{
        const data = await axios.post("https://tick-tick-api.vercel.app/delete",{in_id:i},{
            headers:{
                Authorization:"Bearer " +accesstoken
            }
        })
        return data.data
    }
    catch(err){
        console.log("Add task error "+err);
    }
})


const initialState={
    addtaskState:{
        isLoading:false,
        data:null,
        isError:false
    },
    getData:{
        isLoading:false,
        data:null,
        isError:false
    },
    updateData:
    {
        isLoading:false,
        data:null,
        isError:false
    },
    deleteData:{
        isLoading:false,
        data:null,
        isError:false
    }
}

const redSlice = createSlice({
    name:"ticktick",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // add task
        builder.addCase(addTask.pending,(state)=>{
            state.addtaskState.isLoading = true,
            state.addtaskState.isError = false
        }),
        builder.addCase(addTask.fulfilled,(state,action)=>{
            state.addtaskState.isLoading=false,
            state.addtaskState.data = action.payload,
            state.addtaskState.isError=false
        }),
        builder.addCase(addTask.rejected,(state)=>{
            state.addtaskState.isError=true
        }),

        // get data
        builder.addCase(getTask.pending,(state)=>{
            state.getData.isLoading = true,
            state.getData.isError = false
        }),
        builder.addCase(getTask.fulfilled,(state,action)=>{
            state.getData.isLoading=false,
            state.getData.data = action.payload,
            state.getData.isError=false
        }),
        builder.addCase(getTask.rejected,(state)=>{
            state.getData.isError=true
        }),

        // update
        builder.addCase(updateTask.pending,(state)=>{
            state.updateData.isLoading = true,
            state.updateData.isError = false
        }),
        builder.addCase(updateTask.fulfilled,(state,action)=>{
            state.updateData.isLoading=false,
            state.updateData.data = action.payload,
            state.updateData.isError=false
        }),
        builder.addCase(updateTask.rejected,(state)=>{
            state.updateData.isError=true
        }),

        // delete
        builder.addCase(deleteTask.pending,(state)=>{
            state.deleteData.isLoading = true,
            state.deleteData.isError = false
        }),
        builder.addCase(deleteTask.fulfilled,(state,action)=>{
            state.deleteData.isLoading=false,
            state.deleteData.data = action.payload,
            state.deleteData.isError=false
        }),
        builder.addCase(deleteTask.rejected,(state)=>{
            state.deleteData.isError=true
        })
    }
})

export default redSlice.reducer