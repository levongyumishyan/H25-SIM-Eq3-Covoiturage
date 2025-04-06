import { forwardRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

type ButtonProps = {
  title?: string;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  ({ title, disabled, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        disabled={disabled}
        {...touchableProps}
        style={[
          styles.button,
          disabled && styles.buttonDisabled,
          touchableProps.style,
        ]}
      >
        <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#38C400',
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonDisabled: {
    backgroundColor: '#A9A9A9', // greyed out
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonTextDisabled: {
    color: '#E0E0E0',
  },
});
