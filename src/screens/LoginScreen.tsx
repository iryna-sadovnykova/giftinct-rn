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
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

/** Log in screen from the design — email/password + social auth. */
export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login, loginWithSocial } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    setSubmitting(true);
    try {
      await login(email, password);
      navigation.navigate('Main');
    } catch (err) {
      Alert.alert(
        'Log in failed',
        err instanceof Error ? err.message : 'Please try again',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider: SocialProvider) => {
    setSubmitting(true);
    try {
      await loginWithSocial(provider);
      navigation.navigate('Main');
    } catch (err) {
      Alert.alert(
        'Log in failed',
        err instanceof Error ? err.message : 'Please try again',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScreenHeader onBack={() => navigation.goBack()} title="Log in" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.heading}>Log in to your account</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp', {})}>
            <Text style={styles.switch}>
              Don't have an account?{' '}
              <Text style={styles.switchLink}>Sign up</Text>
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

          <PrimaryButton
            disabled={submitting}
            onPress={handleLogin}
            style={styles.cta}
            title={submitting ? 'Logging in...' : 'Log in'}
          />

          <Text style={styles.divider}>or</Text>
          <SocialAuthButton
            disabled={submitting}
            onPress={() => handleSocialLogin('google')}
            provider="google"
          />
          <SocialAuthButton
            disabled={submitting}
            onPress={() => handleSocialLogin('facebook')}
            provider="facebook"
            style={styles.social}
          />
          <SocialAuthButton
            disabled={submitting}
            onPress={() => handleSocialLogin('apple')}
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
