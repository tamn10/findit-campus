import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

import ItemDetailsForm from "@/components/report-items/ItemDetailsForm";
import LocationSection from "@/components/report-items/LocationSection";
import PhotoUpload from "@/components/report-items/PhotoUpload";
import SubmitButton from "@/components/report-items/SubmitButton";
import PageHeader from "@/components/shared/PageHeader";
import ProgressIndicator from "@/components/ui/progress-indicator";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function ReportItemScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const colorScheme = useColorScheme();

  // Get params from navigation
  const params = useLocalSearchParams<{
    from?: string | string[];
    photos?: string | string[];
  }>();

  // Parse 'from' param
  const fromParam = Array.isArray(params.from) ? params.from[0] : params.from;
  const backRoute = fromParam === "list" ? "/list" : "/map";

  // Parse 'photos' param - it comes as a JSON string
  let photosParam: string[] = [];
  if (params.photos) {
    const photosValue = Array.isArray(params.photos)
      ? params.photos[0]
      : params.photos;
    if (typeof photosValue === "string") {
      try {
        photosParam = JSON.parse(photosValue);
      } catch {
        // If not valid JSON, treat as single photo URI
        photosParam = [photosValue];
      }
    }
  }

  // Manage photos locally to avoid navigation on removal
  const [localPhotos, setLocalPhotos] = useState<string[]>(photosParam);

  // Update local photos when params change (when returning from camera)
  useEffect(() => {
    setLocalPhotos(photosParam);
  }, [params.photos]);

  // Handle photo removal without navigation
  const handleRemovePhoto = (index: number) => {
    setLocalPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // MODIFY THESE VALUES to change step progression
  const CURRENT_STEP = 1;
  const TOTAL_STEPS = 2;

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ backgroundColor }}
    >
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      <PageHeader
        title="Report Item"
        backTo={backRoute}
        rightIcon="help-circle"
        onRightPress={() =>
          alert("Need help? Contact support at support@findit.com")
        }
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Progress Indicator - Step 1 of 2 */}
        <ProgressIndicator
          currentStep={CURRENT_STEP}
          totalSteps={TOTAL_STEPS}
        />

        {/* Item Location */}
        <LocationSection />

        {/* Item Details (Category + Description) */}
        <ItemDetailsForm />

        {/* Photo Upload - Pass photos array and removal handler */}
        <PhotoUpload
          photos={localPhotos}
          from={fromParam}
          onRemovePhoto={handleRemovePhoto}
        />

        {/* Submit Button */}
        <SubmitButton />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
