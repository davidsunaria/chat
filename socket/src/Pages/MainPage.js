import { useState } from "react";
import { Chat } from "./Chat";
import { LoginPage } from "./LoginPage";
import { useStoreActions, useStoreState } from "easy-peasy";



export const MainPage=()=>{

    const isLogin = useStoreState((state) => state.conversation.isLogin);
    const logout = useStoreActions((action) => action.conversation.logOut);
    console.log("isLogin",isLogin)

    const logOut =async()=>{
        console.log("hi logout")
        let payload=    {
            "device_token": ""
        }
        await logout(payload)
    }

    return(

        <>
      {!isLogin?<LoginPage/>:<><button className="btn btn-lg btn-info mt-5" onClick={()=>logOut()}>LogOut</button> <Chat/> </>} 
    
        </>

    )
}