import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";

class PermissionService {
  /**
   * Ask Camera Permission
   */
  async requestCameraPermission() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission.granted) {
      return true;
    }

    // User denied permanently
    if (!permission.canAskAgain) {
      Alert.alert(
        "Camera Permission Required",
        "Camera permission has been permanently denied.\n\nPlease enable it from Settings.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Open Settings",
            onPress: () => Linking.openSettings(),
          },
        ],
      );

      return false;
    }

    Alert.alert("Permission Required", "Camera permission is required.");

    return false;
  }

  /**
   * Ask Gallery Permission
   */
  async requestGalleryPermission() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.granted) {
      return true;
    }

    if (!permission.canAskAgain) {
      Alert.alert(
        "Gallery Permission Required",
        "Please enable Gallery permission from Settings.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Settings",
            onPress: () => Linking.openSettings(),
          },
        ],
      );

      return false;
    }

    Alert.alert("Permission Required", "Gallery permission is required.");

    return false;
  }
}

export default new PermissionService();
