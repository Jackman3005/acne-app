import {GestureResponderEvent, Image, StyleSheet, TouchableOpacity, View} from 'react-native'
import * as React from 'react'
import {NavigationParams, NavigationScreenProp, NavigationState} from 'react-navigation'

const faceImage = require('../assets/bg-face.png')
const stageToImage: { [u in Stage]: object } = {
  'Small': require('../assets/spot1.png'),
  'Big': require('../assets/spot2.png'),
  'Dying': require('../assets/spot3.png'),
}
const dotSize = 20

interface FaceScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

type Stage = 'Small' | 'Big' | 'Dying'

type Spot = {
  x: number,
  y: number,
  stage: Stage
}

interface FaceScreenState {
  spots: Spot[]
}

class FaceScreen extends React.Component<FaceScreenProps, FaceScreenState> {
  static navigationOptions = {
    title: 'Record your skin',
  }

  state = {
    spots: [],
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} style={styles.faceContainer} onPress={this.addSpot}>
          <Image style={styles.faceImage} source={faceImage}/>
          {this.state.spots.map((spot: Spot, index) => (
            <TouchableOpacity key={index} style={{
              ...styles.dotContainer,
              top: spot.y - ((dotSize + 8) / 2),
              left: spot.x - ((dotSize + 8) / 2),
            }} onPress={this.updateSpot(index)}>
              <Image style={styles.dotImages} source={stageToImage[spot.stage]}/>
            </TouchableOpacity>
          ))}
        </TouchableOpacity>
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
}

export default FaceScreen

const styles = StyleSheet.create({
  faceContainer: {
    display: 'flex',
    width: '95%',
    height: '95%',
    borderWidth: 2,
    borderColor: 'gray',
  },
  faceImage: {
    // marginHorizontal: '10%',
    // marginVertical: '10%',
    width: '100%',
    height: '100%',
    // resizeMode: '' //"cover" | "contain" | "stretch" | "repeat" | "center";
  },
  dotContainer: {
    position: 'absolute',
    display: 'flex',
    width: dotSize + 8,
    height: dotSize + 8,
  },
  dotImages: {
    width: dotSize,
    height: dotSize,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 25,
  },
})
