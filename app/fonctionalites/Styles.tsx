import { StyleSheet, Dimensions } from "react-native";
import { colors } from "./Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.arrierePlan,
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

  /** SEARCH BAR **/
  searchContainer: {
    position: "absolute",
    top: 70,
    left: 20,
    right: 20,
    width: "90%",
    backgroundColor: colors.blanc,
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
    color: colors.noir,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.noir,
    width: "100%",
    height: 50,
  },

  /** TEXT STYLES **/
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.couleurTexte,
    textAlign: "center",
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 24,
    color: colors.couleurTexte,
    textAlign: "left",
    marginTop: 10,
    paddingBottom: 10,
  },

  statText: {
    color: colors.couleurTexte,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },

  buttonText: {
    color: colors.blanc,
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
    backgroundColor: colors.grisPrincipal,
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
    backgroundColor: colors.vertPrincipal,
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
    borderColor: colors.couleurTexte,
  },

  outlineButtonText: {
    color: colors.couleurTexte,
  },

  /** INPUT FIELDS **/
  input: {
    width: "100%",
    height: 50,
    backgroundColor: colors.grisPrincipal,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: colors.couleurTexte,
    borderWidth: 1,
    borderColor: colors.grisPrincipal,
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
    color: colors.couleurTexte,
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
    backgroundColor: colors.grisPrincipal,
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
    color: colors.couleurTexte,
    fontSize: 16,
    fontWeight: "bold",
  },

  rideTime: {
    color: colors.vertSecondaire,
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
    backgroundColor: colors.grisPrincipal,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.grisPrincipal,
  },
  datePickerText: {
    fontSize: 16,
    color: colors.couleurTexte,
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
});
