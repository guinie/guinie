import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    width: width - 20,
    height: height - 20,
    padding: 10,
  },
  topDownLayout: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerJustify: {
    justifyContent: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  noGrow: {
    flexGrow: 0,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
  },
  control: {
    margin: 5,
  }
})
