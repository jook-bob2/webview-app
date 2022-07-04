import React, { useEffect, useState } from 'react'
import { BackHandler, Text, View } from 'react-native'
import WebView, { WebViewNavigation } from 'react-native-webview'
import { WEB_URL } from '../../env.json'

interface Props {
	handleClose: () => void
}

export default function EBlabsWebview({ handleClose }: Props) {
	const [webview, setWebview] = useState<WebView>()
	const [navState, setNavState] = useState<WebViewNavigation>()

	useEffect(() => {
		const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			console.log('navstate', navState)
			if (navState.url !== WEB_URL) webview.goBack()
			else handleClose()

			return true
		})
		return () => backHandler.remove()
	}, [navState])

	useEffect(() => {
		if (webview && webview.clearCache) webview.clearCache(true)
	}, [webview])

	return (
		<WebView
			style={{ flex: 1 }}
			pullToRefreshEnabled={true}
			ref={setWebview}
			startInLoadingState={true}
			allowsBackForwardNavigationGestures={true}
			renderLoading={() => (
				<View>
					<Text>로딩중입니다.</Text>
				</View>
			)}
			source={{ uri: WEB_URL }}
			mixedContentMode={'compatibility'}
			originWhitelist={['https://*', 'http://*']}
			// useWebKit={true}
			overScrollMode={'never'}
			onNavigationStateChange={setNavState}
			// injectedJavaScript={`
			// 		(function() {
			// 			function wrap(fn) {
			// 				return function wrapper() {
			// 					var res = fn.apply(this, arguments);
			// 					window.ReactNativeWebView.postMessage(window.location.href);
			// 					return res;
			// 				}
			// 			}
			// 			history.pushState = wrap(history.pushState);
			// 			history.replaceState = wrap(history.replaceState);
			// 			window.addEventListener('popstate', function() {
			// 				window.ReactNativeWebView.postMessage(window.location.href);
			// 			});
			// 		})();
			// 		true;
			// 	`}
			// onMessage={(event) => {
			// 	const url = event.nativeEvent.data
			// 	// console.log('url =>', url)
			// 	// console.log('weburl ', WEB_URL)
			// 	// if (url === WEB_URL) setGoBackAble(false)
			// 	// else setGoBackAble(true)

			// 	console.log('onMessage', event.nativeEvent.data)
			// }}
		/>
	)
}
