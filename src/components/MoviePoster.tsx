import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlexAlignType,
  TouchableOpacity,
} from 'react-native';
import {RootStackParams} from '../navigation/Navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {Movie} from '../interfaces/movieInterface';

interface IMoviePosterProps {
  movie: Movie;
  width: number;
  position?: 'left' | 'right' | 'center';
  offset?: number;
}
interface IStyleProps {
  width?: number;
  align?: FlexAlignType;
  offset?: number;
}

type homeScreenProp = StackNavigationProp<RootStackParams, 'HomeScreen'>;

const MoviePoster = ({
  movie,
  width,
  position = 'center',
  offset = 0,
}: IMoviePosterProps) => {
  const navigation = useNavigation<homeScreenProp>();

  let props: IStyleProps = {width, offset};
  if (position === 'center') {
    props = {...props, align: 'center'};
  }
  if (position === 'left') {
    props = {...props, align: 'flex-start'};
  }
  if (position === 'right') {
    props = {...props, align: 'flex-end'};
  }
  return (
    <View style={styles(props).container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailScreen', {movie})}>
        <View style={[styles(props).card]}>
          <Image
            style={[styles(props).image]}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = ({width, align, offset}: IStyleProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: align,
    },
    card: {
      borderRadius: 20,
      marginHorizontal: offset,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    image: {
      borderRadius: 20,
      width: width,
      height: width && width * (17 / 12),
    },
  });

export default MoviePoster;
