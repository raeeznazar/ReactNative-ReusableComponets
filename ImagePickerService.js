import * as ImagePicker from "expo-image-picker";
import PermissionService from "./PermissionService";

class ImagePickerService {
  /**
   * Open Gallery
   */
  async pickImage() {
    const granted = await PermissionService.requestGalleryPermission();

    if (!granted) return null;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],

      allowsEditing: true,

      aspect: [1, 1],

      quality: 0.8,

      allowsMultipleSelection: false,
    });

    if (result.canceled) {
      return null;
    }

    return result.assets[0];
  }

  /**
   * Open Camera
   */
  async openCamera() {
    const granted = await PermissionService.requestCameraPermission();

    if (!granted) return null;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,

      quality: 0.8,

      aspect: [1, 1],
    });

    if (result.canceled) {
      return null;
    }

    return result.assets[0];
  }
}

export default new ImagePickerService();
