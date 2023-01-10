import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { styles } from "../../styles";

export default function NewEntryPage() {
  return (
    <View style={styles("padding-12 height-100%")}>
      <Text style={styles("marginBottom-32")}>
        Reflection entries help you better understand yourself overtime. Use
        this space to write anything that is on your mind!{" "}
      </Text>
      <TextInput multiline={true} style={styles("display-flex flexGrow-1")}/>
    </View>
  );
}
