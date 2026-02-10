import React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import ProgressIndicator from '@/components/ui/ProgressIndicator';
import LocationSection from '@/components/report-items/LocationSection';
import ItemDetailsForm from '@/components/report-items/ItemDetailsForm';
import PhotoUpload from '@/components/report-items/PhotoUpload';
import SubmitButton from '@/components/report-items/SubmitButton';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from '@/hooks/use-color-scheme';
import PageHeader from '@/components/shared/PageHeader';

export default function ReportItemScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme();

  // MODIFY THESE VALUES to change step progression
  const CURRENT_STEP = 1;
  const TOTAL_STEPS = 2;

  return (
    <KeyboardAvoidingView 
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ backgroundColor }}
    >
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <PageHeader 
        title="Report Item"
        rightIcon="help-circle"
        onRightPress={() => alert('Need help? Contact support at support@findit.com')}
      />

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Indicator - Step 1 of 2 */}
        <ProgressIndicator currentStep={CURRENT_STEP} totalSteps={TOTAL_STEPS} />

        {/* Item Location */}
        <LocationSection />

        {/* Item Details (Category + Description) */}
        <ItemDetailsForm />

        {/* Photo Upload */}
        <PhotoUpload />

        {/* Submit Button */}
        <SubmitButton />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
