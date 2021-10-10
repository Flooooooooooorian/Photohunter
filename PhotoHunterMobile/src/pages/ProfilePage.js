import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import LocationsPage from './LocationsPage'
import { StyleSheet, Text } from 'react-native'
import CardView from '../components/CardView'

export default function ProfilePage() {
  const context = useContext(AuthContext)

  return (
    <CardView>
      <Text style={classes.title} variant={'h3'}>
        Profile
      </Text>
      <Text style={classes.title} variant={'h5'}>
        {context.jwtDecoded.name}
      </Text>
      <LocationsPage />
    </CardView>
  )
}

const classes = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 25,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    margin: 10,
  },
  title: {
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
})
