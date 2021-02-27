import React, { useState } from 'react'
import { Pressable } from 'react-native'
import CheckBox from '@react-native-community/checkbox'

/*
  Funky wrapper component for `@react-native-community/checkbox` until they
  provide better support for test automation
*/
const Checkbox = props => {
  const {
    onValueChange,
    accessibilityLabel,
    "content-desc": contentDesc,
    testID,
    ...rest
  } = props

  const testIdProps = {
    accessibilityLabel,
    "content-desc": contentDesc,
    testID,
  }

  return (
    <Pressable
      value={props.value}
      onPress={onValueChange}
      {...testIdProps}
    >
      <CheckBox
        onValueChange={onValueChange}
        {...rest}
      />
    </Pressable>
  )
}

export default Checkbox
