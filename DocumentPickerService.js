import * as DocumentPicker from "expo-document-picker";

class DocumentPickerService {
  async pickDocument() {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",

      multiple: false,

      copyToCacheDirectory: true,
    });

    if (result.canceled) {
      return null;
    }

    return result.assets[0];
  }
}

export default new DocumentPickerService();
