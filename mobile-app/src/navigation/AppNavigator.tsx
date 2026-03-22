import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import CitizenHome from '../screens/CitizenHome';
import WorkerHome from '../screens/WorkerHome';
import FeedbackScreen from '../screens/FeedbackScreen';
import WorkerLoginScreen from '../screens/WorkerLoginScreen';
import WorkerAssignments from '../screens/WorkerAssignments';
import WorkerUpdate from '../screens/WorkerUpdate';
import LanguageSelectionScreen from '../screens/LanguageSelectionScreen';
import ContactUs from '../screens/ContactUs';
import i18n, { getSavedLanguage } from '../localization/i18n';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState<'LanguageSelection' | 'Login'>('Login');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadLanguage = async () => {
      const saved = await getSavedLanguage();
      if (saved) {
        await i18n.changeLanguage(saved);
        setInitialRoute('Login');
      } else {
        setInitialRoute('LanguageSelection');
      }
      setReady(true);
    };

    loadLanguage();
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
      <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
      <Stack.Screen name="LanguageSettings" component={LanguageSelectionScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="CitizenHome" component={CitizenHome} />
      <Stack.Screen name="WorkerHome" component={WorkerHome} />
      <Stack.Screen name="WorkerLogin" component={WorkerLoginScreen} />
      <Stack.Screen name="WorkerAssignments" component={WorkerAssignments} />
      <Stack.Screen name="WorkerUpdate" component={WorkerUpdate} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
    </Stack.Navigator>
  );
}
