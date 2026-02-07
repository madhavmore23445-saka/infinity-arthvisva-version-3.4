import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../../constants/theme';
import { DashboardService } from '../../../services/dashboardService';
import PortfolioFilters from './components/PortfolioFilters';
import PortfolioTable from './components/PortfolioTable';

const ClientPortfolioScreen = () => {
    const [activeTab, setActiveTab] = useState('clients'); // 'clients', 'applications', 'documents'
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedProduct, setSelectedProduct] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchClientDetails = useCallback(async (showLoading = true) => {
        try {
            if (showLoading) setLoading(true);
            const response = await DashboardService.getAllClientDetails();
            if (response.success && Array.isArray(response.data)) {
                setLeads(response.data);
            } else {
                setLeads([]);
            }
        } catch (error) {
            console.error("Failed to fetch client details", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchClientDetails();
    }, [fetchClientDetails]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchClientDetails(false);
    };

    // Reset product when category changes
    useEffect(() => {
        setSelectedProduct('All');
    }, [selectedCategory]);

    const filteredLeads = leads.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.department === selectedCategory;
        const matchesProduct = selectedProduct === 'All' || item.sub_category === selectedProduct;

        const query = searchQuery.toLowerCase();
        const matchesSearch =
            (item.lead_name && item.lead_name.toLowerCase().includes(query)) ||
            (item.lead_id && item.lead_id.toLowerCase().includes(query)) ||
            (item.contact_number && item.contact_number.includes(query)) ||
            (item.email && item.email.toLowerCase().includes(query));

        return matchesCategory && matchesProduct && matchesSearch;
    });

    const tabs = [
        { id: 'clients', name: 'Clients' },
        { id: 'applications', name: 'Applications' },
        { id: 'documents', name: 'Documents' }
    ];

    const renderTabContent = () => {
        if (activeTab === 'clients') {
            return (
                <View style={styles.tableContainer}>
                    <Text style={styles.sectionHeading}>Client Portfolio Details</Text>
                    <PortfolioTable data={filteredLeads} loading={loading} />
                </View>
            );
        }

        return (
            <View style={styles.emptyContent}>
                <Ionicons name="folder-open-outline" size={48} color={theme.colors.textSecondary} />
                <Text style={styles.emptyText}>No {activeTab} found</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.brandBlue]} />
                }
            >
                <View style={styles.content}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>My Client Portfolio</Text>
                        <Text style={styles.subtitle}>Centralized management of all clients, leads, and applications</Text>
                    </View>

                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search by Name, Lead ID, Contact..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Ionicons name="close-circle" size={20} color={theme.colors.textSecondary} />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Filters */}
                    <PortfolioFilters
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedProduct={selectedProduct}
                        setSelectedProduct={setSelectedProduct}
                    />

                    {/* Navigation Tabs */}
                    <View style={styles.tabsContainer}>
                        {tabs.map(tab => (
                            <TouchableOpacity
                                key={tab.id}
                                style={[
                                    styles.tab,
                                    activeTab === tab.id && styles.activeTab
                                ]}
                                onPress={() => setActiveTab(tab.id)}
                            >
                                <Text style={[
                                    styles.tabText,
                                    activeTab === tab.id && styles.activeTabText
                                ]}>
                                    {tab.name}
                                </Text>
                                <View style={[
                                    styles.countBadge,
                                    activeTab === tab.id ? styles.activeCountBadge : styles.inactiveCountBadge
                                ]}>
                                    <Text style={[
                                        styles.countText,
                                        activeTab === tab.id ? styles.activeCountText : styles.inactiveCountText
                                    ]}>
                                        {tab.id === 'clients' ? filteredLeads.length : 0}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Tab Content */}
                    {renderTabContent()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    header: {
        marginBottom: 32,
        marginTop: 8,
    },
    title: {
        ...theme.typography.h1,
        color: theme.colors.text,
    },
    subtitle: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        marginTop: 6,
        fontWeight: '500',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 54,
        marginBottom: 24,
        ...theme.shadow,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: theme.colors.text,
        fontWeight: '500',
    },
    tabsContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 24,
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.white,
        ...theme.shadow,
    },
    activeTab: {
        backgroundColor: theme.colors.brandBlue,
        borderColor: theme.colors.brandBlue,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.textSecondary,
    },
    activeTabText: {
        color: theme.colors.white,
    },
    countBadge: {
        marginLeft: 8,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    activeCountBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    inactiveCountBadge: {
        backgroundColor: '#F1F5F9',
    },
    countText: {
        fontSize: 11,
        fontWeight: '700',
    },
    activeCountText: {
        color: theme.colors.white,
    },
    inactiveCountText: {
        color: theme.colors.textSecondary,
    },
    tableContainer: {
        flex: 1,
        backgroundColor: theme.colors.surface,
        borderRadius: 20,
        padding: 16,
        ...theme.shadow,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    sectionHeading: {
        ...theme.typography.h3,
        color: theme.colors.text,
        marginBottom: 20,
    },
    emptyContent: {
        padding: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: 20,
        marginTop: 20,
    },
    emptyText: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        marginTop: 16,
        fontWeight: '500',
    },
});

export default ClientPortfolioScreen;
