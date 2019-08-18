import React from 'react'

import {createAppContainer, createStackNavigator} from 'react-navigation'
import HomeScreen from './src/HomeScreen'
import FaceScreen from './src/FaceScreen'

const App = createAppContainer(createStackNavigator({
  Home: {screen: HomeScreen},
  Face: {screen: FaceScreen},
}, {
  initialRouteName: 'Face',
}))

export default App
