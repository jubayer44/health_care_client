import { authKey } from "@/constants/authKey"
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "@/utils/local-storage"

export const storeUserInfo = ({accessToken}: {accessToken: string})=> {
    return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
    const token = getFromLocalStorage(authKey);
    if(token){
        const decodedData: any = decodedToken(token);
        return {
            ...decodedData,
            role: decodedData?.role?.toLowerCase()
        }
    }
};

export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(authKey);
    if(authToken){
        return !!authToken
    }
    return false;
};

export const removeUser = () => {
    return removeFromLocalStorage(authKey)
}