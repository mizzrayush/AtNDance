import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext({})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('default')

    useEffect(() => {
        const storedTheme = localStorage.getItem('atndance_theme') || 'default'
        setTheme(storedTheme)
        document.documentElement.setAttribute('data-theme', storedTheme)
    }, [])

    const changeTheme = (newTheme) => {
        setTheme(newTheme)
        localStorage.setItem('atndance_theme', newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
    }

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
