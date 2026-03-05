import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Calendar, User, Handshake, MessageCircle, Trash2 } from 'lucide-react-native';
import { useListings } from '../../context/ListingsContext';
import { Colors, FontSizes, Spacing } from '../../constants/theme';
import CategoryBadge from '../../components/CategoryBadge';
import ActionModal from '../../components/ActionModal';

export default function DetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { listings, removeListing } = useListings();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const listing = listings.find(item => item.id === parseInt(id as string, 10));

    if (!listing) {
        return (
            <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundTitle}>İlan Bulunamadı</Text>
                <Text style={styles.notFoundText}>
                    Aradığınız ilan yayından kaldırılmış veya mevcut değil.
                </Text>
                <TouchableOpacity style={styles.backButtonLarge} onPress={() => router.back()}>
                    <Text style={styles.backButtonLargeText}>İlanlara Dön</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const isVoluntary = listing.category === 'Voluntary Service';

    const handleDelete = async () => {
        if (Platform.OS === 'web') {
            const confirmed = window.confirm('Bu ilanı/görevi silmek istediğinize emin misiniz?');
            if (confirmed) {
                await removeListing(listing.id);
                router.replace('/');
            }
        } else {
            Alert.alert(
                'İlanı Sil',
                'Bu ilanı/görevi silmek istediğinize emin misiniz?',
                [
                    { text: 'İptal', style: 'cancel' },
                    {
                        text: 'Sil',
                        style: 'destructive',
                        onPress: async () => {
                            await removeListing(listing.id);
                            router.replace('/');
                        },
                    },
                ]
            );
        }
    };

    return (
        <View style={styles.container}>
            {/* Hero Image */}
            <View style={styles.heroContainer}>
                <Image
                    source={typeof listing.image === 'string' ? { uri: listing.image } : listing.image}
                    style={styles.heroImage}
                    contentFit="cover"
                    transition={300}
                />
                <View style={styles.heroOverlay} />

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.canGoBack() ? router.back() : router.replace('/')}
                    activeOpacity={0.8}
                >
                    <ArrowLeft size={24} color={Colors.white} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} activeOpacity={0.8}>
                    <Trash2 size={20} color={Colors.white} />
                </TouchableOpacity>

                <View style={styles.heroBadge}>
                    <CategoryBadge category={listing.category} />
                </View>
            </View>

            {/* Scrollable Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>{listing.title}</Text>

                <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                        <MapPin size={15} color={Colors.softGreen} style={styles.metaIcon} />
                        <Text style={styles.metaText}>{listing.neighborhood}</Text>
                    </View>
                    <View style={styles.metaDivider} />
                    <View style={styles.metaItem}>
                        <Calendar size={15} color={Colors.softGreen} style={styles.metaIcon} />
                        <Text style={styles.metaText}>{listing.date} eklendi</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Açıklama</Text>
                    <Text style={styles.descriptionText}>{listing.description}</Text>
                </View>

                {listing.owner && (
                    <View style={styles.ownerCard}>
                        <View style={styles.ownerAvatar}>
                            <User size={22} color={Colors.softGreen} />
                        </View>
                        <View style={styles.ownerInfo}>
                            <Text style={styles.ownerName}>{listing.owner.name}</Text>
                            <Text style={styles.ownerJoined}>{listing.owner.joined} yılından beri üye</Text>
                        </View>
                        <View style={styles.ownerLocationRow}>
                            <MapPin size={12} color={Colors.slate400} />
                            <Text style={styles.ownerLocation}>{listing.neighborhood}</Text>
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Sticky CTA Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.ctaButton}
                    activeOpacity={0.85}
                    onPress={() => setIsModalVisible(true)}
                >
                    {isVoluntary ? (
                        <Handshake size={22} color={Colors.white} style={styles.ctaIcon} />
                    ) : (
                        <MessageCircle size={22} color={Colors.white} style={styles.ctaIcon} />
                    )}
                    <Text style={styles.ctaButtonText}>
                        {isVoluntary ? 'Görevi Üstlen' : 'İletişime Geç'}
                    </Text>
                </TouchableOpacity>
            </View>

            <ActionModal
                visible={isModalVisible}
                isVoluntary={isVoluntary}
                onClose={() => setIsModalVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    heroContainer: {
        height: 300,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.25)',
    },
    backButton: {
        position: 'absolute',
        top: Spacing.x12,
        left: Spacing.x4,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.35)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteButton: {
        position: 'absolute',
        top: Spacing.x12,
        right: Spacing.x4,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroBadge: {
        position: 'absolute',
        bottom: Spacing.x4,
        left: Spacing.x4,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: Spacing.x6,
        paddingBottom: Spacing.x4,
    },
    title: {
        fontSize: FontSizes['2xl'],
        fontWeight: 'bold',
        color: Colors.slate800,
        marginBottom: Spacing.x4,
        lineHeight: 32,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.x6,
        paddingBottom: Spacing.x6,
        borderBottomWidth: 1,
        borderBottomColor: Colors.slate100,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaIcon: {
        marginRight: Spacing.x1,
    },
    metaText: {
        fontSize: FontSizes.sm,
        color: Colors.slate500,
    },
    metaDivider: {
        width: 1,
        height: 14,
        backgroundColor: Colors.slate200,
        marginHorizontal: Spacing.x3,
    },
    section: {
        marginBottom: Spacing.x8,
    },
    sectionTitle: {
        fontSize: FontSizes.lg,
        fontWeight: '700',
        color: Colors.slate800,
        marginBottom: Spacing.x3,
    },
    descriptionText: {
        fontSize: FontSizes.base,
        color: Colors.slate600,
        lineHeight: 26,
    },
    ownerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.slate50,
        padding: Spacing.x4,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.slate200,
        marginBottom: Spacing.x4,
        flexWrap: 'wrap',
    },
    ownerAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.green100,
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
    ownerLocationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.x2,
        width: '100%',
        paddingLeft: 64,
    },
    ownerLocation: {
        fontSize: FontSizes.xs,
        color: Colors.slate400,
        marginLeft: Spacing.x1,
    },
    footer: {
        paddingHorizontal: Spacing.x6,
        paddingVertical: Spacing.x4,
        paddingBottom: Spacing.x8,
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: Colors.slate100,
    },
    ctaButton: {
        flexDirection: 'row',
        backgroundColor: Colors.softGreen,
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.softGreen,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 5,
    },
    ctaIcon: {
        marginRight: Spacing.x2,
    },
    ctaButtonText: {
        color: Colors.white,
        fontSize: FontSizes.lg,
        fontWeight: '700',
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
        paddingVertical: Spacing.x3,
        paddingHorizontal: Spacing.x6,
        borderRadius: 10,
    },
    backButtonLargeText: {
        color: Colors.white,
        fontSize: FontSizes.base,
        fontWeight: '600',
    },
});
