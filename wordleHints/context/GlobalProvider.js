//This was my Global Context that I used pretty frequently, it was made with bits and parts from a lot of coders I found across the internet. We can use it if we wanna save some time.

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useMemo,
} from "react"
import { getCurrentUser, account, signOut } from "../lib/appwrite"

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [isLogged, setIsLogged] = useState(false)
	const [loading, setLoading] = useState(true)
	const [narration, setNarration] = useState(null) // Added state for narration

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const sessions = await account.listSessions()
				if (sessions.total > 0) {
					const currentUser = await getCurrentUser()
					if (currentUser) {
						setUser(currentUser)
						setIsLogged(true)
					} else {
						await signOut()
					}
				}
			} catch (error) {
				console.error("Error fetching user:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchUser()
	}, [])

	const value = useMemo(
		() => ({
			user,
			setUser,
			isLogged,
			setIsLogged,
			loading,
			narration,
			setNarration,
		}),
		[user, isLogged, loading, narration]
	)

	return (
		<GlobalContext.Provider value={value}>
			{children}
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => useContext(GlobalContext)
