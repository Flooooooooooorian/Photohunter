import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

export default function CustomButton({ children, style = {} }) {
  return (
    <TouchableOpacity style={{ ...styles.button, ...style }}>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#483d8b',
    padding: 20,
    marginTop: 20,
    marginHorizontal: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})
