import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GradientContext} from '../context/GradientContext';
import useFadeAnim from '../hooks/useFadeAnim';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const GradientBg = ({children}: IProps) => {
  const {colors, prevColors, setPrevColors} = useContext(GradientContext);

  const {fadeAnim, fadeIn, fadeOut} = useFadeAnim();

  useEffect(() => {
    fadeIn(() => {
      setPrevColors(colors);
      fadeOut();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[prevColors.primary, prevColors.secondary, '#ffffff']}
        style={{...StyleSheet.absoluteFillObject}}
        start={{x: 0.1, y: 0.1}}
        end={{x: 0.5, y: 0.7}}
      />
      <Animated.View
        style={{...StyleSheet.absoluteFillObject, opacity: fadeAnim}}>
        <LinearGradient
          colors={[colors.primary, colors.secondary, '#ffffff']}
          style={{...StyleSheet.absoluteFillObject}}
          start={{x: 0.1, y: 0.1}}
          end={{x: 0.5, y: 0.7}}
        />
      </Animated.View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GradientBg;
