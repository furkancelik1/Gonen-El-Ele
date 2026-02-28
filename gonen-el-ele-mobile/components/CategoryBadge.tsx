import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSizes, Spacing } from '../constants/theme';

interface CategoryBadgeProps {
    category: string;
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
    const isPhysical = category === 'Physical Item';
    const label = isPhysical ? 'Eşya' : 'Hizmet';

    return (
        <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badgeContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        shadowColor: Colors.slate800,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    badgeText: {
        color: Colors.navyBlue,
        fontSize: FontSizes.xs,
        fontWeight: '700',
    },
});
