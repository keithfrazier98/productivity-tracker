import { Pressable, StyleSheet, Text, View as RNView } from "react-native";

const singles = {
  flex: {
    display: "flex",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  "flex-1": {
    flexGrow: 1,
  },
  "flex-col": {
    flexDirection: "column",
  },
  "flex-row": {
    flexDirection: "row",
  },
};

/**
 * O(1) Lookup for variable styles.
 *
 * w-10 = width:10
 * bg-#F2F2F2 = background: "#F2F2F2"
 *
 */
const variableStyles = {
  w: "width",
  h: "height",
  col: "column",
  row: "row",
};

export function styles(...styles: string[]) {
  return composeStyleSheet(styles.join(" "));
}

export function composeStyleSheet(styles: string) {
  let allStyles = {};
  styles.split(" ").forEach((styleString) => {
    // hyphen indicates variable styles (flex vs flex-col)
    if (styleString.includes("-")) {
      const subtsyles = styleString.split("-");
      // length of two indicates style hyphen value (e.g. w-10)
      if (subtsyles.length === 2) {
        let value = variableStyles[subtsyles[1]] || subtsyles[1];
        if (Number(value)) {
          value = Number(value);
        }
        const style = variableStyles[subtsyles[0]] || subtsyles[0];

        allStyles = {
          ...allStyles,
          [style]: value,
        };
      }
    } else {
      allStyles = { ...allStyles, ...singles[styleString] };
    }
  });
  const composedSheet = StyleSheet.create({ componentStyles: allStyles });
  // console.log(allStyles, composedSheet.componentStyles);
  return composedSheet.componentStyles;
}

export const classes = StyleSheet.create({
  bottomContainer: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  squareBtn: {
    width: 150,
    height: 100,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    fontFamily: "Lato_300Light",
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    shadowColor: "black",
  },
  bottomView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  topView: {
    height: "60%",
    backgroundColor: "#F2F2F2",
    
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    width: "100%",
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 30,
  },
  longBtn: {
    backgroundColor: "#fff",
    padding: 20,
    borderColor: "grey",
    borderStyle: "solid",
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  welcomeTextContainer: {
    borderRadius: 10,
    borderWidth: 0.5,
    marginBottom: 5,
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  welcomeText: {
    fontSize: 32,
    fontFamily: "Lato_300Light",
  },
});
