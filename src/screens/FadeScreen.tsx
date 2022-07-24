import React from 'react';
import {View, StyleSheet, Animated, Button, Text} from 'react-native';
import useFadeAnim from '../hooks/useFadeAnim';

const FadeScreen = () => {
  const {fadeAnim, fadeIn, fadeOut} = useFadeAnim();

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.view,
          {
            opacity: fadeAnim,
          },
        ]}>
        <Text style={styles.text}>Fading Text</Text>
      </Animated.View>
      <View style={styles.buttonRow}>
        <Button title="Fade In View" onPress={fadeIn} />
        <Button title="Fade Out View" onPress={fadeOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#084f6a',
    width: 200,
    height: 200,
    borderColor: 'white',
    borderWidth: 10,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
});

export default FadeScreen;
