import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import {Redirect, Route} from 'react-router-native'

export default function PrivateRoute(props) {
  const { token } = useContext(AuthContext)

  return token ? <Route {...props} /> : <Redirect to={'/login'} />
}
