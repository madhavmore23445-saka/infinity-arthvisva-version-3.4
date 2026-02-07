import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../constants/theme';
import { DashboardService } from '../../services/dashboardService';
import { useAuth } from '../../context/AuthContext';
// import dashboardService from '../../services/dashboardService'; // Assuming the service path

const DownloadsScreen = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [referralLeadsCount, setReferralLeadsCount] = useState(0);
    const [detailedLeadsCount, setDetailedLeadsCount] = useState(0);
    const { user } = useAuth();

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch both counts in parallel
            const [referralResponse, detailedResponse] = await Promise.all([
                DashboardService.getLeads(),
                DashboardService.getMyLeads()
            ]);

            if (referralResponse.success) {
                setReferralLeadsCount(referralResponse.count || 0);
            }

            if (detailedResponse.success) {
                setDetailedLeadsCount(detailedResponse.count || 0);
            }
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Failed to load dashboard data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const retryFetch = () => {
        fetchDashboardData();
    };

    const SummaryCard = ({ title, count, iconName, iconColor, backgroundColor }) => (
        <View style={[styles.summaryCard, { backgroundColor }]}>
            <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, { backgroundColor: iconColor }]}>
                    <Ionicons name={iconName} size={24} color={theme.colors.white} />
                </View>
                <Text style={styles.cardTitle}>{title}</Text>
            </View>
            <View style={styles.cardContent}>
                {loading ? (
                    <ActivityIndicator size="small" color={theme.colors.primary} />
                ) : error ? (
                    <Text style={styles.errorText}>-</Text>
                ) : (
                    <Text style={styles.countText}>{count}</Text>
                )}
            </View>
        </View>
    );

    if (error && !loading) {
        return (
            <View style={styles.errorContainer}>
                <Ionicons name="alert-circle-outline" size={64} color={theme.colors.error} />
                <Text style={styles.errorMessage}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={retryFetch}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.welcomeBanner}>
                <View style={styles.bannerContent}>
                    <Text style={styles.welcomeText}>Welcome back, {user?.name || 'Test'}.</Text>
                    <Text style={styles.snapshotText}>Here's a snapshot of your business performance.</Text>
                </View>
                <View style={styles.idBadge}>
                    <Text style={styles.idLabel}>ID: </Text>
                    <Text style={styles.idValue}>{user?.adv_id || 'ADV_2682'}</Text>
                </View>
                </View>

                {/* Summary Cards Section */}
                <View style={styles.summarySection}>
                    <Text style={styles.sectionTitle}>Leads Overview</Text>
                    <View style={styles.cardsContainer}>
                        <SummaryCard
                            title="Total Referral Leads"
                            count={referralLeadsCount}
                            iconName="people-outline"
                            iconColor={theme.colors.primary}
                            backgroundColor={theme.colors.surface}
                        />
                        <SummaryCard
                            title="Total Detailed Leads"
                            count={detailedLeadsCount}
                            iconName="document-text-outline"
                            iconColor={theme.colors.secondary}
                            backgroundColor={theme.colors.surface}
                        />
                    </View>
                </View>

                {/* Existing Downloads Section */}
                <View style={styles.downloadsSection}>
                    <Text style={styles.sectionTitle}>Downloads</Text>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Recent Downloads</Text>
                        <Text style={styles.cardBody}>No recent activity found.</Text>
                    </View>
                </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: theme.spacing.lg,
    },
    header: {
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
    },
    title: {
        ...theme.typography.h1,
        color: theme.colors.text,
        fontSize: 32,
        fontWeight: '700',
    },
        welcomeBanner: {
        backgroundColor: '#0D9488', // Teal-ish solid for banner
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
        position: 'relative',
        ...theme.shadow,
    },
    bannerContent: {
        marginBottom: 16,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: '800',
        color: theme.colors.white,
        letterSpacing: -0.5,
    },
    subtitle: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        fontSize: 16,
        marginTop: theme.spacing.xs,
    },
    summarySection: {
        marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
        ...theme.typography.h3,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
        fontSize: 20,
        fontWeight: '600',
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: theme.spacing.md,
    },
    summaryCard: {
        flex: 1,
        minWidth: '48%', // Ensures two cards per row with spacing
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        ...theme.shadow,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: theme.borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.sm,
    },
    cardTitle: {
        ...theme.typography.h4,
        color: theme.colors.text,
        fontSize: 14,
        fontWeight: '500',
        flex: 1,
        flexWrap: 'wrap',
    },
    cardContent: {
        alignItems: 'flex-start',
    },
    countText: {
        ...theme.typography.h1,
        color: theme.colors.text,
        fontSize: 36,
        fontWeight: '700',
        marginTop: theme.spacing.xs,
    },
    downloadsSection: {
        marginBottom: theme.spacing.xl,
    },
    card: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        ...theme.shadow,
    },
    cardBody: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        padding: theme.spacing.xl,
    },
    errorMessage: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.lg,
    },
    errorText: {
        ...theme.typography.body,
        color: theme.colors.error,
        fontSize: 24,
        fontWeight: '600',
    },
    retryButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
    },
    retryButtonText: {
        ...theme.typography.button,
        color: theme.colors.white,
        fontWeight: '600',
    },
});

export default DownloadsScreen;