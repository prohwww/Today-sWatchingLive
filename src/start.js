import React from 'react';
import { Text,View, Image, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const App = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.mainImage}
          source={require('../public/png/free-icon-ticket-389801.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImage: {
    width: screenWidth - 250,
    height: screenWidth - 250,
    resizeMode: 'contain',
  },
});

export default App;