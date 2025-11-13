
import { createContext, useEffect, useEffectEvent, useState } from "react";
import storageHelper from "../utils/storageHelper";

//Context içerisinde olacak user özellikleri:
interface User {
    id: string;
    email: string;
}

//Buradaki AuthContextType globalde erişeceğim özellikler ve metotları tanımlar
interface AuthContextType {
    user: User | null;
    login: (email: string) => Promise<void>;
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


    const login = async (email: string) => {

        setUser({
            id: "1",
            email: email
        });
        setIsLoginedIn(true);
        setLoading(false);

        storageHelper.setItem("user", JSON.stringify({
            id: "1",
            email: email
        }));
        
    }

    const logout = () => {
        setUser(null);
        setIsLoginedIn(false);
        storageHelper.removeItem("user");
    }


    useEffect(() => {
  
        storageHelper.getItem("user")
            .then((storedUser) => {
                if (storedUser) {
                    let decodeUser = JSON.parse(storedUser);
                    setUser(decodeUser);
                    setIsLoginedIn(true);
                }
            })

    }, [])
    


    return <userContext.Provider value={{ user, login, logout, isLoginedIn, loading }}>
        {children}
    </userContext.Provider>

}

export default UserProvider;

//User provider içerisindeki valuelar globalde componentlerin erişebileceği değerlerdir.