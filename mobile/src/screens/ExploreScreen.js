import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../constants/theme';

const { width } = Dimensions.get('window');

const ExploreScreen = () => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* 🔍 SEARCH HEADER */}
            <View style={styles.header}>
                <Text style={styles.title}>Explore</Text>
                <Text style={styles.subtitle}>Discover services & financial tools</Text>

                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
                    <TextInput
                        placeholder="Search for loans, insurance..."
                        style={styles.searchInput}
                        placeholderTextColor={theme.colors.textSecondary}
                    />
                </View>
            </View>

            {/* 🔥 TRENDING TOPICS */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Trending Financial Topics</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trendingScroll}>
                    {trending.map((item, idx) => (
                        <TouchableOpacity key={idx} style={styles.trendingCard}>
                            <Image source={{ uri: item.image }} style={styles.trendingImg} />
                            <View style={styles.trendingInfo}>
                                <Text style={styles.trendingTitle}>{item.title}</Text>
                                <View style={styles.trendingMeta}>
                                    <Ionicons name="time-outline" size={12} color="#94A3B8" />
                                    <Text style={styles.trendingTime}>{item.time}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* 🧮 FINANCIAL TOOLS */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Smart Calculators</Text>
                <View style={styles.toolsGrid}>
                    {tools.map((item, idx) => (
                        <TouchableOpacity key={idx} style={styles.toolItem}>
                            <View style={[styles.toolIcon, { backgroundColor: item.bg }]}>
                                <Ionicons name={item.icon} size={24} color={item.color} />
                            </View>
                            <Text style={styles.toolLabel}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* 🎁 PROMO BANNER */}
            <View style={styles.promoBanner}>
                <View style={styles.promoText}>
                    <Text style={styles.promoTitle}>Exclusive Partner Program</Text>
                    <Text style={styles.promoDesc}>Refer detailed leads and earn up to 1.5% commission.</Text>
                    <TouchableOpacity style={styles.promoBtn}>
                        <Text style={styles.promoBtnText}>View Details</Text>
                    </TouchableOpacity>
                </View>
                <Ionicons name="gift" size={60} color="rgba(255,255,255,0.2)" style={styles.promoIcon} />
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
};

const trending = [
    { title: 'Tax Saving Tips 2026', time: '5 min read', image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=500&auto=format&fit=crop&q=60' },
    { title: 'Choosing the Right Mutual Fund', time: '8 min read', image: 'https://images.unsplash.com/photo-1611974717482-aa8a6a284aa2?w=500&auto=format&fit=crop&q=60' },
    { title: 'Understanding SIP Benefits', time: '4 min read', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&auto=format&fit=crop&q=60' }
];

const tools = [
    { label: 'EMI Calc', icon: 'calculator', color: '#3B82F6', bg: '#EFF6FF' },
    { label: 'SIP Plan', icon: 'trending-up', color: '#10B981', bg: '#F0FDF4' },
    { label: 'Tax Tool', icon: 'receipt', color: '#F59E0B', bg: '#FFFBEB' },
    { label: 'PPF Calc', icon: 'wallet', color: '#8B5CF6', bg: '#F5F3FF' }
];

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    header: { padding: 20, paddingTop: 40 },
    title: { fontSize: 28, fontWeight: '800', color: '#1E293B' },
    subtitle: { fontSize: 16, color: '#64748B', marginTop: 4, marginBottom: 20 },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: 52,
        borderRadius: 16,
        paddingHorizontal: 16,
        ...theme.shadow,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    searchInput: { flex: 1, marginLeft: 12, fontSize: 15, color: '#1E293B' },

    section: { marginTop: 28 },
    sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B', paddingHorizontal: 20, marginBottom: 16 },

    trendingScroll: { paddingLeft: 20 },
    trendingCard: {
        width: width * 0.45,
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginRight: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        ...theme.shadow,
    },
    trendingImg: { width: '100%', height: 110 },
    trendingInfo: { padding: 12 },
    trendingTitle: { fontSize: 14, fontWeight: '700', color: '#1E293B', height: 40 },
    trendingMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 4 },
    trendingTime: { fontSize: 11, color: '#94A3B8', fontWeight: '500' },

    toolsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12 },
    toolItem: {
        width: (width - 44) / 2,
        backgroundColor: '#FFF',
        borderRadius: 18,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        ...theme.shadow,
    },
    toolIcon: { width: 52, height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    toolLabel: { fontSize: 13, fontWeight: '700', color: '#475569' },

    promoBanner: {
        margin: 20,
        backgroundColor: '#4F46E5',
        borderRadius: 24,
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
    },
    promoText: { flex: 1, zIndex: 2 },
    promoTitle: { fontSize: 18, fontWeight: '800', color: '#FFF', marginBottom: 6 },
    promoDesc: { fontSize: 13, color: '#E0E7FF', lineHeight: 20, marginBottom: 16 },
    promoBtn: { backgroundColor: '#FFF', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 10, alignSelf: 'flex-start' },
    promoBtnText: { fontSize: 13, fontWeight: '700', color: '#4F46E5' },
    promoIcon: { position: 'absolute', right: -10, bottom: -10 },
});

export default ExploreScreen;
