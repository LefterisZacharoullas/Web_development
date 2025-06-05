import { Stack } from "expo-router";
import { AuthProvider } from "@/contexts/authContext";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useAuth } from "@/contexts/authContext";

const HeaderLogout = () => {
  const { logout } = useAuth();
  return (
    <TouchableOpacity onPress={logout} style={styles.logoutButton}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
}

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack
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
          headerRight: () => <HeaderLogout />, // add a logout button to the right sit header
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
        <Stack.Screen name="auth" options={{// The notes name mutter is the name that i set in the push
          headerTitle: "Login"
        }} />
      </Stack>
    </AuthProvider>
  )
}

const styles = StyleSheet.create({
  logoutButton: {
    padding: 10,
    backgroundColor: "#ff4500",
    borderRadius: 5,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default RootLayout
