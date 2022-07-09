import React from 'react';
import {View, Image, StyleSheet, FlexAlignType, Text} from 'react-native';
import {PAGE_WIDTH} from '../constants';
import {MovieCast} from '../interfaces/movieInterface';

interface IMoviePosterProps {
  cast: MovieCast;
  position?: 'left' | 'right' | 'center';
  offset?: number;
}
interface IStyleProps {
  align?: FlexAlignType;
  offset?: number;
}

const MovieCastPoster = ({
  cast,
  position = 'center',
  offset = 0,
}: IMoviePosterProps) => {
  let props: IStyleProps = {offset};
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
      <View style={[styles(props).card]}>
        <Image
          style={[styles(props).image]}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${cast.profile_path}`,
          }}
        />
        <View style={styles(props).containerText}>
          <Text style={styles(props).title}>{cast.name}</Text>
          <Text style={styles(props).subtitle}>{cast.character}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = ({align, offset}: IStyleProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: align,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      marginRight: offset,
      backgroundColor: '#eee',
      width: PAGE_WIDTH * 0.8,
      height: 50 * 1.5,
    },
    image: {
      borderRadius: 10,
      width: 50,
      height: 50 * 1.5,
    },
    containerText: {
      alignSelf: 'flex-start',
      width: PAGE_WIDTH * 0.8 - 50,
      padding: 4,
    },
    title: {
      fontWeight: '600',
      fontSize: 16,
      color: '#000',
    },
    subtitle: {},
  });

export default MovieCastPoster;
