import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: (selectedBook, book) => ({
    width: 250,
    padding: SIZES.xLarge,
    backgroundColor: selectedBook === book?.id ? COLORS.primary : "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  logoContainer: (selectedBook, book) => ({
    width: 50,
    height: 50,
    backgroundColor: selectedBook === book?.id ? "#FFF" : COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  }),
  infoHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  scoreContainer: (selectedBook, book) => ({
    width: 50,
    height: 50,
    backgroundColor: selectedBook === book?.id ? "#FFF" : COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  }),
  jobName: (selectedBook, book) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: selectedBook === book?.id ? COLORS.white : COLORS.primary,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: (selectedBook, book) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: selectedBook === book?.id ? COLORS.white : COLORS.primary,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

export default styles;
