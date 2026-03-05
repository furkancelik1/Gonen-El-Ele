import { useState } from 'react';
import {
    View, Text, StyleSheet, TextInput, ScrollView,
    TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { CheckCircle2, ChevronRight, ChevronLeft, Upload, Package, HandHeart } from 'lucide-react-native';
import { neighborhoods } from '../../data/mockData';
import { useListings } from '../../context/ListingsContext';
import StepIndicator from '../../components/StepIndicator';
import { Colors, FontSizes, Spacing } from '../../constants/theme';

const STEPS = ['Temel Bilgiler', 'Konum & Fotoğraf', 'Önizleme'];

const initialForm = {
    title: '',
    description: '',
    category: '',
    neighborhood: '',
    imagePreview: null as string | null,
};

export default function CreateListingScreen() {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [submittedTitle, setSubmittedTitle] = useState('');
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const router = useRouter();
    const { addListing } = useListings();

    const canProceed = () => {
        if (step === 0) return form.category && form.title.trim() && form.description.trim();
        if (step === 1) return form.neighborhood;
        return true;
    };

    const handleNext = () => { if (step < STEPS.length - 1) setStep(step + 1); };
    const handleBack = () => { if (step > 0) setStep(step - 1); };

    const handleSubmit = async () => {
        await addListing(form);
        setSubmittedTitle(form.title);
        setSubmitted(true);
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });
        if (!result.canceled) {
            setForm({ ...form, imagePreview: result.assets[0].uri });
        }
    };

    const inputStyle = (field: string) => [
        styles.input,
        focusedField === field && styles.inputFocused,
    ];

    if (submitted) {
        return (
            <SafeAreaView style={styles.successContainer}>
                <View style={styles.successIconWrapper}>
                    <CheckCircle2 size={64} color={Colors.softGreen} />
                </View>
                <Text style={styles.successTitle}>İlanınız Yayınlandı!</Text>
                <Text style={styles.successText}>
                    "{submittedTitle}" ilanınız Gönen topluluğuyla paylaşıldı. Teşekkür ederiz!
                </Text>
                <View style={styles.successButtons}>
                    <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/listings')}>
                        <Text style={styles.primaryButtonText}>İlanlara Git</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => { setSubmitted(false); setForm(initialForm); setStep(0); }}
                    >
                        <Text style={styles.secondaryButtonText}>Yeni İlan Ver</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
            >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>İlan Ver</Text>
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <StepIndicator currentStep={step} />

                    <View style={styles.cardContainer}>
                        {/* STEP 1 — Temel Bilgiler */}
                        {step === 0 && (
                            <View style={styles.stepContainer}>
                                <View style={styles.stepHeader}>
                                    <Text style={styles.stepTitle}>İlan Türünü Seçin</Text>
                                    <Text style={styles.stepSubtitle}>Paylaşmak istediğiniz şeyin türünü belirleyin.</Text>
                                </View>

                                <View style={styles.categoryGrid}>
                                    <TouchableOpacity
                                        style={[styles.categoryCard, form.category === 'Physical Item' && styles.categoryCardSelected]}
                                        onPress={() => setForm({ ...form, category: 'Physical Item' })}
                                        activeOpacity={0.8}
                                    >
                                        <View style={[styles.categoryIconWrapper, form.category === 'Physical Item' ? styles.iconWrapperSelectedGreen : styles.iconWrapperDefault]}>
                                            <Package size={24} color={form.category === 'Physical Item' ? Colors.softGreen : Colors.slate500} />
                                        </View>
                                        <View style={styles.categoryTextWrapper}>
                                            <Text style={styles.categoryTitle}>Eşya</Text>
                                            <Text style={styles.categorySubtitle}>Kıyafet, kitap, mobilya vb.</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.categoryCard, form.category === 'Voluntary Service' && styles.categoryCardSelected]}
                                        onPress={() => setForm({ ...form, category: 'Voluntary Service' })}
                                        activeOpacity={0.8}
                                    >
                                        <View style={[styles.categoryIconWrapper, form.category === 'Voluntary Service' ? styles.iconWrapperSelectedGreen : styles.iconWrapperDefault]}>
                                            <HandHeart size={24} color={form.category === 'Voluntary Service' ? Colors.softGreen : Colors.slate500} />
                                        </View>
                                        <View style={styles.categoryTextWrapper}>
                                            <Text style={styles.categoryTitle}>Hizmet</Text>
                                            <Text style={styles.categorySubtitle}>Ders verme, yardım vb.</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>İlan Başlığı *</Text>
                                    <TextInput
                                        style={inputStyle('title')}
                                        value={form.title}
                                        onChangeText={(text) => setForm({ ...form, title: text })}
                                        onFocus={() => setFocusedField('title')}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="Örn: Az kullanılmış kışlık bot"
                                        placeholderTextColor={Colors.slate400}
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Açıklama *</Text>
                                    <TextInput
                                        style={[...inputStyle('description'), styles.textArea]}
                                        value={form.description}
                                        onChangeText={(text) => setForm({ ...form, description: text })}
                                        onFocus={() => setFocusedField('description')}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="İlan hakkında detaylı bilgi verin..."
                                        placeholderTextColor={Colors.slate400}
                                        multiline
                                        numberOfLines={4}
                                        textAlignVertical="top"
                                    />
                                </View>
                            </View>
                        )}

                        {/* STEP 2 — Konum & Fotoğraf */}
                        {step === 1 && (
                            <View style={styles.stepContainer}>
                                <View style={styles.stepHeader}>
                                    <Text style={styles.stepTitle}>Konum ve Fotoğraf</Text>
                                    <Text style={styles.stepSubtitle}>İlanınızın mahallesini seçin ve isteğe bağlı fotoğraf ekleyin.</Text>
                                </View>

                                {/* Neighborhood chips */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Mahalle *</Text>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={styles.chipsRow}
                                    >
                                        {neighborhoods.map((n) => {
                                            const selected = form.neighborhood === n;
                                            return (
                                                <TouchableOpacity
                                                    key={n}
                                                    style={[styles.chip, selected && styles.chipSelected]}
                                                    onPress={() => setForm({ ...form, neighborhood: n })}
                                                    activeOpacity={0.7}
                                                >
                                                    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                                                        {n}
                                                    </Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </ScrollView>
                                </View>

                                {/* Photo upload */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Fotoğraf Ekle (İsteğe Bağlı)</Text>
                                    {form.imagePreview ? (
                                        <View style={styles.imagePreviewContainer}>
                                            <Image
                                                source={{ uri: form.imagePreview }}
                                                style={styles.previewImage}
                                                contentFit="cover"
                                                transition={200}
                                            />
                                            <TouchableOpacity
                                                style={styles.removeImageButton}
                                                onPress={() => setForm({ ...form, imagePreview: null })}
                                            >
                                                <Text style={styles.removeImageText}>Kaldır</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.changeImageButton}
                                                onPress={pickImage}
                                            >
                                                <Text style={styles.changeImageText}>Değiştir</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ) : (
                                        <TouchableOpacity style={styles.uploadBox} onPress={pickImage} activeOpacity={0.7}>
                                            <Upload size={32} color={Colors.slate400} style={{ marginBottom: 12 }} />
                                            <Text style={styles.uploadMainText}>Fotoğraf eklemek için dokunun</Text>
                                            <Text style={styles.uploadSubText}>Galeriden seçin</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        )}

                        {/* STEP 3 — Önizleme */}
                        {step === 2 && (
                            <View style={styles.stepContainer}>
                                <View style={styles.stepHeader}>
                                    <Text style={styles.stepTitle}>İlanı Onayla</Text>
                                    <Text style={styles.stepSubtitle}>Yayınlamadan önce ilanınızı kontrol edin.</Text>
                                </View>

                                <View style={styles.previewCard}>
                                    {form.imagePreview ? (
                                        <Image source={{ uri: form.imagePreview }} style={styles.previewCardImage} contentFit="cover" transition={200} />
                                    ) : (
                                        <View style={styles.previewCardImagePlaceholder}>
                                            <Package size={40} color={Colors.slate300} />
                                        </View>
                                    )}
                                    <View style={styles.previewCardContent}>
                                        <View style={styles.previewBadge}>
                                            <Text style={styles.previewBadgeText}>
                                                {form.category === 'Physical Item' ? 'Eşya' : 'Hizmet'}
                                            </Text>
                                        </View>
                                        <Text style={styles.previewTitle}>{form.title || 'Başlık girilmedi'}</Text>
                                        <Text style={styles.previewDesc}>{form.description || 'Açıklama girilmedi'}</Text>
                                        <Text style={styles.previewLocation}>📍 {form.neighborhood || 'Mahalle seçilmedi'}</Text>
                                    </View>
                                </View>
                            </View>
                        )}

                        {/* Navigation buttons */}
                        <View style={styles.footerButtons}>
                            <TouchableOpacity
                                style={[styles.navButton, step === 0 && styles.navButtonDisabled]}
                                onPress={handleBack}
                                disabled={step === 0}
                            >
                                <ChevronLeft size={20} color={step === 0 ? Colors.slate400 : Colors.slate600} />
                                <Text style={[styles.navButtonText, step === 0 && styles.navButtonTextDisabled]}>Geri</Text>
                            </TouchableOpacity>

                            {step < STEPS.length - 1 ? (
                                <TouchableOpacity
                                    style={[styles.nextButton, !canProceed() && styles.nextButtonDisabled]}
                                    onPress={handleNext}
                                    disabled={!canProceed()}
                                >
                                    <Text style={styles.nextButtonText}>Devam Et</Text>
                                    <ChevronRight size={20} color={Colors.white} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                    <CheckCircle2 size={20} color={Colors.white} style={{ marginRight: 8 }} />
                                    <Text style={styles.submitButtonText}>Yayınla</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.slate50,
    },
    flex: {
        flex: 1,
    },
    header: {
        paddingTop: Spacing.x8,
        paddingBottom: Spacing.x4,
        alignItems: 'center',
        backgroundColor: Colors.slate50,
    },
    headerTitle: {
        fontSize: FontSizes['2xl'],
        fontWeight: 'bold',
        color: Colors.navyBlue,
    },
    scrollContent: {
        padding: Spacing.x4,
        paddingBottom: Spacing.x12,
    },
    cardContainer: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: Spacing.x6,
        shadowColor: Colors.slate300,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: Colors.slate200,
    },
    stepContainer: {
        marginBottom: Spacing.x6,
    },
    stepHeader: {
        marginBottom: Spacing.x6,
    },
    stepTitle: {
        fontSize: FontSizes.xl,
        fontWeight: 'bold',
        color: Colors.slate800,
        marginBottom: 4,
    },
    stepSubtitle: {
        fontSize: FontSizes.sm,
        color: Colors.slate500,
    },

    // Category cards
    categoryGrid: {
        gap: Spacing.x4,
        marginBottom: Spacing.x6,
    },
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.x4,
        borderWidth: 2,
        borderColor: Colors.slate200,
        borderRadius: 12,
        backgroundColor: Colors.white,
    },
    categoryCardSelected: {
        borderColor: Colors.softGreen,
        backgroundColor: '#f2fdf7',
    },
    categoryIconWrapper: {
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
    iconWrapperSelectedGreen: {
        backgroundColor: '#d1fae5',
    },
    categoryTextWrapper: {
        flex: 1,
    },
    categoryTitle: {
        fontSize: FontSizes.lg,
        fontWeight: 'bold',
        color: Colors.slate800,
        marginBottom: 2,
    },
    categorySubtitle: {
        fontSize: FontSizes.sm,
        color: Colors.slate500,
    },

    // Inputs
    inputGroup: {
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

    // Neighborhood chips
    chipsRow: {
        flexDirection: 'row',
        gap: Spacing.x2,
        paddingVertical: Spacing.x1,
    },
    chip: {
        paddingHorizontal: Spacing.x4,
        paddingVertical: Spacing.x2,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: Colors.slate200,
        backgroundColor: Colors.white,
    },
    chipSelected: {
        borderColor: Colors.softGreen,
        backgroundColor: '#f2fdf7',
    },
    chipText: {
        fontSize: FontSizes.sm,
        fontWeight: '500',
        color: Colors.slate500,
    },
    chipTextSelected: {
        color: Colors.softGreen,
        fontWeight: '700',
    },

    // Photo upload
    uploadBox: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: Colors.slate300,
        borderRadius: 12,
        height: 160,
        backgroundColor: Colors.slate50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadMainText: {
        fontSize: FontSizes.base,
        fontWeight: '500',
        color: Colors.slate500,
    },
    uploadSubText: {
        fontSize: FontSizes.xs,
        color: Colors.slate400,
        marginTop: 4,
    },
    imagePreviewContainer: {
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.slate200,
        height: 200,
        position: 'relative',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    removeImageButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: 'rgba(239,68,68,0.9)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    removeImageText: {
        color: Colors.white,
        fontSize: FontSizes.xs,
        fontWeight: 'bold',
    },
    changeImageButton: {
        position: 'absolute',
        top: 12,
        right: 72,
        backgroundColor: 'rgba(0,0,0,0.45)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    changeImageText: {
        color: Colors.white,
        fontSize: FontSizes.xs,
        fontWeight: 'bold',
    },

    // Preview card (step 3)
    previewCard: {
        borderWidth: 1,
        borderColor: Colors.slate200,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: Colors.white,
    },
    previewCardImage: {
        height: 200,
        width: '100%',
    },
    previewCardImagePlaceholder: {
        height: 120,
        width: '100%',
        backgroundColor: Colors.slate100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    previewCardContent: {
        padding: Spacing.x6,
    },
    previewBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#d1fae5',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
        marginBottom: Spacing.x3,
    },
    previewBadgeText: {
        color: Colors.softGreen,
        fontSize: FontSizes.xs,
        fontWeight: '700',
    },
    previewTitle: {
        fontSize: FontSizes.xl,
        fontWeight: 'bold',
        color: Colors.slate800,
        marginBottom: Spacing.x2,
    },
    previewDesc: {
        fontSize: FontSizes.base,
        color: Colors.slate600,
        marginBottom: Spacing.x4,
        lineHeight: 22,
    },
    previewLocation: {
        fontSize: FontSizes.sm,
        fontWeight: '500',
        color: Colors.navyBlue,
    },

    // Footer nav buttons
    footerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.slate100,
        paddingTop: Spacing.x6,
        marginTop: Spacing.x4,
    },
    navButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: Colors.slate200,
        borderRadius: 10,
    },
    navButtonDisabled: {
        opacity: 0.5,
    },
    navButtonText: {
        fontSize: FontSizes.base,
        fontWeight: '500',
        color: Colors.slate600,
        marginLeft: 4,
    },
    navButtonTextDisabled: {
        color: Colors.slate400,
    },
    nextButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.navyBlue,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    nextButtonDisabled: {
        opacity: 0.45,
    },
    nextButtonText: {
        fontSize: FontSizes.base,
        fontWeight: '600',
        color: Colors.white,
        marginRight: 4,
    },
    submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.softGreen,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    submitButtonText: {
        fontSize: FontSizes.base,
        fontWeight: '600',
        color: Colors.white,
    },

    // Success screen
    successContainer: {
        flex: 1,
        backgroundColor: Colors.slate50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.x8,
    },
    successIconWrapper: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: '#d1fae5',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.x6,
    },
    successTitle: {
        fontSize: FontSizes['2xl'],
        fontWeight: 'bold',
        color: Colors.slate800,
        marginBottom: Spacing.x3,
    },
    successText: {
        fontSize: FontSizes.base,
        color: Colors.slate500,
        textAlign: 'center',
        marginBottom: Spacing.x8,
        lineHeight: 24,
    },
    successButtons: {
        width: '100%',
        gap: Spacing.x4,
    },
    primaryButton: {
        backgroundColor: Colors.softGreen,
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: Colors.white,
        fontSize: FontSizes.lg,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.slate300,
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: Colors.slate700,
        fontSize: FontSizes.lg,
        fontWeight: '600',
    },
});
