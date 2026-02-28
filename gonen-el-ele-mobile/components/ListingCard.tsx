import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image'; // DİKKAT: react-native yerine expo-image'den çağırıyoruz
import { MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Colors, FontSizes, Spacing } from '../constants/theme';
import CategoryBadge from './CategoryBadge';

interface Listing {
    id: number;
    title: string;
    category: string;
    neighborhood: string;
    image: string;
    date: string;
}

interface ListingCardProps {
    listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
    const router = useRouter();

    const handlePress = () => {
        router.push(`/detail/${listing.id}`);
    };

    return (
        <TouchableOpacity
            style={styles.cardContainer}
            activeOpacity={0.8}
            onPress={handlePress}
        >
            <View style={styles.imageContainer}>
                {/* YENİ MOTOR: contentFit ve transition eklendi */}
                <Image
                    style={styles.image}
                    source={typeof listing.image === 'string' ? { uri: listing.image } : listing.image}
                    contentFit="cover"
                    transition={300} // Resim yüklenirken yumuşak bir belirmesi için
                />
                <View style={styles.badgePosition}>
                    <CategoryBadge category={listing.category} />
                </View>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.title} numberOfLines={2}>
                    {listing.title}
                </Text>
                <View style={styles.locationContainer}>
                    <MapPin size={14} color={Colors.softGreen} style={styles.iconSpaced} />
                    <Text style={styles.locationText}>{listing.neighborhood}</Text>
                </View>
                <Text style={styles.dateText}>{listing.date} eklendi</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.slate100,
        overflow: 'hidden',
        shadowColor: Colors.slate300,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 4,
    },
    imageContainer: {
        height: 150,
        backgroundColor: Colors.slate100,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        // resizeMode: 'cover', -> Bunu sildik çünkü expo-image'de contentFit kullanıyoruz
    },
    badgePosition: {
        position: 'absolute',
        top: 12,
        right: 12,
    },
    contentContainer: {
        padding: Spacing.x4,
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: FontSizes.base,
        fontWeight: 'bold',
        color: Colors.slate800,
        marginBottom: Spacing.x2,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.x2,
    },
    iconSpaced: {
        marginRight: 4,
    },
    locationText: {
        fontSize: FontSizes.sm,
        color: Colors.slate500,
    },
    dateText: {
        fontSize: 12,
        color: Colors.slate400,
    },
});