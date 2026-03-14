import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";

type AuhProviderProps = {
    children: React.ReactNode,
}

type User = {
    email: string | undefined,
    password: string | undefined
}

type authContextType = {
    registerUser: (newUser: User) => void,
    user: User[],
    currentUser: User | null,
    getCurrentUser: (currentUser: User) => void,
    logout: () => void,

}
const AuthContext = createContext<authContextType | null>(null);
export const AuthProvider = ({ children }: AuhProviderProps) => {

    const [user, setUser] = useState<User[]>(() => {
        const hasUser = localStorage.getItem("user");
        return hasUser ? JSON.parse(hasUser) : []
    })

    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        const stored = localStorage.getItem("currentUser");
        return stored ? JSON.parse(stored) : null;
    })

    const registerUser = (newUser: User) => {
        const addUser = [...user, newUser]
        setUser(addUser)
        localStorage.setItem('user', JSON.stringify(addUser))
    }

    const getCurrentUser = (user: User) => {
        setCurrentUser(user)
        localStorage.setItem('currentUser', JSON.stringify(user))
    }

    const logout = () => {
        localStorage.removeItem("currentUser");
        setCurrentUser(null)
    }

    return (
        <AuthContext.Provider value={{ registerUser, user, getCurrentUser, currentUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const authContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("AuthContext must be used inside AuthProvider");
    return context;
}