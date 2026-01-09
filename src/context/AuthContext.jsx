import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check for existing guest session or supabase session
        const isGuest = localStorage.getItem('atndance_guest')
        if (isGuest) {
            setUser({ id: 'guest', email: 'guest@atndance.local', role: 'guest' })
        }
        setLoading(false)
    }, [])

    const loginAsGuest = () => {
        localStorage.setItem('atndance_guest', 'true')
        setUser({ id: 'guest', email: 'guest@atndance.local', role: 'guest' })
    }

    const logout = () => {
        localStorage.removeItem('atndance_guest')
        setUser(null)
    }

    const value = {
        user,
        loginAsGuest,
        logout,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
