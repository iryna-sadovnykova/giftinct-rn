import Card from '@ant-design/react-native/lib/card';
import React, { memo, useEffect, useRef } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { Colors } from '../constants/colors';
import { Radius, Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';
import { PrimaryButton } from './PrimaryButton';

const IMAGE_HEIGHT = 180;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type GiftCardProps = {
  title: string;
  price: string;
  description: string;
  ctaLabel: string;
  image?: ImageSourcePropType;
  saved?: boolean;
  onPressCta: () => void;
  onPressSave?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const GiftCardComponent: React.FC<GiftCardProps> = ({
  title,
  price,
  description,
  ctaLabel,
  image,
  saved = false,
  onPressCta,
  onPressSave,
  style,
  testID,
}) => {
  const heartScale = useSharedValue(1);
  const wasSaved = useRef(saved);

  useEffect(() => {
    if (saved && !wasSaved.current) {
      heartScale.value = withSequence(
        withSpring(1.35, { damping: 8, stiffness: 400 }),
        withSpring(1, { damping: 10, stiffness: 300 }),
      );
    }
    wasSaved.current = saved;
  }, [saved, heartScale]);

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  return (
    <View testID={testID}>
      <Card style={StyleSheet.flatten([styles.card, style])}>
        <View style={styles.imageWrapper}>
          {image ? (
            <Image resizeMode="cover" source={image} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderIcon}>🎁</Text>
            </View>
          )}
          {onPressSave ? (
            <AnimatedPressable
              accessibilityLabel={saved ? 'Remove from saved' : 'Save gift'}
              accessibilityRole="button"
              accessibilityState={{ selected: saved }}
              hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
              onPress={onPressSave}
              style={[styles.saveButton, heartStyle]}>
              <Text style={[styles.saveIcon, saved && styles.saveIconActive]}>
                {saved ? '♥' : '♡'}
              </Text>
            </AnimatedPressable>
          ) : null}
        </View>
        <View style={styles.body}>
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.description}>
            <Text style={styles.sparkle}>✨ </Text>
            {description}
          </Text>
          <PrimaryButton
            onPress={onPressCta}
            style={styles.cta}
            title={ctaLabel}
          />
        </View>
      </Card>
    </View>
  );
};

const areGiftCardPropsEqual = (
  prev: GiftCardProps,
  next: GiftCardProps,
): boolean =>
  prev.title === next.title &&
  prev.price === next.price &&
  prev.description === next.description &&
  prev.ctaLabel === next.ctaLabel &&
  prev.saved === next.saved &&
  prev.testID === next.testID &&
  prev.image === next.image &&
  prev.onPressCta === next.onPressCta &&
  prev.onPressSave === next.onPressSave;

export const GiftCard = memo(GiftCardComponent, areGiftCardPropsEqual);

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    width: '100%',
  },
  imageWrapper: {
    alignSelf: 'stretch',
    backgroundColor: Colors.primaryLight,
    position: 'relative',
    width: '100%',
  },
  image: {
    height: IMAGE_HEIGHT,
    width: '100%',
  },
  imagePlaceholder: {
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    height: IMAGE_HEIGHT,
    justifyContent: 'center',
    width: '100%',
  },
  imagePlaceholderIcon: {
    fontSize: 56,
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.pill,
    height: 36,
    justifyContent: 'center',
    position: 'absolute',
    right: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    top: Spacing.md,
    width: 36,
  },
  saveIcon: {
    color: Colors.primary,
    fontSize: 20,
    lineHeight: 22,
  },
  saveIconActive: {
    color: Colors.primary,
  },
  body: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  title: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.subheading,
  },
  price: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.heading,
    marginTop: Spacing.xxs,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: FontSize.body,
    lineHeight: 20,
    marginTop: Spacing.sm,
  },
  sparkle: {
    color: Colors.accent,
  },
  cta: {
    marginTop: Spacing.md,
  },
});
