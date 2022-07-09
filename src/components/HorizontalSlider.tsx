import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Movie, MovieCast} from '../interfaces/movieInterface';
import MovieCastPoster from './MovieCastPoster';
import MoviePoster from './MoviePoster';

interface ISliderProps {
  type: 'movie' | 'cast';
  data: Movie[] | MovieCast[];
  title?: string;
}
interface IStyleProps {
  title?: string;
}

const HorizontalSlider = ({type, data, title}: ISliderProps) => {
  const props = {title};
  return (
    <View
      style={
        type === 'movie'
          ? styles(props).containerMovie
          : styles(props).containerCast
      }>
      {type === 'movie' && title && (
        <Text style={styles(props).text}>{title}</Text>
      )}
      {type === 'movie' && data && (
        <FlatList
          data={data as Movie[]}
          renderItem={({item}: {item: Movie}) => (
            <MoviePoster key={item.id} movie={item} width={110} offset={10} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
      {type === 'cast' && data && (
        <FlatList
          data={data as MovieCast[]}
          renderItem={({item}: {item: MovieCast}) => (
            <MovieCastPoster key={item.id} cast={item} offset={10} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = ({title}: IStyleProps) =>
  StyleSheet.create({
    containerMovie: {
      height: title ? 210 : 180,
    },
    containerCast: {
      height: 90,
    },
    text: {
      marginLeft: 10,
      fontSize: 22,
      fontWeight: '700',
      color: '#000',
    },
  });

export default HorizontalSlider;
