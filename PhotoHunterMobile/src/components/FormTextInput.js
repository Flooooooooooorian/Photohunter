import React from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'

export default function FormTextInput(props) {
  return (
    <View style={classes.container}>
      <Text style={classes.titleText}>{props.titleText}</Text>
      <TextInput {...props} style={classes.input}/>
      <Text style={classes.errorText}>{props.errorText}</Text>
    </View>
  )
}

const classes = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    padding: 10,
    backgroundColor: '#FFFFFE',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  titleText: {
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
  },
})
