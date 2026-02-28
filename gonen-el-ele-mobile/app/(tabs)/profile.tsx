import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { User, MapPin, Package, MessageSquare, Trash2, Edit } from 'lucide-react-native';
import { useListings } from '../../context/ListingsContext';
import { Colors, FontSizes, Spacing } from '../../constants/theme';

const mockUser = {
    name: 'Ayşe Yılmaz',
    email: 'ayse.y@email.com',
    neighborhood: 'Kurtuluş Mahallesi',
    joined: '2023'
};

const mockMessages = [
    { id: 1, from: 'Fatma K.', subject: 'Bebek Arabası hakkında', date: '2 saat önce', text: 'Merhaba, bebek arabası hala duruyor mu? Yarın gelip alabilirim.', read: false },
    { id: 2, from: 'Ali V.', subject: 'Bebek Arabası hakkında', date: '3 saat önce', text: 'Tekerleklerde bir aşınma var mı acaba?', read: true },
];

export default function ProfileScreen() {
    const [activeTab, setActiveTab] = useState<'listings' | 'messages'>('listings');
    const { listings, removeListing } = useListings();
    const router = useRouter();

    // Filter listings owned by the current user
    const myListings = listings.filter(item => item.owner?.name?.includes('Ayşe'));

    const handleRemove = (id: number) => {
        Alert.alert(
            "İlanı Sil",
            "Bu ilanı silmek istediğinize emin misiniz?",
            [
                { text: "İptal", style: "cancel" },
                { text: "Sil", style: "destructive", onPress: () => removeListing(id) }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profilim</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <User size={40} color={Colors.softGreen} />
                    </View>
                    <Text style={styles.userName}>{mockUser.name}</Text>
                    <Text style={styles.userEmail}>{mockUser.email}</Text>

                    <View style={styles.userInfoSeparator} />

                    <View style={styles.userInfoList}>
                        <View style={styles.userInfoItem}>
                            <MapPin size={16} color={Colors.softGreen} style={styles.iconSpaced} />
                            <Text style={styles.userInfoText}>{mockUser.neighborhood}</Text>
                        </View>
                        <View style={styles.userInfoItem}>
                            <User size={16} color={Colors.softGreen} style={styles.iconSpaced} />
                            <Text style={styles.userInfoText}>{mockUser.joined} yılından beri üye</Text>
                        </View>
                    </View>
                </View>

                {/* Action Tabs */}
                <View style={styles.tabsContainer}>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'listings' && styles.tabButtonActive]}
                        onPress={() => setActiveTab('listings')}
                        activeOpacity={0.8}
                    >
                        <Package size={20} color={activeTab === 'listings' ? Colors.navyBlue : Colors.slate500} style={styles.iconSpaced} />
                        <Text style={[styles.tabText, activeTab === 'listings' && styles.tabTextActive]}>
                            Aktif İlanlarım
                        </Text>
                        <View style={styles.badgeCount}>
                            <Text style={styles.badgeCountText}>{myListings.length}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'messages' && styles.tabButtonActive]}
                        onPress={() => setActiveTab('messages')}
                        activeOpacity={0.8}
                    >
                        <MessageSquare size={20} color={activeTab === 'messages' ? Colors.navyBlue : Colors.slate500} style={styles.iconSpaced} />
                        <Text style={[styles.tabText, activeTab === 'messages' && styles.tabTextActive]}>
                            Gelen Mesajlar
                        </Text>
                        <View style={styles.badgeMessageCount}>
                            <Text style={styles.badgeMessageCountText}>1</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Main Content Area */}
                <View style={styles.contentContainer}>
                    {activeTab === 'listings' && (
                        <View>
                            <View style={styles.contentHeader}>
                                <Text style={styles.contentTitle}>Aktif İlanlarım ({myListings.length})</Text>
                                <TouchableOpacity onPress={() => router.push('/create')} style={styles.newListingButton}>
                                    <Text style={styles.newListingText}>+ Yeni İlan</Text>
                                </TouchableOpacity>
                            </View>

                            {myListings.length > 0 ? (
                                <View style={styles.listingsWrapper}>
                                    {myListings.map(listing => (
                                        <View key={listing.id} style={styles.listingItem}>
                                            <Image source={typeof listing.image === 'string' ? { uri: listing.image } : listing.image} style={styles.listingImage} contentFit="cover" transition={200} />
                                            <View style={styles.listingInfo}>
                                                <Text style={styles.listingTitle} numberOfLines={1}>{listing.title}</Text>
                                                <Text style={styles.listingDate}>{listing.date} eklendi</Text>
                                                <View style={styles.listingCategoryBadge}>
                                                    <Text style={styles.listingCategoryText}>
                                                        {listing.category === 'Physical Item' ? 'Eşya' : 'Hizmet'}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={styles.listingActions}>
                                                <TouchableOpacity style={styles.actionButton}>
                                                    <Edit size={16} color={Colors.slate500} />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.actionButtonDanger}
                                                    onPress={() => handleRemove(listing.id)}
                                                >
                                                    <Trash2 size={16} color={Colors.red500} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            ) : (
                                <View style={styles.emptyListings}>
                                    <Package size={48} color={Colors.slate300} style={{ marginBottom: Spacing.x4 }} />
                                    <Text style={styles.emptyListingsText}>Henüz aktif bir ilanınız bulunmuyor.</Text>
                                    <TouchableOpacity
                                        style={styles.primaryAction}
                                        onPress={() => router.push('/create')}
                                    >
                                        <Text style={styles.primaryActionText}>İlk İlanını Ver</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    )}

                    {activeTab === 'messages' && (
                        <View>
                            <View style={styles.contentHeader}>
                                <Text style={styles.contentTitle}>Gelen Mesajlar</Text>
                            </View>
                            <View style={styles.messagesWrapper}>
                                {mockMessages.map(msg => (
                                    <TouchableOpacity
                                        key={msg.id}
                                        style={[styles.messageItem, !msg.read && styles.messageItemUnread]}
                                        activeOpacity={0.7}
                                    >
                                        <View style={styles.messageHeader}>
                                            <View>
                                                <Text style={[styles.messageFrom, !msg.read && styles.messageFromUnread]}>{msg.from}</Text>
                                                <Text style={styles.messageSubject}>{msg.subject}</Text>
                                            </View>
                                            <Text style={styles.messageDate}>{msg.date}</Text>
                                        </View>
                                        <Text style={styles.messageText} numberOfLines={2}>{msg.text}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.slate50,
    },
    header: {
        paddingTop: Spacing.x12,
        paddingHorizontal: Spacing.x4,
        paddingBottom: Spacing.x4,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.slate200,
    },
    headerTitle: {
        fontSize: FontSizes['2xl'],
        fontWeight: 'bold',
        color: Colors.navyBlue,
    },
    scrollView: {
        flex: 1,
        padding: Spacing.x4,
    },
    profileCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: Spacing.x6,
        alignItems: 'center',
        shadowColor: Colors.slate300,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: Colors.slate200,
        marginBottom: Spacing.x6,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#d1fae5',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.x4,
    },
    userName: {
        fontSize: FontSizes.xl,
        fontWeight: 'bold',
        color: Colors.slate800,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: FontSizes.sm,
        color: Colors.slate500,
        marginBottom: Spacing.x4,
    },
    userInfoSeparator: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.slate100,
        marginBottom: Spacing.x4,
    },
    userInfoList: {
        width: '100%',
        gap: Spacing.x3,
    },
    userInfoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconSpaced: {
        marginRight: Spacing.x2,
    },
    userInfoText: {
        fontSize: FontSizes.sm,
        color: Colors.slate600,
    },
    tabsContainer: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: Colors.slate300,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: Colors.slate200,
        marginBottom: Spacing.x6,
    },
    tabButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.x4,
        borderLeftWidth: 4,
        borderLeftColor: 'transparent',
    },
    tabButtonActive: {
        borderLeftColor: Colors.softGreen,
        backgroundColor: Colors.slate50,
    },
    tabText: {
        fontSize: FontSizes.base,
        color: Colors.slate600,
        flex: 1,
    },
    tabTextActive: {
        color: Colors.navyBlue,
        fontWeight: 'bold',
    },
    badgeCount: {
        backgroundColor: '#d1fae5',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    badgeCountText: {
        color: Colors.softGreen,
        fontSize: FontSizes.xs,
        fontWeight: 'bold',
    },
    badgeMessageCount: {
        backgroundColor: Colors.softGreen,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    badgeMessageCountText: {
        color: Colors.white,
        fontSize: FontSizes.xs,
        fontWeight: 'bold',
    },
    contentContainer: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        shadowColor: Colors.slate300,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: Colors.slate200,
        minHeight: 300,
        marginBottom: Spacing.x8,
        overflow: 'hidden',
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.x6,
        borderBottomWidth: 1,
        borderBottomColor: Colors.slate100,
    },
    contentTitle: {
        fontSize: FontSizes.lg,
        fontWeight: 'bold',
        color: Colors.slate800,
    },
    newListingButton: {
        borderWidth: 1,
        borderColor: Colors.softGreen,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: '#f2fdf7',
    },
    newListingText: {
        color: Colors.softGreen,
        fontSize: FontSizes.sm,
        fontWeight: '600',
    },
    listingsWrapper: {
        padding: Spacing.x4,
    },
    listingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.x4,
        borderWidth: 1,
        borderColor: Colors.slate200,
        borderRadius: 12,
        marginBottom: Spacing.x4,
    },
    listingImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: Colors.slate100,
        marginRight: Spacing.x4,
    },
    listingInfo: {
        flex: 1,
    },
    listingTitle: {
        fontSize: FontSizes.base,
        fontWeight: 'bold',
        color: Colors.slate800,
        marginBottom: 4,
    },
    listingDate: {
        fontSize: FontSizes.xs,
        color: Colors.slate500,
        marginBottom: 6,
    },
    listingCategoryBadge: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.slate100,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    listingCategoryText: {
        fontSize: 10,
        color: Colors.slate600,
    },
    listingActions: {
        flexDirection: 'row',
        gap: Spacing.x2,
        marginLeft: Spacing.x2,
    },
    actionButton: {
        padding: 8,
        borderWidth: 1,
        borderColor: Colors.slate200,
        borderRadius: 8,
    },
    actionButtonDanger: {
        padding: 8,
        borderWidth: 1,
        borderColor: Colors.slate200,
        borderRadius: 8,
    },
    emptyListings: {
        alignItems: 'center',
        padding: Spacing.x8,
        paddingVertical: 40,
    },
    emptyListingsText: {
        fontSize: FontSizes.base,
        color: Colors.slate500,
        marginBottom: Spacing.x6,
    },
    primaryAction: {
        backgroundColor: Colors.softGreen,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 24,
    },
    primaryActionText: {
        color: Colors.white,
        fontWeight: '600',
        fontSize: FontSizes.base,
    },
    messagesWrapper: {
        // using divide style via border
    },
    messageItem: {
        padding: Spacing.x6,
        borderBottomWidth: 1,
        borderBottomColor: Colors.slate100,
    },
    messageItemUnread: {
        backgroundColor: '#f2fdf7',
    },
    messageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.x2,
    },
    messageFrom: {
        fontSize: FontSizes.base,
        color: Colors.slate800,
    },
    messageFromUnread: {
        fontWeight: 'bold',
    },
    messageSubject: {
        fontSize: FontSizes.sm,
        fontWeight: '500',
        color: Colors.navyBlue,
        marginTop: 2,
    },
    messageDate: {
        fontSize: 10,
        color: Colors.slate400,
    },
    messageText: {
        fontSize: FontSizes.sm,
        color: Colors.slate600,
        lineHeight: 20,
    },
});
