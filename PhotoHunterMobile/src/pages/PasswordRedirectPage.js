import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

export default function PasswordRedirectPage() {
  return (
    <View style={classes.card}>
      <Text variant={'h4'}>Password has been reset!</Text>
    </View>
  )
}

const classes = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 25,
  },
})
