import React, {useContext} from "react";
import {ScrollView, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {LocalisationContext} from "../../localisation/context";
import {InputController} from "../../components/UI/input-controller";
import {SelectController} from "../../components/UI/select-controller";
import {MultiSelectController} from "../../components/UI/multiselect-controller";
import {useFormContext} from "react-hook-form";
import {TextInputMask} from "react-native-masked-text";
import styles from '../../assets/styles/edit_profile';

export const About = () => {
  const {
    personalInfoTitles: titles,
    figureOptions,
    ethnicityOptions,
    hairOptions,
    next,
    eyesOptions,
    languagesOptions,
    save,
    tellAboutYourself
  } = useContext(LocalisationContext);

  const {
    onSubmit,
    submitting,
    getValues,
    control,
    setValue,
    handleSubmit,
  } = useFormContext();

  const profile = getValues();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.p}>{tellAboutYourself}</Text>
        <InputController
          control={control}
          name="helloMessage"
          label={titles.helloMessage}
          multiline={true}
        />
        <MultiSelectController
          control={control}
          name="languages"
          label={titles.languages}
          setValue={setValue}
          options={languagesOptions}
        />
        <SelectController
          control={control}
          name="figure"
          label={titles.figure}
          options={figureOptions}
        />
        <InputController
          control={control}
          name="height"
          label={titles.height}
          render={props => (
            <TextInputMask
              {...props}
              type={'custom'}
              options={{
                mask: '999'
              }}
            />
          )}
        />
        <SelectController
          control={control}
          name="ethnicity"
          label={titles.ethnicity}
          options={ethnicityOptions}
        />
        <SelectController
          control={control}
          name="hair"
          label={titles.hair}
          options={hairOptions}
        />
        <SelectController
          control={control}
          name="eyes"
          label={titles.eyes}
          options={eyesOptions}
        />
        <InputController
          control={control}
          name="occupation"
          label={titles.occupation}
        />
        <InputController
          control={control}
          name="interests"
          label={titles.interests}
          multiline={true}
        />
        <InputController
          control={control}
          name="dressStyle"
          label={titles.dressStyle}
          multiline={true}
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
