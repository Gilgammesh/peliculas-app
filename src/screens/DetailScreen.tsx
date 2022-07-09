import React from 'react';
import {
  Platform,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {PAGE_WIDTH} from '../constants';
import useMovieDetails from '../hooks/useMovieDetails';
import currencyFormatter from 'currency-formatter';
import HorizontalSlider from '../components/HorizontalSlider';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

const DetailScreen = ({route, navigation}: Props) => {
  const {movie} = route.params;

  const {details, cast, loading} = useMovieDetails(movie.id);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.backBtn}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon name="arrow-back" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.containerImage}>
        <Image
          style={[styles.image]}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
        />
      </View>
      <View style={styles.containerText}>
        <View style={styles.margin}>
          <Text style={styles.subtitle}>{movie.original_title}</Text>
        </View>
        <View style={styles.margin}>
          <Text style={styles.title}>{movie.title}</Text>
        </View>
        <View style={styles.horizontal} />
        {loading && <ActivityIndicator size="large" />}
        {!loading && details && (
          <>
            <View style={styles.containerRate}>
              <Icon name="star-outline" size={15} color="#aaa" />
              <Text
                style={styles.subtitle}>{`  ${details.vote_average} `}</Text>
              <Text style={styles.subtitle}>{' - '}</Text>
              <Text style={styles.subtitle}>{` ${details.genres
                .map(g => g.name)
                .join(', ')}`}</Text>
            </View>
            <View style={styles.margin}>
              <Text style={styles.title}>Historia</Text>
            </View>
            <View style={styles.margin}>
              <Text style={styles.description}>{movie.overview}</Text>
            </View>
            <View style={styles.margin}>
              <Text style={styles.title}>Presupuesto</Text>
            </View>
            <View style={styles.margin}>
              <Text style={styles.description}>
                {currencyFormatter.format(details.budget, {code: 'USD'})}
              </Text>
            </View>
          </>
        )}
        {cast && (
          <>
            <View style={styles.margin}>
              <Text style={styles.title}>Elenco</Text>
            </View>
            <HorizontalSlider type="cast" data={cast} />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backBtn: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: Platform.OS === 'ios' ? 40 : 20,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 6,
  },
  containerImage: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: PAGE_WIDTH,
    height: PAGE_WIDTH * 1.5,
  },
  containerText: {
    padding: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  horizontal: {
    height: 2,
    backgroundColor: '#ccc',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
  },
  description: {
    color: '#000',
    textAlign: 'justify',
    fontSize: 15,
  },
  containerRate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  margin: {
    marginBottom: 4,
  },
});

export default DetailScreen;
