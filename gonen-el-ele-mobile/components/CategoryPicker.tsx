import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Package, HandHeart } from 'lucide-react-native';
import { Colors, FontSizes, Spacing } from '../constants/theme';

interface CategoryPickerProps {
    selected: string;
    onSelect: (category: string) => void;
}

const CATEGORIES = [
    {
        value: 'Physical Item',
        label: 'Eşya',
        subtitle: 'Kıyafet, kitap, mobilya vb.',
        Icon: Package,
    },
    {
        value: 'Voluntary Service',
        label: 'Hizmet',
        subtitle: 'Ders verme, yardım vb.',
        Icon: HandHeart,
    },
];

export default function CategoryPicker({ selected, onSelect }: CategoryPickerProps) {
    return (
        <View style={styles.container}>
            {CATEGORIES.map(({ value, label, subtitle, Icon }) => {
                const isSelected = selected === value;
                return (
                    <TouchableOpacity
                        key={value}
                        style={[styles.card, isSelected && styles.cardSelected]}
                        onPress={() => onSelect(value)}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.iconWrapper, isSelected ? styles.iconWrapperSelected : styles.iconWrapperDefault]}>
                            <Icon size={24} color={isSelected ? Colors.softGreen : Colors.slate500} />
                        </View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.cardLabel}>{label}</Text>
                            <Text style={styles.cardSubtitle}>{subtitle}</Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: Spacing.x4,
        marginBottom: Spacing.x6,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.x4,
        borderWidth: 2,
        borderColor: Colors.slate200,
        borderRadius: 12,
        backgroundColor: Colors.white,
    },
    cardSelected: {
        borderColor: Colors.softGreen,
        backgroundColor: Colors.greenLight,
    },
    iconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.x4,
    },
    iconWrapperDefault: {
        backgroundColor: Colors.slate100,
    },
    iconWrapperSelected: {
        backgroundColor: Colors.green100,
    },
    textWrapper: {
        flex: 1,
    },
    cardLabel: {
        fontSize: FontSizes.lg,
        fontWeight: 'bold',
        color: Colors.slate800,
        marginBottom: 2,
    },
    cardSubtitle: {
        fontSize: FontSizes.sm,
        color: Colors.slate500,
    },
});
