import {GestureResponderEvent, Image, StyleSheet, TouchableOpacity, View} from 'react-native'
import * as React from 'react'

const faceImage = require('../assets/bg-face.png')
const stageToImage: { [u in Stage]: object } = {
  'Small': require('../assets/spot1.png'),
  'Big': require('../assets/spot2.png'),
  'Dying': require('../assets/spot3.png'),
}

interface FaceComponentProps {
  spots: Spot[];
  allowEditing?: boolean;
  onAddSpot?: (event: GestureResponderEvent) => void;
  onUpdateSpot?: (spotIndex: number) => (event: GestureResponderEvent) => void;
}

export type Stage = 'Small' | 'Big' | 'Dying'

export type Spot = {
  x: number,
  y: number,
  stage: Stage
}

interface FaceScreenState {
  spots: Spot[]
}

class Face extends React.Component<FaceComponentProps, FaceScreenState> {
  render() {
    const disableEditing = !this.props.allowEditing

    return (
      <View style={styles.imagesContainer}>
        <TouchableOpacity
          style={styles.faceContainer}
          activeOpacity={1}
          disabled={disableEditing}
          onPress={this.props.onAddSpot}
        />
        <Image style={styles.faceImage} source={faceImage}/>
        {this.props.spots.map((spot: Spot, index) => (
          <TouchableOpacity
            key={index}
            style={{
              ...styles.dotContainer,
              top: spot.y - ((dotContainerSize) / 2),
              left: spot.x - ((dotContainerSize) / 2),
            }}
            disabled={disableEditing}
            onPress={(event) => this.props.onUpdateSpot!!(index)(event)}
          >
            <Image style={styles.dotImages} source={stageToImage[spot.stage]}/>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

export default Face

const dotSize = 20
const dotContainerSize = dotSize + 8

const styles = StyleSheet.create({
  imagesContainer: {
    width: '100%',
    height: '100%',
  },
  faceContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  faceImage: {
    position: 'absolute',
    marginTop: '10%',
    width: '100%',
    height: '82%',
    zIndex: 1,
  },
  dotContainer: {
    position: 'absolute',
    display: 'flex',
    width: dotContainerSize,
    height: dotContainerSize,
    zIndex: 3,
  },
  dotImages: {
    width: dotSize,
    height: dotSize,
  },
})
