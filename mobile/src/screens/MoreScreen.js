import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
    StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import theme from '../constants/theme';

const MoreScreen = () => {
    const { user, logout } = useAuth();

    const sections = [
        {
            title: 'Account & Security',
            items: [
                { id: 'profile', label: 'Edit Profile', icon: 'person-outline', color: '#3B82F6' },
                { id: 'password', label: 'Change Password', icon: 'lock-closed-outline', color: '#6366F1' },
                { id: 'notif', label: 'Notifications', icon: 'notifications-outline', color: '#F59E0B' },
            ]
        },
        {
            title: 'Partner Program',
            items: [
                { id: 'earnings', label: 'My Earnings', icon: 'wallet-outline', color: '#10B981' },
                { id: 'refer', label: 'Refer a Friend', icon: 'share-social-outline', color: '#EC4899' },
                { id: 'leads', label: 'Lead Performance', icon: 'trending-up-outline', color: '#8B5CF6' },
            ]
        },
        {
            title: 'Support & Legal',
            items: [
                { id: 'help', label: 'Help Center', icon: 'help-circle-outline', color: '#64748B' },
                { id: 'terms', label: 'Terms of Service', icon: 'document-text-outline', color: '#64748B' },
                { id: 'privacy', label: 'Privacy Policy', icon: 'shield-checkmark-outline', color: '#64748B' },
            ]
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* 👤 PROFILE HEADER */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
                            style={styles.avatar}
                        />
                        <TouchableOpacity style={styles.editAvatarBtn}>
                            <Ionicons name="camera" size={16} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>{user?.name || 'Madhav More'}</Text>
                    <Text style={styles.userEmail}>{user?.email || 'madhav@example.com'}</Text>

                    <View style={styles.badge}>
                        <Ionicons name="star" size={12} color={theme.colors.accent} />
                        <Text style={styles.badgeText}>Premium Partner</Text>
                    </View>
                </View>

                {/* 📊 QUICK STATS */}
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statVal}>128</Text>
                        <Text style={styles.statLabel}>Total Leads</Text>
                    </View>
                    <View style={[styles.statItem, styles.statBorder]}>
                        <Text style={styles.statVal}>₹45k</Text>
                        <Text style={styles.statLabel}>Earnings</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statVal}>4.8</Text>
                        <Text style={styles.statLabel}>Rating</Text>
                    </View>
                </View>

                {/* ⚙️ SETTINGS SECTIONS */}
                {sections.map((section, sIdx) => (
                    <View key={sIdx} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <View style={styles.sectionCard}>
                            {section.items.map((item, iIdx) => (
                                <TouchableOpacity
                                    key={iIdx}
                                    style={[styles.item, iIdx !== section.items.length - 1 && styles.itemBorder]}
                                >
                                    <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
                                        <Ionicons name={item.icon} size={20} color={item.color} />
                                    </View>
                                    <Text style={styles.itemLabel}>{item.label}</Text>
                                    <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

                {/* 🚪 LOGOUT */}
                <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                    <Ionicons name="log-out" size={20} color={theme.colors.error} />
                    <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableOpacity>

                <View style={styles.versionContainer}>
                    <Text style={styles.versionText}>Version 3.1.2 (Build 42)</Text>
                    <Text style={styles.copyright}>© 2026 Infinity Arthvishva</Text>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    profileHeader: {
        alignItems: 'center',
        paddingVertical: 32,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#F8FAFC',
    },
    editAvatarBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: theme.colors.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFF',
    },
    userName: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1E293B',
    },
    userEmail: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 4,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#FFF7ED',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#FFEDD5',
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#9A3412',
    },

    statsRow: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        marginTop: 12,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statBorder: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#F1F5F9',
    },
    statVal: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
    },
    statLabel: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 4,
        fontWeight: '500',
    },

    section: {
        marginTop: 24,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: '#94A3B8',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 12,
        marginLeft: 4,
    },
    sectionCard: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        ...theme.shadow,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    itemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#F8FAFC',
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    itemLabel: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: '#334155',
    },

    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        marginTop: 32,
        paddingVertical: 16,
        borderRadius: 20,
        gap: 12,
        borderWidth: 1,
        borderColor: '#FEE2E2',
        ...theme.shadow,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.colors.error,
    },

    versionContainer: {
        alignItems: 'center',
        marginTop: 32,
        paddingHorizontal: 20,
    },
    versionText: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
    },
    copyright: {
        fontSize: 11,
        color: '#CBD5E1',
        marginTop: 4,
    }
});

export default MoreScreen;
