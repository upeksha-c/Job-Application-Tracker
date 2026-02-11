import { createContext, useState, useEffect } from "react";
import { fetchUserInfo } from "../components/fetchUserInfoService.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const storedUser = async () => {
                setUser(await fetchUserInfo());
            }
            storedUser();
        } catch (error) {
            console.error("Error fetching user info:", error);
            setUser(null);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}