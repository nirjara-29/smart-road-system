import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { I18nextProvider } from 'react-i18next';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { WorkflowProvider } from './src/context/WorkflowContext';
import i18n from './src/localization/i18n';

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <WorkflowProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </WorkflowProvider>
      </AuthProvider>
    </I18nextProvider>
  );
}
