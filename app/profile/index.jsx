import { useContext } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import UserContext from '@/context/UserContext';
import {
  Text,
  Button,
  PageView,
  ProfileOption,
  ProfileSection
} from "@/components";

const ProfileScreen = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);

  if (!userContext) {
    return null; // or a loading component
  }

  const { user, logoutUser } = userContext;

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await logoutUser();
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert("Error", "Failed to logout. Please try again.");
            }
          }
        }
      ]
    );
  };

  return (
    <PageView header="Profile" type="back">
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{ 
              uri: user?.photo || `https://avatar.iran.liara.run/username?username=${user ? user.username : "Guest"}` 
            }}
            style={styles.profilePicture}
          />
          {user ? (
            <View style={styles.profileInfo}>
              <Text style={styles.greetingText}>Hello, {user.username}</Text>
              <Text style={styles.emailText}>{user.email}</Text>
            </View>
          ) : (
            <View style={styles.profileInfo}>
              <Text style={styles.greetingText}>Hello, Visitor</Text>
              <Button
                title="Login"
                active
                rounded
                onPress={() => router.push("/auth/login")}
              />
            </View>
          )}
        </View>

        {/* Navigation Options */}
        <ProfileSection>
          <ProfileOption
            icon={"help-circle-outline"}
            label={"FAQ"}
            onPress={() => router.push('/faq')}
          />
          <ProfileOption
            icon={"chatbubbles-outline"}
            label={"Live Chat"}
            onPress={() => router.push('/chat')}
          />
          <ProfileOption
            icon={"archive-outline"}
            label={"Feedback Form"}
            onPress={() => router.push('/feedback')}
          />
          <ProfileOption
            icon={"newspaper-outline"}
            label={"Terms & Conditions"}
            onPress={() => router.push('/terms')}
          />
          <ProfileOption
            icon={"shield-checkmark-outline"}
            label={"Privacy Policy"}
            onPress={() => router.push('/privacy')}
          />
        </ProfileSection>

        {/* Logout Button */}
        {user && (
          <Button
            title="Log Out"
            type="danger"
            active
            onPress={handleLogout}
          />
        )}
      </ScrollView>
    </PageView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  profilePicture: {
    width: 104,
    height: 104,
    borderRadius: 52,
    marginRight: 24,
    backgroundColor: '#ddd',
  },
  profileInfo: {
    flex: 1,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  emailText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default ProfileScreen;
