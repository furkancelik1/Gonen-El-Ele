import { View, Text, StyleSheet } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import { Colors } from '../constants/theme';

const STEPS = ['Temel Bilgiler', 'Konum & Fotoğraf', 'Önizleme'];

export default function StepIndicator({ currentStep }: { currentStep: number }) {
    return (
        <View style={styles.container}>
            {STEPS.map((step, index) => {
                const isCompleted = index < currentStep;
                const isActive = index === currentStep;

                return (
                    <View key={step} style={styles.stepWrapper}>
                        <View style={styles.stepColumn}>
                            <View
                                style={[
                                    styles.circle,
                                    isCompleted && styles.circleCompleted,
                                    isActive && styles.circleActive,
                                    !isCompleted && !isActive && styles.circlePending,
                                ]}
                            >
                                {isCompleted ? (
                                    <CheckCircle2 size={20} color={Colors.white} />
                                ) : (
                                    <Text
                                        style={[
                                            styles.stepNumber,
                                            isActive && styles.textWhite,
                                            !isCompleted && !isActive && styles.textPending,
                                        ]}
                                    >
                                        {index + 1}
                                    </Text>
                                )}
                            </View>
                            <Text
                                style={[
                                    styles.stepLabel,
                                    isActive && styles.labelActive,
                                ]}
                            >
                                {step}
                            </Text>
                        </View>

                        {index < STEPS.length - 1 && (
                            <View
                                style={[
                                    styles.connector,
                                    isCompleted ? styles.connectorCompleted : styles.connectorPending,
                                ]}
                            />
                        )}
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    stepWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    stepColumn: {
        alignItems: 'center',
    },
    circle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
    },
    circleCompleted: {
        backgroundColor: Colors.softGreen,
        borderColor: Colors.softGreen,
    },
    circleActive: {
        backgroundColor: Colors.navyBlue,
        borderColor: Colors.navyBlue,
    },
    circlePending: {
        backgroundColor: Colors.white,
        borderColor: Colors.slate300,
    },
    stepNumber: {
        fontWeight: 'bold',
    },
    textWhite: {
        color: Colors.white,
    },
    textPending: {
        color: Colors.slate400,
    },
    stepLabel: {
        fontSize: 10,
        color: Colors.slate400,
        marginTop: 6,
        fontWeight: '500',
        textAlign: 'center',
        width: 60,
    },
    labelActive: {
        color: Colors.navyBlue,
        fontWeight: '700',
    },
    connector: {
        width: 40,
        height: 2,
        marginTop: 17,
        marginHorizontal: 8,
    },
    connectorCompleted: {
        backgroundColor: Colors.softGreen,
    },
    connectorPending: {
        backgroundColor: Colors.slate200,
    },
});
