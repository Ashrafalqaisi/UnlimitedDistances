import { NativeTabs } from 'expo-router/native-tabs';
import { colors, useLanguage } from '@/modules/common';

/** Native tab bar: iOS tab bar (Liquid Glass on iOS 26) and Material bottom navigation on Android. */
export default function TabsLayout() {
  const { common } = useLanguage();
  const { tabs } = common;

  return (
    <NativeTabs tintColor={colors.brand} indicatorColor={colors.brandSoft} labelVisibilityMode="labeled">
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" />
        <NativeTabs.Trigger.Label>{tabs.home}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="races">
        <NativeTabs.Trigger.Icon sf={{ default: 'flag', selected: 'flag.fill' }} md="flag" />
        <NativeTabs.Trigger.Label>{tabs.races}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="my-races">
        <NativeTabs.Trigger.Icon sf="figure.run" md="directions_run" />
        <NativeTabs.Trigger.Label>{tabs.myRaces}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="account">
        <NativeTabs.Trigger.Icon sf={{ default: 'person.crop.circle', selected: 'person.crop.circle.fill' }} md="account_circle" />
        <NativeTabs.Trigger.Label>{tabs.account}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
