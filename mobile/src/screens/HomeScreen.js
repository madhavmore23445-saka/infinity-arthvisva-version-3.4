import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    StatusBar,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../constants/theme';
import GradientButton from '../components/common/GradientButton';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar barStyle="dark-content" />

            {/* 🌅 GREETING SECTION */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Good Morning,</Text>
                    <Text style={styles.userName}>Madhav More</Text>
                </View>
                <TouchableOpacity style={styles.notifBtn}>
                    <Ionicons name="notifications-outline" size={24} color={theme.colors.text} />
                    <View style={styles.notifDot} />
                </TouchableOpacity>
            </View>

            {/* 🔥 QUICK ACTIONS */}
            <View style={styles.quickActions}>
                <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('LeadManagement')}>
                    <View style={[styles.actionIcon, { backgroundColor: '#EEF2FF' }]}>
                        <Ionicons name="people" size={22} color={theme.colors.primary} />
                    </View>
                    <Text style={styles.actionText}>Leads</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem}>
                    <View style={[styles.actionIcon, { backgroundColor: '#F0FDF4' }]}>
                        <Ionicons name="briefcase" size={22} color={theme.colors.success} />
                    </View>
                    <Text style={styles.actionText}>Portfolio</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem}>
                    <View style={[styles.actionIcon, { backgroundColor: '#FFF7ED' }]}>
                        <Ionicons name="pie-chart" size={22} color={theme.colors.accent} />
                    </View>
                    <Text style={styles.actionText}>Reports</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem}>
                    <View style={[styles.actionIcon, { backgroundColor: '#FDF2F8' }]}>
                        <Ionicons name="rocket" size={22} color="#DB2777" />
                    </View>
                    <Text style={styles.actionText}>Explore</Text>
                </TouchableOpacity>
            </View>

            {/* 🔹 HERO BANNER */}
            <View style={styles.heroCard}>
                <View style={styles.heroTextContainer}>
                    <View style={styles.heroBadge}>
                        <Text style={styles.heroBadgeText}>OFFER OF THE MONTH</Text>
                    </View>
                    <Text style={styles.heroTitle}>Unlock Your Dream Home</Text>
                    <Text style={styles.heroSubtitle}>Interest rates starting at just 8.4%* for early applicants.</Text>
                    {/* <GradientButton
                        title="Apply Now"
                        onPress={() => { }}
                        colors={['#FFF', '#F8FAFC']}
                        textStyle={{ color: theme.colors.primary, fontSize: 13, fontWeight: '700' }}
                        icon={<Ionicons name="arrow-forward" size={16} color={theme.colors.primary} />}
                        style={{ alignSelf: 'flex-start', paddingVertical: 0, paddingHorizontal: 0, height: 46, borderRadius: 10 }}
                    /> */}
                </View>
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135706.png' }}
                    style={styles.heroImg}
                />
            </View>

            {/* 📈 DYNAMIC INSIGHTS */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Financial Insights</Text>
                <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.insightScroll}>
                {insights.map((item, idx) => (
                    <TouchableOpacity key={idx} style={styles.insightCard}>
                        <View style={[styles.insightType, { backgroundColor: item.color }]}>
                            <Text style={styles.insightTypeText}>{item.type}</Text>
                        </View>
                        <Text style={styles.insightTitle}>{item.title}</Text>
                        <Text style={styles.insightDesc}>{item.desc}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* 🔹 SERVICES SECTION */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Main Services</Text>
            </View>
            <View style={styles.grid}>
                {services.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.gridItem}>
                        <View style={styles.gridIconContainer}>
                            <Image source={{ uri: item.image }} style={styles.gridImage} />
                        </View>
                        <Text style={styles.gridText}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
};

const insights = [
    { type: 'TIPS', title: 'Plan Your Retirement', desc: 'Secure your future with early SIP investments.', color: '#3B82F6' },
    { type: 'MARKET', title: 'Interest Rate Update', desc: 'Recent home loan rates dropped by 0.25%.', color: '#10B981' },
    { type: 'WEALTH', title: 'Equity Analysis', desc: 'Tech stocks show resilience in Q1 2026.', color: '#8B5CF6' }
];

const services = [
    { title: 'Home Loans', image: 'https://cdn-icons-png.flaticon.com/512/619/619153.png' },
    { title: 'Vehicle Loans', image: 'https://cdn-icons-png.flaticon.com/512/741/741407.png' },
    { title: 'Education', image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
    { title: 'Business', image: 'https://cdn-icons-png.flaticon.com/512/3135/3135679.png' },
    { title: 'Investments', image: 'https://cdn-icons-png.flaticon.com/512/3135/3135706.png' },
    { title: 'Insurance', image: 'https://cdn-icons-png.flaticon.com/512/2966/2966487.png' }
];

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        marginBottom: 24,
    },
    greeting: { fontSize: 14, color: '#64748B', fontWeight: '500' },
    userName: { fontSize: 22, fontWeight: '700', color: '#1E293B', marginTop: 2 },
    notifBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    notifDot: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#EF4444',
        borderWidth: 2,
        borderColor: '#FFF',
    },

    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 28,
    },
    actionItem: { alignItems: 'center' },
    actionIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        ...theme.shadow,
    },
    actionText: { fontSize: 13, fontWeight: '600', color: '#475569' },

    heroCard: {
        flexDirection: 'row',
        backgroundColor: '#1E40AF',
        marginHorizontal: 20,
        borderRadius: 24,
        padding: 20,
        marginBottom: 32,
        overflow: 'hidden',
    },
    heroTextContainer: { flex: 1.5, zIndex: 2 },
    heroBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    heroBadgeText: { fontSize: 10, fontWeight: '800', color: '#FFF' },
    heroTitle: { fontSize: 20, fontWeight: '800', color: '#FFF', marginBottom: 8 },
    heroSubtitle: { fontSize: 13, color: '#BFDBFE', lineHeight: 18, marginBottom: 16 },
    heroBtn: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        alignSelf: 'flex-start',
        gap: 6,
    },
    heroBtnText: { fontSize: 13, fontWeight: '700', color: theme.colors.primary },
    heroImg: { width: 100, height: 100, position: 'absolute', right: -10, bottom: -10, opacity: 0.8 },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
    seeAll: { fontSize: 13, fontWeight: '600', color: theme.colors.primary },

    insightScroll: { paddingLeft: 20, marginBottom: 32 },
    insightCard: {
        width: width * 0.65,
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 16,
        marginRight: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        ...theme.shadow,
    },
    insightType: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 12 },
    insightTypeText: { fontSize: 10, fontWeight: '800', color: '#FFF' },
    insightTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B', marginBottom: 6 },
    insightDesc: { fontSize: 13, color: '#64748B', lineHeight: 18 },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
        justifyContent: 'space-between',
    },
    gridItem: { width: '33.33%', padding: 8, alignItems: 'center', marginBottom: 12 },
    gridIconContainer: {
        width: 68,
        height: 68,
        backgroundColor: '#FFF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        ...theme.shadow,
    },
    gridImage: { width: 36, height: 36, resizeMode: 'contain' },
    gridText: { fontSize: 12, fontWeight: '600', color: '#475569', textAlign: 'center' },
});

export default HomeScreen;
