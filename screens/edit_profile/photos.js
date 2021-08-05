import React, {useContext} from "react";
import {ScrollView, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {LocalisationContext} from "../../localisation/context";
import {InputController} from "../../components/UI/input-controller";
import {SelectController} from "../../components/UI/select-controller";
import {useFormContext} from "react-hook-form";
import {TextInputMask} from "react-native-masked-text";
import styles from '../../assets/styles/edit_profile';
import {Alert} from "../../components/UI/alert";

export const Photos = () => {
  const {
    whyAddPhoto,
    save,
    photoAlert
  } = useContext(LocalisationContext);

  const {
    onSubmit,
    submitting,
    getValues,
    handleSubmit
  } = useFormContext();

  const profile = getValues();

  const getWhyAddPhotoText = () => {
    const newWhyAddPhoto = whyAddPhoto;

    let param;
    switch (profile.lang) {
      case 'ru':
        param = profile.gender === 'Woman' ? 'девушек' : 'мужчин';
        break;
      case 'lv':
        param = profile.gender === 'Woman' ? 'meiteņu' : 'vīrieši';
        break;
      default:
        param = profile.gender === 'Woman' ? 'girls' : 'men'
    }

    return newWhyAddPhoto.replace('$gender', param);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Alert style={styles.p}>{photoAlert}</Alert>
        <Text style={styles.p}>{getWhyAddPhotoText()}</Text>
        <Button
          mode='contained'
          onPress={handleSubmit(onSubmit)}
          disabled={submitting}
        >
          {save}
        </Button>
      </View>
    </ScrollView>
  )
}
