import { StyleSheet, Dimensions } from "react-native";
import { couleurs } from '../fonctionalites/Couleurs';

const palette = couleurs();

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.arrierePlan,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  scrollContainer: {
    paddingBottom: 20,
  },

  content: {
    alignItems: "center",
    width: "100%",
  },

  map: {
    width: "120%",
    height: "100%",
  },


  /* SECTION PROFIL */
  profilContainer: {
    flex: 1,
    backgroundColor: palette.arrierePlan,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  /** SEARCH BAR **/
  searchContainer: {
    position: "absolute",
    top: 70,
    left: 20,
    right: 20,
    width: "90%",
    backgroundColor: palette.blanc,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  searchIcon: {
    marginRight: 10,
    color: palette.noir,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: palette.noir,
    width: "100%",
    height: 50,
  },

  /** TEXT STYLES **/
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: palette.couleurTexte,
    textAlign: "center",
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 24,
    color: palette.couleurTexte,
    textAlign: "left",
    marginTop: 10,
    paddingBottom: 10,
  },

  statText: {
    color: palette.couleurTexte,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },

  buttonText: {
    color: palette.blanc,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  /** STATISTICS SECTION **/
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },

  statBox: {
    backgroundColor: palette.grisPrincipal,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },

  /** BUTTONS **/
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },

  button: {
    backgroundColor: palette.vertPrincipal,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: palette.couleurTexte,
  },

  outlineButtonText: {
    color: palette.couleurTexte,
  },

  /** INPUT FIELDS **/
  input: {
    width: "100%",
    height: 50,
    backgroundColor: palette.grisPrincipal,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: palette.couleurTexte,
    borderWidth: 1,
    borderColor: palette.grisPrincipal,
    marginBottom: 12,
  },

  /** LINKS **/
  linksContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  links: {
    color: palette.couleurTexte,
    width: "60%",
    flexDirection: "row",
    marginBottom: 15,
  },

  /** RIDES LIST **/
  list: {
    paddingBottom: 20,
  },

  rideItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.grisPrincipal,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  rideDetails: {
    flex: 1,
  },

  rideText: {
    color: palette.couleurTexte,
    fontSize: 16,
    fontWeight: "bold",
  },

  rideTime: {
    color: palette.vertSecondaire,
    fontSize: 14,
  },

  /** GENERAL ELEMENTS **/
  textContainer: {
    width: "100%",
    alignItems: "flex-start",
    paddingVertical: 20,
  },

  icon: {
    marginRight: 15,
  },

  /** DATEPICKER */

  datePickerButton: {
    width: '100%',
    height: 50,
    backgroundColor: palette.grisPrincipal,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: palette.grisPrincipal,
  },
  datePickerText: {
    fontSize: 16,
    color: palette.couleurTexte,
  },

  locationButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: palette.vertPrincipal,
    padding: 12,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 999,
  },
});
