import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Keyboard, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../../../constants/theme';
import { categories } from '../data/categories';

const FilterSelect = ({ label, value, options, onSelect }) => {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.filterGroup}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={[styles.selectBox, visible && styles.activeSelectBox]}
                onPress={() => {
                    Keyboard.dismiss();
                    setVisible(true);
                }}
            >
                <Text style={styles.selectText} numberOfLines={1}>
                    {value || 'Select'}
                </Text>
                <Ionicons name="chevron-down" size={18} color={theme.colors.textSecondary} />
            </TouchableOpacity>

            <Modal visible={visible} transparent animationType="slide">
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setVisible(false)}
                >
                    <View style={styles.pickerContainer}>
                        <View style={styles.pickerHeader}>
                            <Text style={styles.pickerTitle}>Select {label}</Text>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Ionicons name="close" size={24} color={theme.colors.text} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            {options.map((opt) => (
                                <TouchableOpacity
                                    key={opt}
                                    style={[
                                        styles.pickerOption,
                                        value === opt && styles.selectedOption
                                    ]}
                                    onPress={() => {
                                        onSelect(opt);
                                        setVisible(false);
                                    }}
                                >
                                    <Text style={[
                                        styles.pickerOptionText,
                                        value === opt && styles.selectedOptionText
                                    ]}>
                                        {opt}
                                    </Text>
                                    {value === opt && (
                                        <Ionicons name="checkmark" size={20} color={theme.colors.brandBlue} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.closeBtn}
                            onPress={() => setVisible(false)}
                        >
                            <Text style={styles.closeBtnText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const PortfolioFilters = ({
    selectedCategory,
    setSelectedCategory,
    selectedProduct,
    setSelectedProduct
}) => {
    const categoryList = Object.keys(categories);
    const productList = categories[selectedCategory] || ['All'];

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <FilterSelect
                    label="Category"
                    value={selectedCategory}
                    options={categoryList}
                    onSelect={setSelectedCategory}
                />
                <FilterSelect
                    label="Product"
                    value={selectedProduct}
                    options={productList}
                    onSelect={setSelectedProduct}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        gap: 16,
    },
    filterGroup: {
        flex: 1,
    },
    label: {
        ...theme.typography.label,
        fontSize: 11,
        color: theme.colors.textSecondary,
        marginBottom: 8,
        letterSpacing: 1,
    },
    selectBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 52,
        backgroundColor: theme.colors.white,
    },
    activeSelectBox: {
        borderColor: theme.colors.brandBlue,
        backgroundColor: '#F8FAFF',
    },
    selectText: {
        fontSize: 15,
        color: theme.colors.text,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.6)', // Deep slate overlay
        justifyContent: 'flex-end',
    },
    pickerContainer: {
        backgroundColor: theme.colors.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '70%',
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        ...theme.shadow,
    },
    pickerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    pickerTitle: {
        ...theme.typography.h3,
        color: theme.colors.text,
    },
    pickerOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#F8FAFC',
    },
    selectedOption: {
        backgroundColor: '#EFF6FF',
    },
    pickerOptionText: {
        fontSize: 16,
        color: theme.colors.text,
        fontWeight: '500',
    },
    selectedOptionText: {
        color: theme.colors.brandBlue,
        fontWeight: '700',
    },
    closeBtn: {
        padding: 18,
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        marginTop: 8,
    },
    closeBtnText: {
        ...theme.typography.label,
        color: theme.colors.textSecondary,
        fontSize: 13,
    }
});

export default PortfolioFilters;
