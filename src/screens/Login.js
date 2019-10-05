import React from 'react';
import {Button, StyleSheet, ScrollView, View, AsyncStorage} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {StyledInput} from '../components/StyledInput';

const userInfo = {username: 'admin', password: 'P123456'};
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .label('username')
    .min(2, 'Username must be at least 2 characters'),
  password: yup
    .string()
    .label('Password')
    .min(6, 'Password must be at least 6 characters')
    .max(16, 'Password must be no longer than 16 characters')
    .matches(/[A-Z]/, 'at least one uppercase char')
    // .matches(
    //   /[a-zA-Z]+[^a-zA-Z\s]+/,
    //   'at least 1 number or special char (@,!,#, etc).',
    // )
    .required(),
});

const LoginScreen = props => {
  return (
    <View style={styles.screen}>
      <ScrollView style={styles.containerStyle}>
        <Formik
          initialValues={{username: '', password: ''}}
          onSubmit={async (values, actions) => {
            if (
              values.username === userInfo.username &&
              values.password === userInfo.password
            ) {
              await AsyncStorage.setItem('userToken', '1');
              props.navigation.navigate('App');
            } else {
              alert('Login failed: Invalid username or password.');
            }
          }}
          validationSchema={validationSchema}>
          {formikProps => (
            <React.Fragment>
              <StyledInput
                formikProps={formikProps}
                formikKey="username"
                placeholder="username"
                autoFocus
              />

              <StyledInput
                formikProps={formikProps}
                formikKey="password"
                placeholder="password"
                secureTextEntry
              />

              <Button title="Login" onPress={formikProps.handleSubmit} />
            </React.Fragment>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#91BCA4',
    backgroundColor: '#9EACAF',
  },
  containerStyle: {
    marginTop: 350,
    padding: 30,
    backgroundColor: '#EAF4F4',
    maxHeight: 250,
    borderRadius: 10,
    marginHorizontal: 10,
  },
});

export default LoginScreen;
