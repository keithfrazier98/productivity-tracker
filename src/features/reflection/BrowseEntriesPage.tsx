import { ScrollView, View } from "react-native";
import { Button, List } from "react-native-paper";
import { styles } from "../../styles";

export default function BrowseEntriesPage({ navigation }) {
  const data = [
    {
      month: "January",
      entries: ["01/01/2023", "01/04/2023", "01/09/2023"],
    },
    {
      month: "February",
      entries: ["02/01/2023", "02/04/2023", "02/09/2023"],
    },
    {
      month: "March",
      entries: ["03/01/2023", "03/04/2023", "03/09/2023"],
    },
    {
      month: "April",
      entries: ["04/01/2023", "04/04/2023", "04/09/2023"],
    },
  ];
  return (
    <ScrollView style={styles("display-flex flexDirection-col")}>
      {data.map(({ month, entries }) => (
        <List.Section>
          <List.Subheader>{month}</List.Subheader>
          {entries.map((val) => (
            <List.Item
              title={val}
              onPress={() => navigation.navigate("View Entry")}
            />
          ))}
        </List.Section>
      ))}
    </ScrollView>
  );
}
