import { StyleSheet, View } from 'react-native';
import Map from '~/fonctionalites/Map';


const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Map/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
