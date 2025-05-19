import { StyleSheet, View } from 'react-native';
import Carte from '~/fonctionalites/Carte';


const EcranCarte = () => {
  return (
    <View style={styles.container}>
      <Carte />
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

export default EcranCarte;
