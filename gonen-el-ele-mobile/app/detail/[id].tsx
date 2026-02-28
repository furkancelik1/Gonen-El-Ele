import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Calendar, User, MessageCircle } from 'lucide-react-native';
import { useListings } from '../../context/ListingsContext';
import { Colors, FontSizes, Spacing } from '../../constants/theme';
import CategoryBadge from '../../components/CategoryBadge';

export default function DetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { listings } = useListings();

    const listing = listings.find(item => item.id === parseInt(id as string, 10));

    if (!listing) {
        return (
            <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundTitle}>İlan Bulunamadı</Text>
                <Text style={styles.notFoundText}>Aradığınız ilan yayından kaldırılmış veya mevcut değil.</Text>
                <TouchableOpacity
                    style={styles.backButtonLarge}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backButtonText}>İlanlara Dön</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleSendMessage = () => {
        Alert.alert(
            "Mesaj Gönder",
            `${listing.owner.name} kullanıcısına mesaj gönderme ekranına yönlendiriliyorsunuz...`,
            [{ text: "Tamam" }]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={20} color={Colors.slate600} />
                    <Text style={styles.backText}>Geri Dön</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: listing.image }}
                        style={styles.image}
                        contentFit="cover"
                        transition={300}
                    />
                    <View style={styles.badgePosition}>
                        <CategoryBadge category={listing.category} />
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{listing.title}</Text>

                    <View style={styles.metaContainer}>
                        <View style={styles.metaItem}>
                            <MapPin size={16} color={Colors.softGreen} style={styles.iconSpaced} />
                            <Text style={styles.metaText}>{listing.neighborhood}</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Calendar size={16} color={Colors.softGreen} style={styles.iconSpaced} />
                            <Text style={styles.metaText}>{listing.date} eklendi</Text>
                        </View>
                    </View>

                    <View style={styles.descriptionSection}>
                        <Text style={styles.sectionTitle}>Açıklama</Text>
                        <Text style={styles.descriptionText}>{listing.description}</Text>
                    </View>

                    <View style={styles.ownerCard}>
                        <View style={styles.ownerAvatar}>
                            <User size={24} color={Colors.softGreen} />
                        </View>
                        <View style={styles.ownerInfo}>
                            <Text style={styles.ownerName}>{listing.owner.name}</Text>
                            <Text style={styles.ownerJoined}>{listing.owner.joined} yılından beri üye</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.messageButton}
                        activeOpacity={0.8}
                        onPress={handleSendMessage}
                    >
                        <MessageCircle size={20} color={Colors.white} style={styles.iconSpaced} />
                        <Text style={styles.messageButtonText}>Mesaj Gönder</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    header: {
        paddingTop: Spacing.x12,
        paddingHorizontal: Spacing.x4,
        paddingBottom: Spacing.x4,
        backgroundColor: Colors.slate50,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        marginLeft: Spacing.x2,
        fontSize: FontSizes.base,
        fontWeight: '500',
        color: Colors.slate600,
    },
    scrollView: {
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        height: 300,
        backgroundColor: Colors.slate100,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    badgePosition: {
        position: 'absolute',
        top: Spacing.x4,
        left: Spacing.x4,
    },
    contentContainer: {
        padding: Spacing.x6,
        paddingBottom: Spacing.x12,
    },
    title: {
        fontSize: FontSizes['2xl'],
        fontWeight: 'bold',
        color: Colors.slate800,
        marginBottom: Spacing.x4,
    },
    metaContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.x4,
        marginBottom: Spacing.x6,
        paddingBottom: Spacing.x6,
        borderBottomWidth: 1,
        borderBottomColor: Colors.slate100,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconSpaced: {
        marginRight: 6,
    },
    metaText: {
        fontSize: FontSizes.sm,
        color: Colors.slate500,
    },
    descriptionSection: {
        marginBottom: Spacing.x8,
    },
    sectionTitle: {
        fontSize: FontSizes.lg,
        fontWeight: '600',
        color: Colors.slate800,
        marginBottom: Spacing.x3,
    },
    descriptionText: {
        fontSize: FontSizes.base,
        color: Colors.slate600,
        lineHeight: 24,
    },
    ownerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.slate50,
        padding: Spacing.x4,
        borderRadius: 12,
        marginBottom: Spacing.x6,
    },
    ownerAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#d1fae5', // soft-green-100
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.x4,
    },
    ownerInfo: {
        flex: 1,
    },
    ownerName: {
        fontSize: FontSizes.base,
        fontWeight: '600',
        color: Colors.slate800,
    },
    ownerJoined: {
        fontSize: FontSizes.xs,
        color: Colors.slate500,
        marginTop: 2,
    },
    messageButton: {
        flexDirection: 'row',
        backgroundColor: Colors.navyBlue,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.navyBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    messageButtonText: {
        color: Colors.white,
        fontSize: FontSizes.lg,
        fontWeight: '600',
    },
    notFoundContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.x8,
        backgroundColor: Colors.slate50,
    },
    notFoundTitle: {
        fontSize: FontSizes['2xl'],
        fontWeight: 'bold',
        color: Colors.slate800,
        marginBottom: Spacing.x4,
    },
    notFoundText: {
        fontSize: FontSizes.base,
        color: Colors.slate500,
        textAlign: 'center',
        marginBottom: Spacing.x6,
    },
    backButtonLarge: {
        backgroundColor: Colors.softGreen,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    backButtonText: {
        color: Colors.white,
        fontSize: FontSizes.base,
        fontWeight: '600',
    },
});
