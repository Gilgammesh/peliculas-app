import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {PAGE_WIDTH} from '../constants';
import {Movie} from '../interfaces/movieInterface';
import MoviePoster from './MoviePoster';

interface ICarouselProps {
  movies: Movie[];
}

const HorizontalCarousel = ({movies}: ICarouselProps) => {
  return (
    <View style={styles.container}>
      {movies && (
        <Carousel
          data={movies}
          renderItem={({item}) => (
            <MoviePoster key={item.id} movie={item} width={300} />
          )}
          width={PAGE_WIDTH}
          height={430}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: Platform.OS === 'ios' ? 95 : 115,
            parallaxAdjacentItemScale: 0.8,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
});

export default HorizontalCarousel;
