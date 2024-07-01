import { Stack } from "expo-router"
import { GlobalProvider } from "./context/GlobalContext"

//This is basically the same as App.js in a React JSX project, there are many _layouts that will be used across the app, but this one is the main one.
const RootLayout = () => {
	return (
		<GlobalProvider>
			<Stack
				screenOptions={{
					headerShown: false,
					animation: "fade",
					animationDuration: 1000,
				}}
			>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen
					name="search/[query]"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="screens/story-detail"
					options={{ headerShown: true, title: "Story Detail" }}
				/>
			</Stack>
		</GlobalProvider>
	)
}

export default RootLayout
