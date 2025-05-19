import { StyleSheet, Dimensions } from 'react-native';
import { couleurs } from './Couleurs';

const { width, height } = Dimensions.get('window');

//** Cette classe contient toutes les styles configurés
// en avance. Ils sont alors utilisés pour créer l'apparence
// de chaque page de l'application.
// */
export const styles = StyleSheet.create({
  // ---------- Mise en page ----------
  card: {
    width: '90%',          
    maxWidth: 500,         
    alignSelf: 'center',
    marginTop: 20,
    top: 70,
    backgroundColor: couleurs.blanc,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

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


  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: couleurs.arrierePlan,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },


  buttonContainer: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },

  colonneCentree: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },

  ligneCentree: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,

  },

  // ---------- Typographie ----------
  titre: {
    fontSize: 50,
    fontWeight: 'bold',
    color: couleurs.couleurTexte,
    textAlign: 'center',
    marginBottom: 15,
  },
  sousTitre: {
    fontSize: 30,
    fontWeight: '600',
    color: couleurs.couleurTexte,
    marginBottom: 10,
    textAlign: 'left'
  },
  petitTexte: {
    fontSize: 14,
    color: couleurs.couleurTexte,
  },
  elementTexte:
  {
    fontSize: 17,
    color: '#000000',
  },
  label: {
    fontSize: 19,
    fontWeight: '500',
    color: couleurs.couleurTexte,
    marginBottom: 6,
  },

  labelCentered: {
    fontSize: 19,
    fontWeight: '500',
    color: couleurs.couleurTexte,
    textAlign: 'center',
    marginBottom: 6,
  },

  labelLeft: {
    fontSize: 19,
    fontWeight: '500',
    color: couleurs.couleurTexte,
    textAlign: 'left',
    marginBottom: 6,
  },

  labelInverse: {
    fontSize: 19,
    fontWeight: '500',
    color: couleurs.couleurTexteInverse,
    marginBottom: 6,
  },

  labelInverseCentered: {
    fontSize: 19,
    fontWeight: '500',
    color: couleurs.couleurTexteInverse,
    marginBottom: 6,
    textAlign: 'center',
  },

  // ---------- Boutons ----------
  bouton: {
    backgroundColor: couleurs.vertPrincipal,
    paddingVertical: 14,
    borderRadius: 19,
    alignItems: 'center',
    marginTop: 20,
    minWidth: 200,
    shadowColor: couleurs.arrierePlan,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  boutonTexte: {
    color: couleurs.blanc,
    fontWeight: '600',
    fontSize: 16,
  },
  contourBouton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: couleurs.couleurTexte,
  },
  contourBoutonTexte: {
    color: couleurs.couleurTexte,
  },

  // ---------- Input Fields ----------
  input: {
    width: '100%',
    height: 50,
    backgroundColor: couleurs.blanc,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: couleurs.couleurTexteInverse,
    borderWidth: 1,
    borderColor: couleurs.grisPrincipal,
    marginBottom: 12,
    minWidth: 300,
  },
  inputSettings: {
    width: '50%',
    height: 50,
    backgroundColor: couleurs.blanc,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: couleurs.couleurTexte,
    borderWidth: 1,
    borderColor: couleurs.grisPrincipal,
    marginBottom: 12,
    minWidth: 100,
  },

  datePickerButton: {
    width: '100%',
    height: 50,
    backgroundColor: couleurs.blanc,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: couleurs.grisPrincipal,
  },
  datePickerText: {
    fontSize: 16,
    color: couleurs.couleurTexteInverse,
  },

  // ---------- Cases à cocher ----------
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 10,
    color: couleurs.couleurTexte,
  },

  checkboxContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },

  checkboxItem: {
    alignItems: 'center',
    marginVertical: 5,
  },

  voitureContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },

  // ---------- Carte ----------
  map: {
    width: '100%',
    height: height * 0.9,
  },
  boutonLocalisation: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: couleurs.vertPrincipal,
    padding: 12,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 999,
  },

  trajetButton: {
    position: 'absolute',
    bottom: 100,
    right: 180,
    backgroundColor: couleurs.vertPrincipal,
    padding: 12,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 999,
  },

  // ---------- Boite de recherche ----------
  searchBoxWrapper: {
    position: 'absolute',
    alignItems: 'center',
    top: 70,
    left: 20,
    right: 20,
    backgroundColor: couleurs.blanc,
    borderRadius: 10,
    padding: 10,
    shadowColor: couleurs.arrierePlan,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: couleurs.noir,
    paddingVertical: 8,
  },

  // ---------- Trajets ----------

  ridecontainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: couleurs.grisPrincipal,
    paddingHorizontal: 20,
    padding: 10,
    borderRadius: 20,
    margin: 10,

  },

  trajetItem: {
    paddingVertical: 10,
    borderBottomColor: couleurs.grisPrincipal,
    borderBottomWidth: 1,
  },

  rideDetails: {
    paddingHorizontal: 5,
  },

  // ---------- Liens ----------
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  texteAvecLien: {
    fontSize: 14,
    color: couleurs.vertPrincipal,
  },
});


export default function Styles() {
  return null;
}