import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './Colors';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  // ---------- Layout ----------
  element:
  {
    backgroundColor: '#FFF',
    padding: 0,
    borderRadius: 7,
    width: 350,
    height: 75,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 10,
  },

  ajouterTrajet:
  {
    backgroundColor: '#41a44f',
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#41a44f',
    borderWidth: 1,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.arrierePlan,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  buttonContainer: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },

  centeredColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },

  centeredRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    
  },

  // ---------- Typography ----------
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: colors.couleurTexte,
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: '600',
    color: colors.couleurTexte,
    marginBottom: 10,
    textAlign: 'left'
  },
  smallText: {
    fontSize: 14,
    color: colors.couleurTexte,
  },
  elementText:
  {
    fontSize:17,
    color: '#000000',
  },
  label: {
    fontSize: 19,
    fontWeight: '500',
    color: colors.couleurTexte,
    marginBottom: 6,
  },

  labelCentered: {
    fontSize: 19,
    fontWeight: '500',
    color: colors.couleurTexte,
    textAlign: 'center',
    marginBottom: 6,
  },

  labelLeft: {
    fontSize: 19,
    fontWeight: '500',
    color: colors.couleurTexte,
    textAlign: 'left',
    marginBottom: 6,
  },

  labelInverse: {
    fontSize: 19,
    fontWeight: '500',
    color: colors.couleurTexteInverse,
    marginBottom: 6,
  },

  labelInverseCentered: {
    fontSize: 19,
    fontWeight: '500',
    color: colors.couleurTexteInverse,
    marginBottom: 6,
    textAlign: 'center',
  },

  // ---------- Buttons ----------
  button: {
    backgroundColor: colors.vertPrincipal,
    paddingVertical: 14,
    borderRadius: 19,
    alignItems: 'center',
    marginTop: 20,
    minWidth: 200, 
    shadowColor: colors.arrierePlan,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    color: colors.blanc,
    fontWeight: '600',
    fontSize: 16,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.couleurTexte,
  },
  outlineButtonText: {
    color: colors.couleurTexte,
  },

  // ---------- Input Fields ----------
  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.blanc,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: colors.couleurTexte,
    borderWidth: 1,
    borderColor: colors.grisPrincipal,
    marginBottom: 12,
    minWidth: 300,
  },

  datePickerButton: {
    width: '100%',
    height: 50,
    backgroundColor: colors.blanc,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.grisPrincipal,
  },
  datePickerText: {
    fontSize: 16,
    color: colors.couleurTexteInverse,
  },

  // ---------- Checkboxes ----------
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 10,
    color: colors.couleurTexte,
  },

  // ---------- Map ----------
  map: {
    width: '100%',
    height: height * 0.9,
  },
  locationButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: colors.vertPrincipal,
    padding: 12,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 999,
  },

  // ---------- Search ----------
  searchBoxWrapper: {
    position: 'absolute',
    alignItems: 'center',
    top: 70,
    left: 20,
    right: 20,
    backgroundColor: colors.blanc,
    borderRadius: 10,
    padding: 10,
    shadowColor: colors.arrierePlan,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.noir,
    paddingVertical: 8,
  },

  // ---------- Rides ----------

  ridecontainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.grisPrincipal,
    paddingHorizontal: 20,
    padding: 10,
    borderRadius: 20,
    margin: 10,

  },

  rideItem: {
    paddingVertical: 10,
    borderBottomColor: colors.grisPrincipal,
    borderBottomWidth: 1,
  },
  
  rideDetails: {
    paddingHorizontal: 5,
  },

  // ---------- Links ----------
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  linkText: {
    fontSize: 14,
    color: colors.vertPrincipal,
  },
});
