import React, { useState } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import { makeTestIdProps } from '@guinie/react-native-testid'
import { styles } from '../styles'

export const Login = ({ loginAs }) => {
  const [username, setUsername] = useState('')

  return (
    <View style={[styles.container, styles.centerJustify]}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={value => setUsername(value)}
        style={[styles.textInput, styles.fullwidth, styles.control]}
        { ...makeTestIdProps('login-form--username') }
      />
      <Button
        title="Login"
        onPress={() => username.length && loginAs(username)}
        styles={[styles.control]}
        { ...makeTestIdProps('login-form--submit') }
      />
    </View>
  )
}
