import { Modal, Pressable, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckCircle, MessageCircle, Phone } from 'lucide-react-native';
import { Colors, FontSizes, Spacing } from '../constants/theme';

interface ActionModalProps {
    visible: boolean;
    isVoluntary: boolean;
    onClose: () => void;
}

export default function ActionModal({ visible, isVoluntary, onClose }: ActionModalProps) {
    return (
        <Modal
            animationType="slide"
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
            <Pressable style={styles.backdrop} onPress={onClose}>
                <Pressable style={styles.sheet} onPress={() => {}}>
                    <View style={styles.dragHandle} />

                    <View style={styles.iconWrapper}>
                        {isVoluntary ? (
                            <CheckCircle size={48} color={Colors.softGreen} />
                        ) : (
                            <MessageCircle size={48} color={Colors.navyBlue} />
                        )}
                    </View>

                    <Text style={styles.title}>
                        {isVoluntary ? 'Harika! Görevi Üstlendin 🎉' : 'İletişim Bilgileri'}
                    </Text>

                    <Text style={styles.description}>
                        {isVoluntary
                            ? "Gönen'de birine yardımcı olduğun için teşekkürler. Detaylar için ilan sahibiyle iletişime geçebilirsin:"
                            : 'İlan sahibiyle aşağıdaki numaradan iletişime geçerek eşyayı teslim alabilirsin:'}
                    </Text>

                    <View style={styles.phoneRow}>
                        <Phone size={20} color={Colors.softGreen} style={styles.phoneIcon} />
                        <Text style={styles.phoneNumber}>0555 123 45 67</Text>
                    </View>

                    <TouchableOpacity style={styles.closeButton} activeOpacity={0.7} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Kapat</Text>
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: Spacing.x6,
        paddingTop: Spacing.x3,
        paddingBottom: Spacing.x10,
        alignItems: 'center',
    },
    dragHandle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.slate200,
        marginBottom: Spacing.x6,
    },
    iconWrapper: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.slate50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.x4,
    },
    title: {
        fontSize: FontSizes.xl,
        fontWeight: '700',
        color: Colors.slate800,
        textAlign: 'center',
        marginBottom: Spacing.x3,
    },
    description: {
        fontSize: FontSizes.sm,
        color: Colors.slate500,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: Spacing.x6,
    },
    phoneRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.slate50,
        borderWidth: 1,
        borderColor: Colors.slate200,
        borderRadius: 12,
        paddingVertical: Spacing.x4,
        paddingHorizontal: Spacing.x6,
        width: '100%',
        marginBottom: Spacing.x6,
    },
    phoneIcon: {
        marginRight: Spacing.x3,
    },
    phoneNumber: {
        fontSize: FontSizes.lg,
        fontWeight: '700',
        color: Colors.slate800,
        letterSpacing: 1,
    },
    closeButton: {
        width: '100%',
        backgroundColor: Colors.slate100,
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: FontSizes.base,
        fontWeight: '600',
        color: Colors.slate600,
    },
});
