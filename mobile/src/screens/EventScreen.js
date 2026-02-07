import React from 'react';
import {
    View,   
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
    Dimensions,
    SafeAreaView,
    StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../constants/theme';

const { width } = Dimensions.get('window');

const EventScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* 📚 HEADER */}
                <View style={styles.header}>
                    <Text style={styles.title}>Knowledge Hub</Text>
                    <Text style={styles.subtitle}>Master your finances with expert insights</Text>

                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
                        <TextInput
                            placeholder="Search articles, guides..."
                            style={styles.searchInput}
                            placeholderTextColor={theme.colors.textSecondary}
                        />
                    </View>
                </View>

                {/* 🏷️ CATEGORIES */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                    {categories.map((cat, idx) => (
                        <TouchableOpacity key={idx} style={[styles.categoryBtn, idx === 0 && styles.categoryBtnActive]}>
                            <Text style={[styles.categoryText, idx === 0 && styles.categoryTextActive]}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* 🏆 FEATURED CONTENT */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Featured Guides</Text>
                    <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
                </View>

                <View style={styles.featuredList}>
                    {articles.map((item, idx) => (
                        <TouchableOpacity key={idx} style={styles.articleCard}>
                            <Image source={{ uri: item.image }} style={styles.articleImg} />
                            <View style={styles.articleContent}>
                                <View style={styles.metaRow}>
                                    <View style={[styles.tag, { backgroundColor: item.color + '15' }]}>
                                        <Text style={[styles.tagText, { color: item.color }]}>{item.category}</Text>
                                    </View>
                                    <Text style={styles.readTime}>{item.time}</Text>
                                </View>
                                <Text style={styles.articleTitle} numberOfLines={2}>{item.title}</Text>
                                <Text style={styles.articleDesc} numberOfLines={2}>{item.desc}</Text>

                                <View style={styles.cardFooter}>
                                    <View style={styles.authorGroup}>
                                        <Image source={{ uri: 'https://i.pravatar.cc/150?u=' + idx }} style={styles.authorImg} />
                                        <Text style={styles.authorName}>{item.author}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.bookmarkBtn}>
                                        <Ionicons name="bookmark-outline" size={18} color={theme.colors.textSecondary} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const categories = ['All', 'Loans', 'Investments', 'Wealth Management', 'Insurance', 'Tax Planning'];

const articles = [
    {
        title: '7 Secret Tips to Improve Your Credit Score in 2026',
        desc: 'Learn how to boost your creditworthiness and unlock better loan interest rates with these simple steps.',
        category: 'LOANS',
        time: '5 min read',
        author: 'Sarah Johnson',
        image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=800&q=80',
        color: '#3B82F6'
    },
    {
        title: 'Why Portfolio Diversification is More Important Than Ever',
        desc: 'Analyzing market trends for the upcoming quarter and how to protect your assets from volatility.',
        category: 'WEALTH',
        time: '8 min read',
        author: 'Michael Chen',
        image: 'https://images.unsplash.com/photo-1611974717482-aa8a6a284aa2?w=800&q=80',
        color: '#8B5CF6'
    },
    {
        title: 'Choosing a Life Insurance Policy: A Complete Guide',
        desc: 'Term vs Whole life? We break down everything you need to know to secure your familys future.',
        category: 'INSURANCE',
        time: '6 min read',
        author: 'David Wilson',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
        color: '#10B981'
    }
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        padding: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1E293B',
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        marginTop: 4,
        marginBottom: 20,
    },
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
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 15,
        color: '#1E293B',
    },

    categoryScroll: {
        paddingLeft: 20,
        marginBottom: 28,
    },
    categoryBtn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: '#FFF',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    categoryBtnActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748B',
    },
    categoryTextActive: {
        color: '#FFF',
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
    },
    seeAll: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.primary,
    },

    featuredList: {
        paddingHorizontal: 20,
        gap: 20,
    },
    articleCard: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        ...theme.shadow,
    },
    articleImg: {
        width: '100%',
        height: 200,
    },
    articleContent: {
        padding: 20,
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    tagText: {
        fontSize: 10,
        fontWeight: '800',
    },
    readTime: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
    },
    articleTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
        lineHeight: 24,
        marginBottom: 8,
    },
    articleDesc: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 20,
        marginBottom: 20,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F8FAFC',
        paddingTop: 16,
    },
    authorGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    authorImg: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    authorName: {
        fontSize: 13,
        fontWeight: '600',
        color: '#475569',
    },
    bookmarkBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
    }
});

export default EventScreen;
