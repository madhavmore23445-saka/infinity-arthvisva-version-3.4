import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import theme from '../../../../constants/theme';

const PortfolioTable = ({ data, loading }) => {
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const ListHeader = () => (
        <View style={styles.headerRow}>
            <Text style={[styles.headerCell, styles.idCol]}>Lead ID</Text>
            <Text style={[styles.headerCell, styles.sourceCol]}>Source</Text>
            <Text style={[styles.headerCell, styles.nameCol]}>Client Name</Text>
            <Text style={[styles.headerCell, styles.contactCol]}>Contact Details</Text>
            <Text style={[styles.headerCell, styles.deptCol]}>Dept / Sub-Cat</Text>
            <Text style={[styles.headerCell, styles.dateCol]}>Created At</Text>
        </View>
    );

    const renderItem = ({ item, index }) => (
        <View style={[styles.row, index % 2 === 1 && { backgroundColor: theme.colors.rowAlternate }]}>
            <Text style={[styles.cell, styles.idCol, styles.boldText]}>{item.lead_id}</Text>
            <View style={[styles.cell, styles.sourceCol]}>
                <View style={[
                    styles.badge,
                    item.source?.toLowerCase().includes('referral') ? styles.referralBadge : styles.detailedBadge
                ]}>
                    <Text style={[
                        styles.badgeText,
                        item.source?.toLowerCase().includes('referral') ? styles.referralBadgeText : styles.detailedBadgeText
                    ]}>
                        {item.source}
                    </Text>
                </View>
            </View>
            <Text style={[styles.cell, styles.nameCol]} numberOfLines={1}>{item.lead_name}</Text>
            <View style={[styles.cell, styles.contactCol]}>
                <Text style={styles.cellText}>{item.contact_number}</Text>
                <Text style={styles.subCellText}>{item.email}</Text>
            </View>
            <View style={[styles.cell, styles.deptCol]}>
                <Text style={styles.cellText}>{item.department}</Text>
                <Text style={styles.subCellText}>{item.sub_category}</Text>
            </View>
            <Text style={[styles.cell, styles.dateCol]}>{formatDate(item.created_at)}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Loading records...</Text>
            </View>
        );
    }

    return (
        <View style={styles.tableWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.lead_id || Math.random().toString()}
                    ListHeaderComponent={ListHeader}
                    stickyHeaderIndices={[0]}
                    renderItem={renderItem}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyText}>No records found</Text>
                        </View>
                    )}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    tableWrapper: {
        flex: 1,
        borderRadius: 12,
        backgroundColor: theme.colors.white,
        overflow: 'hidden',
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#F1F5F9', // slate-100
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    headerCell: {
        ...theme.typography.label,
        fontSize: 10,
        color: '#475569', // slate-600
        paddingHorizontal: 12,
        fontWeight: '800',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 18,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        backgroundColor: theme.colors.white,
        alignItems: 'center',
    },
    cell: {
        paddingHorizontal: 12,
    },
    cellText: {
        ...theme.typography.body,
        fontSize: 14,
        color: theme.colors.text,
        fontWeight: '500',
    },
    subCellText: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
    boldText: {
        fontWeight: '700',
        color: theme.colors.brandBlue,
        fontSize: 14,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 100,
        alignSelf: 'flex-start',
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    referralBadge: {
        backgroundColor: theme.colors.badgeReferralBg,
    },
    referralBadgeText: {
        color: theme.colors.badgeReferralText,
    },
    detailedBadge: {
        backgroundColor: theme.colors.badgeDetailedBg,
    },
    detailedBadgeText: {
        color: theme.colors.badgeDetailedText,
    },
    // Column Widths
    idCol: { width: 140 },
    sourceCol: { width: 130 },
    nameCol: { width: 180 },
    contactCol: { width: 220 },
    deptCol: { width: 180 },
    dateCol: { width: 120 },

    emptyState: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: theme.colors.textSecondary,
        fontSize: 15,
        fontWeight: '500',
    },
});

export default PortfolioTable;
