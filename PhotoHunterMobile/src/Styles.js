import { StyleSheet } from 'react-native'

export default function Styles() {
  return StyleSheet.create({
    error: {
      color: 'red',
      textAlign: 'center',
    },
    forgot: {
      textDecorationLine: 'underline',
      textAlign: 'center',
      marginTop: 10,
    },
    header: {
      display: 'flex',
      backgroundColor: '#222',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    heading: {
      fontSize: 50,
      color: 'white',
    },
    input: {
      margin: 10,
      padding: 10,
    },
    list_item: {
      display: 'flex',
      flexDirection: 'row',
      margin: 15,
    },
    list_media: {
      width: 160,
      height: 100,
      margin: 10,
    },
    media: {
      height: 300,
      flex: 1,
      width: null,
    },
    page_title: {
      textAlign: 'center',
      fontSize: 50,
    },
    shadow: {
      // boxShadow: '5px 5px 11px -7px #000000',
      backgroundColor: '#FFFFFE',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    text_title: {
      marginTop: 10,
      fontSize: 25,
    },
  })
}
