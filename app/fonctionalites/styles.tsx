import { StyleSheet, Dimensions } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.arrierePlan,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    width: "100%",
  },
  

  scrollContainer: {
    padding: 20,
  },

  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.couleurTexte,
    marginBottom: 6,
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

  dateButton: {
    height: 50,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.grisPrincipal,
    borderRadius: 12,
    backgroundColor: colors.blanc,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
    paddingHorizontal: 15,
  },
  
  dateButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.noir, // Ensures good contrast
    textTransform: "capitalize",
  },
  


});
