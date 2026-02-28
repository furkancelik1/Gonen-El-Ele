import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useListings } from '../../context/ListingsContext';
import ListingCard from '../../components/ListingCard';
import { Colors, FontSizes, Spacing } from '../../constants/theme';

export default function HomeScreen() {
    const router = useRouter();
    const { listings } = useListings();
    const featuredListings = listings.slice(0, 4);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Hero Section */}
            <View style={styles.heroContainer}>
                <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80' }}
                    style={styles.heroImage}
                >
                    <LinearGradient
                        colors={['rgba(30,58,95,0.85)', 'rgba(30,58,95,0.7)']}
                        style={styles.heroOverlay}
                    >
                        <Text style={styles.heroTitle}>Gönen'de Dayanışma Başlasın</Text>
                        <Text style={styles.heroSubtitle}>
                            Kullanmadığın eşyaları paylaş, gönüllü hizmet ver ve ihtiyaç sahiplerine destek ol. Gönen el ele daha güzel.
                        </Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.primaryButton}
                                activeOpacity={0.8}
                                onPress={() => router.push('/create')}
                            >
                                <Text style={styles.primaryButtonText}>İlan Ver</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.secondaryButton}
                                activeOpacity={0.8}
                                onPress={() => router.push('/listings')}
                            >
                                <Text style={styles.secondaryButtonText}>İlanları İncele</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>

            {/* Featured Listings */}
            <View style={styles.contentSection}>
                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>Güncel İlanlar</Text>
                        <Text style={styles.sectionSubtitle}>Gönen'deki en son paylaşımlar ve hizmetler</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push('/listings')}>
                        <Text style={styles.seeAllText}>Tümünü Gör</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.grid}>
                    {featuredListings.map(listing => (
                        <View key={listing.id} style={styles.cardWrapper}>
                            <ListingCard listing={listing} />
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.slate50,
    },
    heroContainer: {
        height: 380,
        width: '100%',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroOverlay: {
        flex: 1,
        padding: Spacing.x6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroTitle: {
        fontSize: FontSizes['3xl'],
        fontWeight: '900',
        color: Colors.white,
        textAlign: 'center',
        marginBottom: Spacing.x4,
        marginTop: Spacing.x8,
    },
    heroSubtitle: {
        fontSize: FontSizes.base,
        color: Colors.slate300,
        textAlign: 'center',
        marginBottom: Spacing.x8,
        lineHeight: 24,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        gap: Spacing.x3,
    },
    primaryButton: {
        backgroundColor: Colors.softGreen,
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 30,
        width: '80%',
        alignItems: 'center',
        shadowColor: Colors.softGreen,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryButtonText: {
        color: Colors.white,
        fontSize: FontSizes.lg,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 30,
        width: '80%',
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: Colors.white,
        fontSize: FontSizes.lg,
        fontWeight: '600',
    },
    contentSection: {
        padding: Spacing.x4,
        paddingBottom: Spacing.x8,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: Spacing.x6,
        marginTop: Spacing.x2,
    },
    sectionTitle: {
        fontSize: FontSizes['2xl'],
        fontWeight: 'bold',
        color: Colors.navyBlue,
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: FontSizes.sm,
        color: Colors.slate500,
    },
    seeAllText: {
        fontSize: FontSizes.sm,
        fontWeight: '600',
        color: Colors.softGreen,
        marginBottom: 4,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    cardWrapper: {
        width: '48%', // Half screen width minus margins
        marginBottom: Spacing.x4,
    },
});
