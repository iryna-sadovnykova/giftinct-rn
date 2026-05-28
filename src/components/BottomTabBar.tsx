import Icon, { IconNames } from '@ant-design/react-native/lib/icon';
import TabBar from '@ant-design/react-native/lib/tab-bar';
import React, { ReactNode } from 'react';
import { Colors } from '../constants/colors';

export type BottomTab = {
  key: string;
  title: string;
  icon: IconNames;
  content: ReactNode;
};

export type BottomTabBarProps = {
  tabs: BottomTab[];
  activeKey: string;
  onTabPress: (key: string) => void;
};

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  tabs,
  activeKey,
  onTabPress,
}) => (
  <TabBar tintColor={Colors.primary}>
    {tabs.map(tab => (
      <TabBar.Item
        icon={<Icon name={tab.icon} />}
        key={tab.key}
        onPress={() => onTabPress(tab.key)}
        selected={tab.key === activeKey}
        title={tab.title}>
        {tab.content}
      </TabBar.Item>
    ))}
  </TabBar>
);
