import ImageColors from 'react-native-image-colors';

const getImageColors = async (uri: string) => {
  const colors = await ImageColors.getColors(uri, {
    cache: true,
  });
  let primary: string = '';
  let secondary: string = '';

  if (colors.platform === 'ios') {
    primary = colors.primary as string;
    secondary = colors.secondary as string;
  }
  if (colors.platform === 'android') {
    primary = colors.dominant as string;
    secondary = colors.average as string;
  }

  return {primary, secondary};
};

export default getImageColors;
