import {Text, GestureResponderEvent, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native'
import * as React from 'react'
import {NavigationParams, NavigationScreenProp, NavigationState} from 'react-navigation'
import Face, {Spot, Stage} from './FaceComponent'
import PTButton from './ButtonComponent'

interface FaceScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface FaceScreenState {
  spots: Spot[]
}

class FaceScreen extends React.Component<FaceScreenProps, FaceScreenState> {
  state = {
    spots: [],
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder={'Enter a note...'}/>
        <View style={styles.faceContainer}>
          <Face
            spots={this.state.spots}
            allowEditing={true}
            onAddSpot={this.addSpot}
            onUpdateSpot={this.updateSpot}
          />
        </View>
        <PTButton text="Save" onPress={this.saveSpots}/>
      </View>
    )
  }

  addSpot = (event: GestureResponderEvent) => {
    const newSpot: Spot = {
      x: event.nativeEvent.locationX,
      y: event.nativeEvent.locationY,
      stage: 'Small',
    }

    const allSpots = [
      ...this.state.spots,
      newSpot,
    ]

    this.setState({spots: allSpots})
  }

  updateSpot = (index: number) => (event: GestureResponderEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const spotToUpdate = this.state.spots[index] as Spot
    let newStage: Stage | undefined
    switch (spotToUpdate.stage) {
      case 'Small':
        newStage = 'Big'
        break
      case 'Big':
        newStage = 'Dying'
        break
      default:
        newStage = undefined
    }

    const spots: Spot[] = [
      ...this.state.spots.slice(0, index),
      ...this.state.spots.slice(index + 1),
    ]

    if (newStage) {
      spots.push({...spotToUpdate, stage: newStage})
    }

    this.setState({spots})
  }

  saveSpots = () => {
    this.props.navigation.navigate('Home')
  }
}

export default FaceScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceContainer: {
    flex: 1,
    width: '90%',
    marginBottom: 30,
  },
  text: {
    marginBottom: 25,
  },
})
