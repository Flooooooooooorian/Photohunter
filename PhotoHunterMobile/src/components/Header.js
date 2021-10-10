import { useHistory } from 'react-router-dom'
import { SafeAreaView, Text, View } from 'react-native'
import React from 'react'
import Styles from '../Styles'
import styled from 'styled-components/native'

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
        <Profile onPress={handleAvatarOnClick}>
          <Text style={{ color: 'white' }}>Login</Text>
        </Profile>
      </View>
    </SafeAreaView>
  )
}

const Profile = styled.TouchableOpacity`
  align-self: center;
  padding-right: 10px;
`
