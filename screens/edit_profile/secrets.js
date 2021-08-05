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

export const Secrets = () => {
  const {
    personalInfoTitles: titles,
    areaAvailabilityOptions,
    next,
    save,
    addPersonalNumber,
    addInfoAboutYourSecrets,
    whyAddInfoAboutYourSecrets,
    secretsAlert
  } = useContext(LocalisationContext);

  const {
    onSubmit,
    submitting,
    getValues,
    control,
    handleSubmit
  } = useFormContext();

  const profile = getValues();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Alert style={styles.p}>{secretsAlert}</Alert>
        <Text style={styles.p}>{addInfoAboutYourSecrets}</Text>
        <Text style={styles.p}>{whyAddInfoAboutYourSecrets}</Text>
        <InputController
          control={control}
          name="whatYouLikeInSex"
          label={titles.whatYouLikeInSex}
          multiline={true}
        />
        <InputController
          control={control}
          name="whatYouDontLikeInSex"
          label={titles.whatYouDontLikeInSex}
          multiline={true}
        />
        <SelectController
          control={control}
          name="areaAvailability"
          label={titles.areaAvailability}
          options={areaAvailabilityOptions}
        />
        <InputController
          control={control}
          name="expectedReward"
          label={titles.expectedReward}
          render={props => (
            <TextInputMask
              {...props}
              type={'custom'}
              options={{
                mask: '99999'
              }}
            />
          )}
        />
        <Text style={styles.p}>{addPersonalNumber}</Text>
        <InputController
          control={control}
          name="phoneNumber"
          label={titles.phoneNumber}
          render={props => (
            <TextInputMask
              {...props}
              type={'custom'}
              options={{
                mask: '+371 99 999 999'
              }}
            />
          )}
        />
        <Button
          mode='contained'
          onPress={handleSubmit(onSubmit)}
          disabled={submitting}
        >
          {profile.profileSubmitted ? save : next}
        </Button>
      </View>
    </ScrollView>
  )
}
