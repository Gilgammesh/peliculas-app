import {useRef} from 'react';
import {Animated} from 'react-native';

const useFadeAnim = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = (callback?: Function) => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => (callback ? callback() : null));
  };

  const fadeOut = (callback?: Function) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => (callback ? callback() : null));
  };

  return {fadeAnim, fadeIn, fadeOut};
};

export default useFadeAnim;
