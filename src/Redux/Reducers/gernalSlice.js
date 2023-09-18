import { createSlice } from '@reduxjs/toolkit';

const gernalSlice = createSlice(
    {
        name: 'gernal',
        initialState: {
            loader: false,
            providerDetails:{
                first_name:"",
                last_name:"",
                bio:"",
                description:"",
                email:"",
                password:"",
                file:"",
                specialities:[],
                education:[],
                experience:[]
            },
            completeUser:{}
        },
        reducers: {
            setLoader: (state, action) => {
                state.loader = action.payload;
            },
            setProviderDetails:(state,action)=>{
                state.providerDetails = action.payload
            },
            setCompleteDoctor:(state,action)=>{
                state.completeUser = action.payload
            }
        },
    }
);

export const { setLoader , setProviderDetails,setCompleteDoctor} = gernalSlice.actions;
export const gernalReducer = gernalSlice.reducer;
