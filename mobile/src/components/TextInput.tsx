import { StyleSheet, TextInput as RNTextInput, TouchableOpacity, KeyboardTypeOptions } from "react-native";
import { Box } from "@thirdweb-dev/react-native";

const TextInput = ({
  placeholder,
  keyboardType,
  onChangeText,
}: {
  placeholder: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  onChangeText: RNTextInput["props"]["onChangeText"];
}) => {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      borderColor="border"
      borderWidth={1}
      borderRadius="md"
      pr="xs"
      pl="xxs"
    >
      <RNTextInput
        style={{
          ...styles.textInput,
          color: "black",
          // fontFamily: theme.textVariants.defaults.fontFamily,
        }}
        textContentType="none"
        returnKeyType={"done"}
        placeholder={placeholder}
        placeholderTextColor={"gray"}
        clearTextOnFocus={false}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  textInput: {
    textAlign: "left",
    flex: 1,
    height: 40,
    fontSize: 18,
    paddingHorizontal: 8,
  },
  textPrimary: {
    color: "black",
  },
  textSecondary: {
    color: "gray",
  },
});

export default TextInput