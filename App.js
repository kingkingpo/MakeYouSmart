import React from 'react';
import { StyleSheet, View } from 'react-native';
import Test from './components/Test'
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Test num={6} remainingSecond={10}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


