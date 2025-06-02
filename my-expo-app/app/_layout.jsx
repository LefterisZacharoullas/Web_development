import { Stack } from "expo-router";

const RootLayout = () => {
  return <Stack
    screenOptions={{
      headerTitleAlign: "center", // center the title
      headerStyle: {
        backgroundColor: "#ff8c00",
      },
      headerTintColor: "white", // affects text/buttons in header
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
      },
      contentStyle: {
        paddingHorizontal: 10,
        paddingTop: 10, // like CSS padding for screen content
        backgroundColor: "white",
      },
    }}
  >
    <Stack.Screen name="index" options={{
      title: "Home"
    }} />
    <Stack.Screen name="notes" options={{// The notes name mutter is the name that i set in the push
      headerTitle: "Notes"
    }} />
  </Stack>
}

export default RootLayout
