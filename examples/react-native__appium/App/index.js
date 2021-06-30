import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Login, TodoMain } from './views'

const loginAs = ({ setUser, setView }) => username => {
  setUser(username)
  setView('main')
}

const renderView = ({ view, user, setView, setUser }) => {
  switch (view) {
    case 'main':
      return <TodoMain user={user} setView={setView} />
    default:
      return <Login loginAs={loginAs({ setView, setUser })} />
  }
}

const App = () => {
  const [view, setView] = useState('login')
  const [user, setUser] = useState('')
  return (
    <View style={styles.container}>
      {
        renderView({
          view,
          user,
          setView,
          setUser,
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
