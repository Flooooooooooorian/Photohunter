import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ServerConfig from '../../ServerConfig'
import Styles from '../Styles'
import CustomButton from './CustomButton'
import styled from 'styled-components/native'

export default function GoogleLoginButton() {
  const classes = Styles()
  const [config, setConfig] = useState()
  const parameter = {
    scope:
      'https%3A//www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    access_type: 'offline',
    response_type: 'code',
    state: 'state_parameter_passthrough_value',
  }

  useEffect(() => {
    axios
      .get(ServerConfig.ip + '/auth/google/login/config')
      .then(response => response.data)
      .then(setConfig)
      .catch(error => {
        console.error(error)
      })
  }, [])

  const handleGoogleLoginClick = () => {
    window.open(
      `https://accounts.google.com/o/oauth2/v2/auth?scope=${parameter.scope}&access_typ=${parameter.access_type}&response_type=${parameter.response_type}&state=${parameter.state}&redirect_uri=${config.redirectUri}&client_id=${config.clientId}`,
      '_self'
    )
  }

  return (
    <View>
      {config && (
        <StyledCustomButton onPress={handleGoogleLoginClick}>
          <Text style={{ color: '#ffffff' }}>Sign in with Google</Text>
        </StyledCustomButton>
      )}
    </View>
  )
}

const StyledCustomButton = styled(CustomButton)`
  background-color: #483d8b;
  padding: 20px;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  align-items: center;
`
