import {Button, StyleSheet, Text, View} from 'react-native'
import * as React from 'react'
import {NavigationParams, NavigationScreenProp, NavigationState} from 'react-navigation'

interface HomeScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class HomeScreen extends React.Component<HomeScreenProps> {
  static navigationOptions = {
    title: 'You\'re home now',
  }

  render() {
    const {navigate} = this.props.navigation

    return (

      <View style={styles.container}>
        <Text style={styles.text}>Welcome to the Acne App... Bitches</Text>
        <Button title="Record your skin" onPress={() => navigate('Face')}/>
      </View>
    )
  }
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 25
  }
})
