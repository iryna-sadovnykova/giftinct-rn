import React from 'react';
import { Text, TextProps } from 'react-native';
import { FontFamily } from './constants/typography';

type TextRender = (
  props: TextProps,
  ref: unknown,
) => React.ReactElement<TextProps>;

type TextHost = typeof Text & {
  render?: TextRender;
  __interApplied?: boolean;
};

const host = Text as TextHost;
const originalRender = host.render;

if (originalRender && !host.__interApplied) {
  host.render = function patched(
    this: unknown,
    props: TextProps,
    ref: unknown,
  ) {
    const element = originalRender.call(this, props, ref);
    return React.cloneElement(element, {
      style: [{ fontFamily: FontFamily.body }, element.props.style],
    });
  };
  host.__interApplied = true;
}
