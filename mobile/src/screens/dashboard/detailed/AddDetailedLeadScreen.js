import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { productCards } from '../data/productData';
import theme from '../../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import GradientButton from '../../../components/common/GradientButton';

export default function AddDetailedLeadScreen() {
    const [activeTab, setActiveTab] = useState('loans');
    const navigation = useNavigation()


    const tabs = [
        { id: 'loans', name: 'Loans' },
        { id: 'insurance', name: 'Insurance' },
        { id: 'mutual_funds', name: 'Mutual Fund' },
        { id: 'investment', name: 'Investments' },
        { id: 'real_estate', name: 'Real Estate' },
        { id: 'unlisted', name: 'Unlisted' },
    ];

    const handleNavigation = (title) => {
        const routes = {
            "Home Loans": "HomeLoanForm",
            "Personal Loans": "PersonalLoanForm",
            "Business Loan": "BusinessLoanForm",
            "Education Loan": "EducationLoanForm",
            "Mortgage Loans": "MortgageLoanForm",
            "SME": "SMELoanForm",
            "NRP Loan": "NRPLoanForm",
            "Vehicle Loan": "VehicleLoanForm",
            "Loan Against Securities / MF": "LoanAgainstSecuritiesForm"
        };
        const route = routes[title];
        if (route) {
            navigation.navigate(route);
        } else {
            console.log("No route for", title);
            Alert.alert("Coming Soon", "This form is under development.");
        }
    };

    const renderProductCard = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>

            <View style={styles.statsContainer}>
                <View style={[styles.statItem, styles.borderRight]}>
                    <Text style={styles.statNumber}>0</Text>
                    <Text style={styles.statLabel}>Active Leads</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>0</Text>
                    <Text style={styles.statLabel}>Converted</Text>
                </View>
            </View>

            <GradientButton
                onPress={() => handleNavigation(item.title)}
                title="Click to Add New"
                icon={<Ionicons name="add-circle-outline" size={18} color="white" />}
                style={{ borderRadius: 8, height: 44, paddingVertical: 0 }}
                textStyle={{ fontSize: 14, fontWeight: '700' }}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                {/* <Text style={styles.headerTitle}>Lead Management</Text> */}
                <Text style={styles.headerSubtitle}>
                </Text>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('LeadManagement')}
                >
                    <Ionicons name="arrow-back" size={16} color={theme.colors.textSecondary} />
                    <Text style={styles.backButtonText}>Back to All Leads</Text>

                </TouchableOpacity>

            </View>

            <View style={styles.tabContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab.id}
                            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
                            onPress={() => setActiveTab(tab.id)}
                        >
                            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
                                {tab.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={productCards[activeTab] || []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderProductCard}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.surface,
    },
    header: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    headerTitle: {
        ...theme.typography.h2,
        color: theme.colors.text,
        marginBottom: 4,
    },
    headerSubtitle: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        marginBottom: 16,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    backButtonText: {
        marginLeft: 8,
        color: theme.colors.textSecondary,
        fontWeight: '600',
    },
    tabContainer: {
        backgroundColor: theme.colors.surface,
        paddingVertical: 12,
    },
    tabScroll: {
        paddingHorizontal: theme.spacing.md,
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.white,
        marginRight: 8,
    },
    activeTab: {
        backgroundColor: theme.colors.brandBlue,
        borderColor: theme.colors.brandBlue,
    },
    tabText: {
        color: theme.colors.textSecondary,
        fontWeight: '500',
    },
    activeTabText: {
        color: theme.colors.white,
    },
    listContent: {
        padding: theme.spacing.md,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.md,
        padding: 20,
        marginBottom: 16,
        ...theme.shadow,
    },
    cardTitle: {
        ...theme.typography.h3,
        color: theme.colors.text,
        marginBottom: 8,
    },
    cardDescription: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        marginBottom: 20,
        lineHeight: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        backgroundColor: '#F9FAFB',
        paddingVertical: 12,
        borderRadius: 8,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    borderRight: {
        borderRightWidth: 1,
        borderRightColor: theme.colors.border,
    },
    statNumber: {
        ...theme.typography.h3,
        color: theme.colors.brandBlue,
    },
    statLabel: {
        fontSize: 11,
        color: theme.colors.textSecondary,
        textTransform: 'uppercase',
        marginTop: 2,
    },
    actionButton: {
        backgroundColor: theme.colors.brandTeal,
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    actionButtonText: {
        color: theme.colors.white,
        fontWeight: '700',
        fontSize: 14,
    },
});
