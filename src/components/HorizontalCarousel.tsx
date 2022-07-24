import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {PAGE_WIDTH} from '../constants';
import getImageColors from '../helpers/getImageColors';
import {Movie} from '../interfaces/movieInterface';
import MoviePoster from './MoviePoster';
import {GradientContext} from '../context/GradientContext';

interface ICarouselProps {
  movies: Movie[];
}

const HorizontalCarousel = ({movies}: ICarouselProps) => {
  const {setColors} = useContext(GradientContext);

  useEffect(() => {
    getPosterColors(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPosterColors = async (index: number) => {
    if (movies) {
      const uri = `https://image.tmdb.org/t/p/w500${movies[index].poster_path}`;
      const imgColors = await getImageColors(uri);
      setColors(imgColors);
    }
  };

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
          onSnapToItem={index => getPosterColors(index)}
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
