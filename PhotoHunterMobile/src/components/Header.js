import {useHistory} from 'react-router-dom'
import {SafeAreaView, Text, TouchableOpacity, View,} from 'react-native'
import React from 'react'
import Styles from '../Styles'

export default function Header() {
  const history = useHistory()
  const classes = Styles()

  const handleAvatarOnClick = () => {
    history.push('/profile')
  }

  const handleLogoClick = () => {
    history.push('/locations')
  }

  return (
    <SafeAreaView>
      <View style={classes.header}>
        <Text style={classes.heading} onPress={handleLogoClick}>
          PhotoHunter
        </Text>
        <TouchableOpacity style={classes.avatar} onPress={handleAvatarOnClick}>
          <Text style={{ color: 'white' }}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
