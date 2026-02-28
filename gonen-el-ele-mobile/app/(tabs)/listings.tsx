import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Filter, Search } from 'lucide-react-native';
import { useListings } from '../../context/ListingsContext';
import { neighborhoods } from '../../data/mockData';
import ListingCard from '../../components/ListingCard';
import { Colors, FontSizes, Spacing } from '../../constants/theme';

export default function ListingsScreen() {
    const { listings } = useListings();
    const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const filteredListings = listings.filter(listing => {
        const matchNeighborhood = selectedNeighborhood ? listing.neighborhood === selectedNeighborhood : true;
        const matchCategory = selectedCategory ? listing.category === selectedCategory : true;
        return matchNeighborhood && matchCategory;
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tüm İlanlar</Text>
            </View>

            <View style={styles.filterSection}>
                <View style={styles.filterHeader}>
                    <Filter size={18} color={Colors.softGreen} style={{ marginRight: 6 }} />
                    <Text style={styles.filterTitle}>Filtrele:</Text>
                </View>

                <View style={styles.pickerContainer}>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={selectedNeighborhood}
                            onValueChange={(itemValue) => setSelectedNeighborhood(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Tüm Mahalleler" value="" />
                            {neighborhoods.map(n => (
                                <Picker.Item key={n} label={n} value={n} />
                            ))}
                        </Picker>
                    </View>

                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={selectedCategory}
                            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Tüm Kategoriler" value="" />
                            <Picker.Item label="Eşya" value="Physical Item" />
                            <Picker.Item label="Hizmet" value="Voluntary Service" />
                        </Picker>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {filteredListings.length > 0 ? (
                    <View style={styles.grid}>
                        {filteredListings.map(listing => (
                            <View key={listing.id} style={styles.cardWrapper}>
                                <ListingCard listing={listing} />
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyStateContainer}>
                        <View style={styles.emptyIconWrapper}>
                            <Search size={32} color={Colors.slate400} />
                        </View>
                        <Text style={styles.emptyTitle}>Sonuç Bulunamadı</Text>
                        <Text style={styles.emptyText}>
                            Seçtiğiniz mahalle veya kategoriye ait aktif ilan bulunmamaktadır. Lütfen farklı filtre seçeneklerini deneyin.
                        </Text>
                    </View>
                )}
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
        padding: Spacing.x4,
        paddingTop: Spacing.x12,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.slate200,
    },
    headerTitle: {
        fontSize: FontSizes['2xl'],
        fontWeight: 'bold',
        color: Colors.navyBlue,
    },
    filterSection: {
        backgroundColor: Colors.white,
        padding: Spacing.x4,
        borderBottomWidth: 1,
        borderBottomColor: Colors.slate200,
    },
    filterHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.x3,
    },
    filterTitle: {
        fontSize: FontSizes.base,
        fontWeight: '600',
        color: Colors.slate600,
    },
    pickerContainer: {
        flexDirection: 'row',
        gap: Spacing.x2,
    },
    pickerWrapper: {
        flex: 1,
        backgroundColor: Colors.slate50,
        borderWidth: 1,
        borderColor: Colors.slate200,
        borderRadius: 8,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    scrollView: {
        flex: 1,
        padding: Spacing.x4,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: Spacing.x8,
    },
    cardWrapper: {
        width: '48%',
        marginBottom: Spacing.x4,
    },
    emptyStateContainer: {
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: Spacing.x8,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.slate200,
        marginTop: Spacing.x4,
    },
    emptyIconWrapper: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Colors.slate100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.x4,
    },
    emptyTitle: {
        fontSize: FontSizes.xl,
        fontWeight: 'bold',
        color: Colors.slate700,
        marginBottom: Spacing.x2,
    },
    emptyText: {
        fontSize: FontSizes.sm,
        color: Colors.slate500,
        textAlign: 'center',
        lineHeight: 20,
    },
});
