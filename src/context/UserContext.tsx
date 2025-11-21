
import { createContext, useEffect, useEffectEvent, useState } from "react";
import storageHelper from "../utils/storageHelper";
import baseService from "../api/baseService";
import secureStorageHelper from "../utils/secureStorageHelper";

//Context içerisinde olacak user özellikleri:
interface User {
    id: string;
    email: string;
}

//Buradaki AuthContextType globalde erişeceğim özellikler ve metotları tanımlar
interface AuthContextType {
    user: User | null;
    login: (email: string, token: string, id: string) => Promise<void>;
    logout: () => void;
    isLoginedIn: boolean;
    loading: boolean;
}
export type { User, AuthContextType };


export const userContext = createContext<AuthContextType | null>(null);


const UserProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isLoginedIn, setIsLoginedIn] = useState<boolean>(false);


    const login = async (email: string, token: string, id: string) => {

        setUser({
            id: id,
            email: email
        });
        setIsLoginedIn(true);
        setLoading(false);

        storageHelper.setItem("user", JSON.stringify({
            id: id,
            email: email
        }));

        secureStorageHelper.setItem("token", token);

    }

    const logout = () => {
        setUser(null);
        setIsLoginedIn(false);
        storageHelper.removeItem("user");
        secureStorageHelper.removeItem("token");
    }


    useEffect(() => {
        baseService.post("/check-auth")
            .then((response) => {
                setUser({
                    id: response.id,
                    email: response.email
                });
                setIsLoginedIn(true);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error during /check-auth:", error);
                setLoading(false);
            });
    }, [])



    return <userContext.Provider value={{ user, login, logout, isLoginedIn, loading }}>
        {children}
    </userContext.Provider>

}

export default UserProvider;

//User provider içerisindeki valuelar globalde componentlerin erişebileceği değerlerdir.