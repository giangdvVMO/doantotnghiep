import { createContext, useState } from "react"

const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(undefined);
    const [token, setToken] = useState(null);
    const changeUser = (user) => {
        setUser((prev) => { return { ...user } });
    }
    const changeToken = (token) => {
        setToken(token);
    }
    return (
        <UserContext.Provider value={{ user, changeUser, token, changeToken }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext };