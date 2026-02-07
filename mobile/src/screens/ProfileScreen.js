import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import theme from '../constants/theme';
import GradientButton from '../components/common/GradientButton';

const ProfileScreen = () => {
    const { user, logout, fetchUserProfile } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false); // Initial load is handled by context usually, but good to have local state for refresh
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const fetchProfile = async () => {
        try {
            setError(null);
            // Use context function instead of local axios
            const result = await fetchUserProfile();

            if (result.success && result.user) {
                setProfileData(result.user);
            } else {
                setError(result.message || 'Failed to fetch profile data');
            }
        } catch (err) {
            console.error('Error fetching profile:', err);
            setError('Error connecting to server');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        // If we already have user data from context, use it. 
        // But also fetch fresh data on mount to ensure it's up to date.
        if (user) {
            setProfileData(user);
        }
        setLoading(true);
        fetchProfile();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchProfile();
    };

    const renderDetailItem = (icon, label, value) => (
        <View style={styles.detailItem}>
            <View style={styles.iconContainer}>
                <Ionicons name={icon} size={22} color={theme.colors.primary} />
            </View>
            <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>{label}</Text>
                <Text style={styles.detailValue}>{value || 'N/A'}</Text>
            </View>
        </View>
    );

    if (loading && !refreshing) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.loadingText}>Fetching profile...</Text>
            </View>
        );
    }

    if (error && !profileData) {
        return (
            <View style={styles.loadingContainer}>
                <Ionicons name="alert-circle-outline" size={50} color={theme.colors.error} />
                <Text style={styles.errorText}>{error}</Text>
                <GradientButton
                    title="Retry"
                    onPress={fetchProfile}
                    style={{ marginTop: theme.spacing.lg, paddingHorizontal: theme.spacing.xl, width: 150 }}
                />
            </View>
        );
    }

    // Use fetched data first, fallback to context user if necessary
    const displayUser = profileData || user;

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />
            }
        >
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>{displayUser?.name?.charAt(0) || 'U'}</Text>
                </View>
                <Text style={styles.userName}>{displayUser?.name || 'User Name'}</Text>
                <Text style={styles.userEmail}>{displayUser?.email || 'user@example.com'}</Text>
                {displayUser?.adv_id && (
                    <View style={styles.idBadge}>
                        <Text style={styles.idBadgeText}>{displayUser.adv_id}</Text>
                    </View>
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <View style={styles.card}>
                    {renderDetailItem('person-outline', 'Full Name', displayUser?.name)}
                    {renderDetailItem('mail-outline', 'Email Address', displayUser?.email)}
                    {renderDetailItem('call-outline', 'Phone Number', displayUser?.mobile || displayUser?.phone)}
                    {renderDetailItem('card-outline', 'PAN Number', displayUser?.pan)}
                    {renderDetailItem('location-outline', 'City', displayUser?.city)}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Professional Details</Text>
                <View style={styles.card}>
                    {renderDetailItem('briefcase-outline', 'Areas of Focus', displayUser?.head)}
                    {renderDetailItem('options-outline', 'Categories', displayUser?.category)}
                    {renderDetailItem('calendar-outline', 'Date Joined', displayUser?.date_joined ? new Date(displayUser.date_joined).toLocaleDateString() : 'N/A')}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account Settings</Text>
                <View style={styles.card}>

                    {/* logout in profile */}
                    <TouchableOpacity style={styles.settingItem} onPress={logout}>
                        <Ionicons name="chevron-forward" size={22} color={theme.colors.primary} />
                        <Text
                            style={[styles.settingText, { color: theme.colors.primary }]}
                        >
                            Logout
                        </Text>
                        <Ionicons name="chevron-forward" size={20} color={theme.colors.primary} />
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.settingItem}>
                        <Ionicons name="notifications-outline" size={22} color={theme.colors.text} />
                        <Text style={styles.settingText}>Notifications</Text>
                        <Ionicons name="chevron-forward" size={20} color={theme.colors.border} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}>
                        <Ionicons name="lock-closed-outline" size={22} color={theme.colors.text} />
                        <Text style={styles.settingText}>Privacy & Security</Text>
                        <Ionicons name="chevron-forward" size={20} color={theme.colors.border} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}>
                        <Ionicons name="help-circle-outline" size={22} color={theme.colors.text} />
                        <Text style={styles.settingText}>Help Support</Text>
                        <Ionicons name="chevron-forward" size={20} color={theme.colors.border} />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        alignItems: 'center',
        paddingVertical: theme.spacing.xl,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        ...theme.shadow,
    },
    avatarText: {
        fontSize: 40,
        color: theme.colors.white,
        fontWeight: 'bold',
    },
    userName: {
        ...theme.typography.h2,
        color: theme.colors.text,
    },
    userEmail: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        marginTop: 4,
    },
    idBadge: {
        backgroundColor: theme.colors.inactiveTab,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        marginTop: 8,
    },
    idBadgeText: {
        color: theme.colors.primary,
        fontSize: 12,
        fontWeight: '700',
    },
    section: {
        padding: theme.spacing.lg,
    },
    sectionTitle: {
        ...theme.typography.label,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
    },
    card: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        overflow: 'hidden',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.surface,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    detailContent: {
        flex: 1,
    },
    detailLabel: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
    },
    detailValue: {
        ...theme.typography.body,
        color: theme.colors.text,
        fontWeight: '500',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.surface,
    },
    settingText: {
        flex: 1,
        ...theme.typography.body,
        marginLeft: theme.spacing.md,
        color: theme.colors.text,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
    loadingText: {
        marginTop: theme.spacing.md,
        color: theme.colors.textSecondary,
        ...theme.typography.body,
    },
    errorText: {
        marginTop: theme.spacing.md,
        color: theme.colors.error,
        textAlign: 'center',
        paddingHorizontal: theme.spacing.xl,
        ...theme.typography.body,
    },
    retryButton: {
        marginTop: theme.spacing.lg,
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.md,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.md,
    },
    retryText: {
        color: theme.colors.white,
        fontWeight: '700',
    },
});

export default ProfileScreen;