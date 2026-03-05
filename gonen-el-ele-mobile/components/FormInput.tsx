import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors, FontSizes, Spacing } from '../constants/theme';

interface FormInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    multiline?: boolean;
    numberOfLines?: number;
}

export default function FormInput({
    label,
    value,
    onChangeText,
    placeholder,
    multiline = false,
    numberOfLines,
}: FormInputProps) {
    const [focused, setFocused] = useState(false);

    return (
        <View style={styles.group}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, focused && styles.inputFocused, multiline && styles.textArea]}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={placeholder}
                placeholderTextColor={Colors.slate400}
                multiline={multiline}
                numberOfLines={numberOfLines}
                textAlignVertical={multiline ? 'top' : 'center'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    group: {
        marginBottom: Spacing.x5,
    },
    label: {
        fontSize: FontSizes.sm,
        fontWeight: '600',
        color: Colors.slate700,
        marginBottom: Spacing.x2,
    },
    input: {
        borderWidth: 1.5,
        borderColor: Colors.slate200,
        borderRadius: 12,
        padding: Spacing.x4,
        fontSize: FontSizes.base,
        color: Colors.slate800,
        backgroundColor: Colors.white,
    },
    inputFocused: {
        borderColor: Colors.softGreen,
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
});
