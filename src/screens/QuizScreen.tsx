import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { animateLayout } from '../animations/layout';
import { FadeInView } from '../components/FadeInView';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { QuestionHeader } from '../components/QuestionHeader';
import { QuizMultiOption } from '../components/QuizMultiOption';
import { QuizSingleOption } from '../components/QuizSingleOption';
import { SecondaryButton } from '../components/SecondaryButton';
import { Spacing } from '../constants/spacing';
import {
  getQuizStep,
  TOTAL_QUIZ_STEPS,
} from '../data/quizSteps';
import { Colors } from '../constants/colors';
import { QuizStackParamList, QuizAnswers, RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<QuizStackParamList, 'QuizStep'>;

/** Single quiz step — reads `step` and `answers` from route.params. */
export const QuizScreen: React.FC<Props> = ({ navigation, route }) => {
  const { step, answers: initialAnswers } = route.params;
  const config = getQuizStep(step)!;

  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [textValue, setTextValue] = useState(
    String(initialAnswers[config.answerKey] ?? ''),
  );

  const rootNav = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();

  const selectedSingle = useMemo(() => {
    const val = answers[config.answerKey];
    return typeof val === 'string' ? val : undefined;
  }, [answers, config.answerKey]);

  const selectedMulti = useMemo(() => {
    const val = answers[config.answerKey];
    return Array.isArray(val) ? new Set(val) : new Set<string>();
  }, [answers, config.answerKey]);

  const canProceed = useMemo(
    () =>
      config.optional || config.type === 'multi'
        ? true
        : config.type === 'text' || config.type === 'number'
          ? textValue.trim().length > 0
          : Boolean(selectedSingle),
    [config.optional, config.type, selectedSingle, textValue],
  );

  const nextButtonTitle = useMemo(
    () =>
      config.ctaLabel ??
      (step >= TOTAL_QUIZ_STEPS ? 'See the results' : 'Next'),
    [config.ctaLabel, step],
  );

  const goNext = useCallback(
    (nextAnswers: QuizAnswers) => {
      if (step >= TOTAL_QUIZ_STEPS) {
        rootNav?.navigate('SignUp', { answers: nextAnswers });
        return;
      }
      navigation.push('QuizStep', { step: step + 1, answers: nextAnswers });
    },
    [navigation, rootNav, step],
  );

  const handleNext = useCallback(() => {
    let next = { ...answers };
    if (config.type === 'text' || config.type === 'number') {
      next = { ...next, [config.answerKey]: textValue };
    }
    goNext(next);
  }, [answers, config.answerKey, config.type, goNext, textValue]);

  const handleSelectSingle = useCallback(
    (optionId: string) => {
      animateLayout();
      setAnswers(prev => ({
        ...prev,
        [config.answerKey]: optionId,
      }));
    },
    [config.answerKey],
  );

  const toggleMulti = useCallback(
    (id: string) => {
      animateLayout();
      setAnswers(prev => {
        const current = Array.isArray(prev[config.answerKey])
          ? [...(prev[config.answerKey] as string[])]
          : [];
        const idx = current.indexOf(id);
        if (idx >= 0) {
          current.splice(idx, 1);
        } else {
          current.push(id);
        }
        return { ...prev, [config.answerKey]: current };
      });
    },
    [config.answerKey],
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled">
        <FadeInView animationKey={step} duration={320} slideOffset={20}>
          <QuestionHeader
            question={config.question}
            step={step}
            subtitle={config.subtitle}
            totalSteps={TOTAL_QUIZ_STEPS}
          />

          {config.type === 'single' && config.options ? (
            <View style={styles.options}>
              {config.options.map(opt => (
                <QuizSingleOption
                  columns={config.columns}
                  emoji={opt.emoji}
                  id={opt.id}
                  key={opt.id}
                  label={opt.label}
                  onSelect={handleSelectSingle}
                  selected={selectedSingle === opt.id}
                  style={styles.pill}
                />
              ))}
            </View>
          ) : null}

          {config.type === 'multi' && config.options ? (
            <View
              style={[
                styles.pillGrid,
                config.columns === 1 && styles.options,
              ]}>
              {config.options.map(opt => (
                <QuizMultiOption
                  columns={config.columns ?? 2}
                  emoji={opt.emoji}
                  id={opt.id}
                  key={opt.id}
                  label={opt.label}
                  onToggle={toggleMulti}
                  selected={selectedMulti.has(opt.id)}
                />
              ))}
            </View>
          ) : null}

          {config.type === 'number' ? (
            <InputField
              keyboardType="number-pad"
              label="Age"
              onChangeText={setTextValue}
              placeholder={config.placeholder}
              value={textValue}
            />
          ) : null}

          {config.type === 'text' ? (
            <TextInput
              multiline
              onChangeText={setTextValue}
              placeholder={config.placeholder}
              placeholderTextColor={Colors.textPlaceholder}
              style={styles.textarea}
              textAlignVertical="top"
              value={textValue}
            />
          ) : null}

          <View style={styles.actions}>
            {step > 1 ? (
              <View style={styles.actionHalf}>
                <SecondaryButton onPress={handleGoBack} title="Back" />
              </View>
            ) : null}
            <View style={step > 1 ? styles.actionHalf : styles.actionFull}>
              <PrimaryButton
                disabled={!canProceed}
                onPress={handleNext}
                title={nextButtonTitle}
              />
            </View>
          </View>
        </FadeInView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  scroll: {
    paddingBottom: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
  },
  options: {
    gap: Spacing.sm,
    width: '100%',
  },
  pillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    width: '100%',
  },
  pill: {
    marginBottom: 0,
  },
  textarea: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderRadius: 4,
    borderWidth: 1,
    color: Colors.text,
    fontSize: 16,
    minHeight: 120,
    padding: Spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.xl,
  },
  actionHalf: {
    flex: 1,
  },
  actionFull: {
    flex: 1,
  },
});
