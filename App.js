import { StatusBar } from "expo-status-bar";

import { StyleSheet, Text, View, Button, Image } from "react-native";
import { useState } from "react";
import { WebView } from "react-native-webview";
import ImagePickerService from "./ImagePickerService";
import DocumentPickerService from "./DocumentPickerService";
import { Linking } from "react-native";

export default function App() {
  const [image, setImage] = useState(null);
  const [document, setDocument] = useState(null);

  async function handleGallery() {
    const result = await ImagePickerService.pickImage();

    if (!result) return;

    setImage(result);
  }

  async function handleCamera() {
    const result = await ImagePickerService.openCamera();

    if (!result) return;

    setImage(result);
  }

  async function handleDocument() {
    const file = await DocumentPickerService.pickDocument();

    console.log("Selected file:", file);

    if (!file) return;

    setDocument(file);
  }

  async function openDocument() {
    const supported = await Linking.canOpenURL(document.uri);

    console.log("Supported:", supported);
    console.log("URI:", document.uri);

    if (supported) {
      await Linking.openURL(document.uri);
    } else {
      console.log("Cannot open this URI");
    }
  }
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button title="Open Gallery" onPress={handleGallery} />

      <Button title="Open Camera" onPress={handleCamera} />

      <Button title="Pick Document" onPress={handleDocument} />

      {image && (
        <Image
          source={{
            uri: image.uri,
          }}
          style={{
            width: 200,
            height: 200,
            marginTop: 20,
          }}
        />
      )}

      {document && (
        <View style={{ marginTop: 20 }}>
          <Text>Name: {document.name}</Text>
          <Text>Type: {document.mimeType}</Text>
          <Text>Size: {(document.size / 1024).toFixed(2)} KB</Text>
          <Button title="Open Document" onPress={openDocument} />
        </View>
      )}
    </View>
  );
}

// You should install these 
// npx expo install expo-image-picker                      
// npx expo install expo-document-picker
// npx expo install expo-linking

// pdf will not work in this app
//npx expo install react-native-webview   
//then run
//npx expo run:android







