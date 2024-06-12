import { createContext, useContext, useReducer } from "react"
import { ThemeReducer } from "./reducer/Theme.reducer"
import { TOGGLE_THEME } from "./ActionType"

const initialState = {
    theme: 'light'
}

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ThemeReducer, initialState);

    const toggleTheme = (val) => {
        console.log(val);

        const Newtheme = val === 'light' ? 'dark' : 'light';

        dispatch({ type: TOGGLE_THEME, payload: Newtheme })
    }

    return (
        <ThemeContext.Provider
            value={{ ...state, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )


}