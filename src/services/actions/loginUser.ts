// "use server"
import setAuthToken from "@/utils/setAuthToken";
import { FieldValues } from "react-hook-form";

export const loginUser = async (data: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        // cache: "no-cache"
        credentials: "include"
    });
    const userInfo = await res.json();

    if(userInfo?.data?.accessToken){
        setAuthToken(userInfo.data?.accessToken, {redirect: "/dashboard"});
    }

    return userInfo;
 
}