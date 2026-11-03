import { StyleSheet, Text, View } from 'react-native';
import { passwordChecks, type PasswordCheck } from '@runner/shared';
import { colors, useLanguage } from '@/modules/common';

/** Live list of password requirements, each turning green once met. */
export function PasswordChecklist({ password, labels }: { password: string; labels: Record<PasswordCheck, string> }) {
  const { text, row } = useLanguage();
  const checks = passwordChecks(password);

  return (
    <View style={styles.list}>
      {(Object.keys(checks) as PasswordCheck[]).map((key) => (
        <View key={key} style={[styles.item, row]}>
          <Text style={[styles.mark, checks[key] && styles.met]}>{checks[key] ? '✓' : '•'}</Text>
          <Text style={[styles.label, text, checks[key] && styles.met]}>{labels[key]}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 8,
    gap: 3,
  },
  item: {
    alignItems: 'center',
    gap: 8,
  },
  mark: {
    width: 14,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '800',
    color: colors.muted,
  },
  label: {
    fontSize: 13,
    color: colors.muted,
  },
  met: {
    color: colors.success,
  },
});
