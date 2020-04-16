import React from 'react'
import { Router, Stack, Tabs, Scene } from 'react-native-router-flux'

import Home from './pages/home'

export default function Routes() {
  return (
    <Router>
      <Stack hideNavBar>
        <Scene key='home' component={Home} title='Home' />
      </Stack>
    </Router>
  )
}
