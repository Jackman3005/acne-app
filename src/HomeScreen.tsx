import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import * as React from 'react'
import {NavigationParams, NavigationScreenProp, NavigationState} from 'react-navigation'
import Face, {Spot} from './FaceComponent'
import PTButton from './ButtonComponent'

interface HomeScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  currentSpots: Spot[]
}

class HomeScreen extends React.Component<HomeScreenProps> {
  static navigationOptions = {
    title: 'You\'re home now',
  }

  render() {
    const {navigate} = this.props.navigation

    return (

      <View style={styles.container}>
        <TouchableOpacity style={styles.faceContainer} onPress={() => navigate('Face')}>
          <Face spots={[
            {
              x: 50,
              y: 389,
              stage: 'Small',
            },
            {
              x: 80,
              y: 289,
              stage: 'Big',
            },
            {
              x: 250,
              y: 100,
              stage: 'Dying',
            },
          ]}/>
        </TouchableOpacity>
        <PTButton
          text="+ Daily Log"
          onPress={() => navigate('DailyLog')}
        />
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
  },
  faceContainer: {
    flex: 1,
    width: '90%',
    marginTop: 30,
    marginBottom: 30,
  },
})
