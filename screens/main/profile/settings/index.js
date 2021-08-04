import React, {useContext, useState} from "react";
import {Picker, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import {LocalisationContext} from "../../../../localisation/context";

export default function Settings() {
  const {
    changePasswordText,
    changeLanguageText,
    textFieldPlaceholders,
    save,
    languagesOptions
  } = useContext(LocalisationContext);

  const [selectedValue, setSelectedValue] = useState();

  const profileLanguagesOptions = languagesOptions.filter(item => (
    item.value === 'English' ||
    item.value === 'Latvian' ||
    item.value === 'Russian'
  ));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrap}>
        <Text style={styles.title}>
          {changePasswordText}
        </Text>
        <TextInput
          style={styles.mb}
          mode={'outlined'}
          placeholder={textFieldPlaceholders.oldPassword}
        />
        <TextInput
          style={styles.mb}
          mode={'outlined'}
          placeholder={textFieldPlaceholders.newPassword}
        />
        <TextInput
          style={styles.mb}
          mode={'outlined'}
          placeholder={textFieldPlaceholders.confirmPassword}
        />
        <Text style={styles.title}>
          {changeLanguageText}
        </Text>
        <View style={[styles.picker, styles.mb]}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
          >
            <Picker.Item label={profileLanguagesOptions[0].title} value={profileLanguagesOptions[0].value}/>
            <Picker.Item label={profileLanguagesOptions[1].title} value={profileLanguagesOptions[1].value}/>
            <Picker.Item label={profileLanguagesOptions[2].title} value={profileLanguagesOptions[2].value}/>
          </Picker>
        </View>
        <Button
          mode={'contained'}
          onPress={() => {
          }}
          style={styles.save}
        >
          {save}
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrap: {
    padding: 10
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  mb: {
    marginBottom: 20
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#80848B',
    borderStyle: 'solid',
    borderRadius: 4
  },
  save: {
    marginBottom: 30
  }
});
