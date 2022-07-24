import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import GradientBg from '../components/GradientBg';
import HorizontalCarousel from '../components/HorizontalCarousel';
import HorizontalSlider from '../components/HorizontalSlider';
import useMovies from '../hooks/useMovies';

const HomeScreen = () => {
  const {movies: nowMovies, loading: nowLoading} = useMovies('now_playing');
  const {movies: popMovies, loading: popLoading} = useMovies('popular');
  const {movies: topMovies, loading: topLoading} = useMovies('top_rated');
  const {movies: upMovies, loading: upLoading} = useMovies('upcoming');

  if (nowLoading || popLoading || topLoading || upLoading) {
    return (
      <View style={styles.activity}>
        <ActivityIndicator color="red" size="large" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <GradientBg>
        <ScrollView>
          {nowMovies && <HorizontalCarousel movies={nowMovies} />}
          {nowMovies && (
            <HorizontalSlider
              type="movie"
              data={nowMovies}
              title="En cartelera"
            />
          )}
          {popMovies && (
            <HorizontalSlider type="movie" data={popMovies} title="Populares" />
          )}
          {topMovies && (
            <HorizontalSlider
              type="movie"
              data={topMovies}
              title="Mejor calificadas"
            />
          )}
          {upMovies && (
            <HorizontalSlider
              type="movie"
              data={upMovies}
              title="Próximamente"
            />
          )}
        </ScrollView>
      </GradientBg>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  activity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
});

export default HomeScreen;
