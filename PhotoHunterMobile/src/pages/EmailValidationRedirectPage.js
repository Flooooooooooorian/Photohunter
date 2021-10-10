import { useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Text, View } from 'react-native'
import CardView from '../components/CardView'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function EmailValidationRedirectPage() {
  const [result, setResult] = useState()
  const [loading, setLoading] = useState(true)
  const token = useQuery().get('token')

  useEffect(() => {
    axios
      .post('https://photohunter.herokuapp.com/user/email', { token: token })
      .then(response => response.data)
      .then(data => {
        if (data) {
          setResult(true)
        } else {
          setResult(false)
        }
      })
      .catch(() => {
        setResult(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [token])

  return (
    <CardView>
      {loading && <View />}
      {!loading && (
        <Text variant={'h4'}>
          {result && 'Email Verification done'}
          {!result && 'Email Verification failed'}
        </Text>
      )}
    </CardView>
  )
}
