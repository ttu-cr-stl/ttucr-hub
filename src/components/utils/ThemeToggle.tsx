'use client'

import { useTheme } from "next-themes"
import { Moon, Sun } from "react-feather"
import { SettingsItem } from "../pages/settings/SettingsItem"

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()

    return (
        <SettingsItem onClick={() => {theme === "light" ? setTheme("dark") : setTheme("light")}}>
            <span>Dark Mode</span>
            <div className="flex items-center justify-center size-10 rounded-xl bg-black text-white">
                {theme === "light" ? <Moon /> : <Sun />}
            </div>
        </SettingsItem>
    )
}