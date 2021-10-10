import React, { useState } from 'react'
import axios from 'axios'
import { Text, View } from 'react-native'
import Styles from '../Styles'
import FormTextInput from '../components/FormTextInput'
import ServerConfig from '../../ServerConfig'
import CustomButton from '../components/CustomButton'
import CardView from '../components/CardView'

export default function PasswordForgotPage() {
  const [email, setEmail] = useState()
  const [done, setDone] = useState(false)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const classes = Styles()

  const handleResetEmail = () => {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setError('Email not valid')
      return
    } else {
      setError()
    }

    setLoading(true)
    axios
      .post(ServerConfig().ip + '/user/sendpasswordreset', { email: email })
      .then(response => response.data)
      .then(() => setDone(true))
      .catch(console.error)
      .finally(() => {
        setLoading(false)
      })
  }

  if (done) {
    return (
      <CardView>
        <Text style={classes.page_title}>Email send</Text>
      </CardView>
    )
  }

  return (
    <CardView>
      <Text style={classes.page_title}>Password Reset</Text>
      <View style={classes.content}>
        <FormTextInput
          titleText={'Email'}
          autoCorrect={false}
          errorText={error}
          value={email}
          onChangeText={setEmail}
          placeholder={'Email'}
        />
        <CustomButton disabled={loading} onPress={handleResetEmail}>
          <Text style={{ textAlign: 'center', color: '#ffffff' }}>Send</Text>
        </CustomButton>
        {loading && <View />}
      </View>
    </CardView>
  )
}
