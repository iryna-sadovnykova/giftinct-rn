import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import {
  SocialAuthButton,
  SocialProvider,
} from '../components/SocialAuthButton';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';
import { useAuth } from '../context/AuthContext';
import { openGiftResults } from '../navigation/rootNavigation';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

/** Sign-up screen — receives quiz answers via route.params when coming from the quiz. */
export const SignUpScreen: React.FC<Props> = ({ navigation, route }) => {
  const { answers } = route.params;
  const { signUp, loginWithSocial } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigateAfterAuth = () => {
    if (answers) {
      openGiftResults(navigation, answers);
    } else {
      navigation.navigate('Main');
    }
  };

  const completeSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Sign up failed', 'Passwords do not match');
      return;
    }

    setSubmitting(true);
    try {
      await signUp({ email, password });
      navigateAfterAuth();
    } catch (err) {
      Alert.alert(
        'Sign up failed',
        err instanceof Error ? err.message : 'Please try again',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleSocialSignUp = async (provider: SocialProvider) => {
    setSubmitting(true);
    try {
      await loginWithSocial(provider);
      navigateAfterAuth();
    } catch (err) {
      Alert.alert(
        'Sign up failed',
        err instanceof Error ? err.message : 'Please try again',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScreenHeader onBack={() => navigation.goBack()} title="Sign up" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.heading}>Create an account</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.switch}>
              Already have an account?{' '}
              <Text style={styles.switchLink}>Log in</Text>
            </Text>
          </TouchableOpacity>

          <InputField
            autoCapitalize="none"
            containerStyle={styles.field}
            keyboardType="email-address"
            label="Email"
            onChangeText={setEmail}
            placeholder="you@example.com"
            value={email}
          />
          <InputField
            containerStyle={styles.field}
            label="Password"
            onChangeText={setPassword}
            secureTextEntry
            value={password}
          />
          <InputField
            containerStyle={styles.field}
            label="Confirm Password"
            onChangeText={setConfirmPassword}
            secureTextEntry
            value={confirmPassword}
          />

          <PrimaryButton
            disabled={submitting}
            onPress={completeSignUp}
            style={styles.cta}
            title={submitting ? 'Creating account...' : 'Sign up'}
          />

          <Text style={styles.divider}>or</Text>
          <SocialAuthButton
            disabled={submitting}
            onPress={() => handleSocialSignUp('google')}
            provider="google"
          />
          <SocialAuthButton
            disabled={submitting}
            onPress={() => handleSocialSignUp('facebook')}
            provider="facebook"
            style={styles.social}
          />
          <SocialAuthButton
            disabled={submitting}
            onPress={() => handleSocialSignUp('apple')}
            provider="apple"
            style={styles.social}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  flex: { flex: 1 },
  scroll: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  heading: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.title,
    marginBottom: Spacing.xs,
  },
  switch: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.body,
    fontSize: FontSize.small,
    marginBottom: Spacing.xl,
  },
  switchLink: {
    color: Colors.primary,
    fontFamily: FontFamily.bodyMedium,
  },
  field: {
    marginBottom: Spacing.md,
  },
  cta: {
    marginTop: Spacing.sm,
  },
  divider: {
    color: Colors.textMuted,
    fontFamily: FontFamily.body,
    fontSize: FontSize.small,
    marginVertical: Spacing.lg,
    textAlign: 'center',
  },
  social: {
    marginTop: Spacing.sm,
  },
});
