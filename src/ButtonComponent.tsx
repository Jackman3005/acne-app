import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import * as React from 'react'

interface ButtonProps {
  onPress: () => void;
  text: string;
  buttonStyle?: StyleSheet.NamedStyles<any>;
  buttonTextStyle?: StyleSheet.NamedStyles<any>;
}

class PTButton extends React.Component<ButtonProps> {
  styles: StyleSheet.NamedStyles<any>

  constructor(props: ButtonProps) {
    super(props)

    this.styles = StyleSheet.create({
      button: {
        display: 'flex',
        width: 300,
        height: 60,
        backgroundColor: '#4FBBC7',
        borderRadius: 10,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        ...props.buttonStyle,
      },
      buttonText: {
        fontSize: 24,
        color: 'white',
        marginBottom: 4,
        ...props.buttonTextStyle,
      },
    })
  }

  render() {
    return (
      <TouchableOpacity style={this.styles.button} onPress={this.props.onPress}>
        <Text style={this.styles.buttonText}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}

export default PTButton


