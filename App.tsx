import EBlabsWebview from '@/screens/EBlabsWebview'
import React from 'react'
import { Alert, BackHandler, SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native'

export default function App() {
	const isDarkMode = useColorScheme() === 'dark'

	return (
		<>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={'#FFFFFF'} />
			<SafeAreaView style={styles.root}>
				<EBlabsWebview
					handleClose={() => {
						Alert.alert('앱 종료', '앱을 종료하시겠습니까?', [
							{
								text: '아니오',
								onPress: () => null,
							},
							{ text: '예', onPress: () => BackHandler.exitApp() },
						])
					}}
				/>
			</SafeAreaView>
		</>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
})
