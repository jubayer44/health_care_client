"use server"

import { IUserLoginData } from "@/app/login/page";

export const loginUser = async (data: IUserLoginData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        cache: "no-cache"
    });
    const userInfo = await res.json()
    return userInfo;
 
}