import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

// ─── Illustrations ───────────────────────────────────────────────────────────

const SnapPinIllustration = () => (
  <View style={styles.snapContainer}>
    {/* Grid background card */}
    <View style={styles.snapCard}>
      {/* Dashed inner border */}
      <View style={styles.snapDashedBorder}>
        {/* Camera icon */}
        <View style={styles.snapIconWrapper}>
          <Ionicons name="camera" size={48} color="#7EB3F5" />
        </View>
      </View>
      {/* Location pin bubble */}
      <View style={styles.snapPinBubble}>
        <Ionicons name="location" size={24} color="#fff" />
      </View>
    </View>
  </View>
);

const SafeRecoveryIllustration = () => (
  <View style={styles.safeContainer}>
    {/* Outer circle */}
    <View style={styles.safeCircle}>
      {/* Message bubble - top */}
      <View style={styles.safeMsgBubble}>
        <Ionicons name="chatbubble-ellipses" size={30} color="#fff" />
      </View>
      {/* Center shield circle */}
      <View style={styles.safeShieldCircle}>
        <Ionicons name="shield-checkmark" size={50} color="#2563EB" />
      </View>
      {/* Lock - bottom */}
      <View style={styles.safeLockBubble}>
        <Ionicons name="lock-closed" size={30} color="#555" />
      </View>
    </View>
  </View>
);

const FasterResultsIllustration = () => (
  <View style={styles.fasterContainer}>
    {/* Toggle row */}
    <View style={styles.fasterToggleRow}>
      {/* Traditional */}
      <View style={styles.fasterOptionInactive}>
        <Ionicons name="file-tray" size={32} color="#9CA3AF" />
        <Text style={styles.fasterOptionLabelInactive}>TRADITIONAL</Text>
      </View>
      {/* Campus App */}
      <View style={styles.fasterOptionActive}>
        <Ionicons name="location" size={32} color="#2563EB" />
        <Text style={styles.fasterOptionLabelActive}>CAMPUS APP</Text>
      </View>
    </View>
    {/* Map image placeholder */}
    <View style={styles.fasterMapWrapper}>
      {/* Simulated map with pins */}
      <ImageBackground
        source={require("../assets/images/map.png")}
        style={styles.fasterMap}
        borderRadius={12}
      />
    </View>
  </View>
);

// ─── Slide Data ───────────────────────────────────────────────────────────────

const slides = [
  {
    id: 0,
    title: "Snap it, Pin it.",
    description:
      "Found something? Just take a photo. We'll automatically pin the location to help the owner find it faster.",
    illustration: <SnapPinIllustration />,
    showSkip: true,
    showBack: false,
    buttonLabel: "Next",
    isLast: false,
  },
  {
    id: 1,
    title: "Safe Recovery",
    description:
      "Communicate securely with others through our in-app messaging. Coordinate returns without sharing your personal info.",
    illustration: <SafeRecoveryIllustration />,
    showSkip: true,
    showBack: true,
    buttonLabel: "Next",
    isLast: false,
  },
  {
    id: 2,
    title: "Faster Results",
    description:
      "Faster than traditional offices. Find your lost items in real-time with our interactive campus map.",
    illustration: <FasterResultsIllustration />,
    showSkip: false,
    showBack: true,
    buttonLabel: "Get Started",
    isLast: true,
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToLogin = () => {
    router.replace("/(auth)/login");
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      goToLogin();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const slide = slides[currentIndex];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        {/* Top bar */}
        <View style={styles.topBar}>
          {slide.showBack ? (
            <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={22} color="#374151" />
            </TouchableOpacity>
          ) : (
            <View style={styles.backBtn} />
          )}
          {slide.showSkip && (
            <TouchableOpacity onPress={goToLogin}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Illustration area */}
        <View style={styles.illustrationArea}>{slide.illustration}</View>

        {/* Text content */}
        <View style={[styles.textContent, currentIndex === 2 && { paddingTop: 60 }]}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>
        </View>

        {/* Progress dots */}
        <View style={styles.dotsRow}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === currentIndex && styles.dotActive]}
            />
          ))}
        </View>

        {/* CTA Button */}
        <TouchableOpacity style={styles.ctaBtn} onPress={handleNext} activeOpacity={0.85}>
          <Text style={styles.ctaBtnText}>{slide.buttonLabel}  →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  screen: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
    backgroundColor: "#fff",
  },

  // Top bar
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 8,
    minHeight: 44,
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  skipText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "400",
  },
  stepText: {
    fontSize: 15,
    color: "#2563EB",
    fontWeight: "600",
  },

  // Illustration area
  illustrationArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: height * 0.42,
  },

  // ── Screen 1: Snap it Pin it ──
  snapContainer: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  snapCard: {
    width: "85%",
    height: (width) * 0.72,
    backgroundColor: "#DBEAFE",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    // grid lines via border
    overflow: "hidden",
  },
  snapDashedBorder: {
    width: "75%",
    height: "75%",
    borderWidth: 1.5,
    borderColor: "#93C5FD",
    borderStyle: "dashed",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  snapIconWrapper: {
    opacity: 0.85,
  },
  snapPinBubble: {
    position: "absolute",
    bottom: "14%",
    right: "14%",
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  // ── Screen 2: Safe Recovery ──
  safeContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  safeCircle: {
    width: 270,
    height: 270,
    borderRadius: 150,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  safeMsgBubble: {
    position: "absolute",
    top: -5,
    alignSelf: "center",
    width: 70,
    height: 60,
    borderRadius: 14,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  safeShieldCircle: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  safeLockBubble: {
    position: "absolute",
    bottom: -5,
    alignSelf: "center",
    width: 70,
    height: 70,
    borderRadius: 22,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  // ── Screen 3: Faster Results ──
  fasterContainer: {
    marginTop: 60,
    width: "96%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  fasterToggleRow: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 12,
  },
  fasterOptionInactive: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    backgroundColor: "#F9FAFB",
    paddingTop: 35,
    paddingBottom: 40,
    alignItems: "center",
    gap: 6,
  },
  fasterOptionActive: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#aacffc",
    backgroundColor: "#EFF6FF",
    paddingTop: 35,
    paddingBottom: 40,
    alignItems: "center",
    gap: 6,
  },
  fasterOptionLabelInactive: {
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  fasterOptionLabelActive: {
    fontSize: 10,
    color: "#2563EB",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  fasterMapWrapper: {
    borderRadius: 12,
    overflow: "hidden",
  },
  fasterMap: {
    width: "100%",
    height: 250,
    position: "relative",
  },
  mapPin: {
    position: "absolute",
  },

  // Text content
  textContent: {
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 8,
  },

  // Dots
  dotsRow: {
    position: "absolute",
    bottom: 110,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 40,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
  },
  dotActive: {
    width: 24,
    borderRadius: 4,
    backgroundColor: "#2563EB",
  },

  // CTA
  ctaBtn: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    width: "90%",
    backgroundColor: "#2563EB",
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2563EB",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  ctaBtnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
