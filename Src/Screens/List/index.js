/**
 * @List_Screen
 */

import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    Image,
} from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Header } from 'react-native-elements';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import styles from './style';
import FastImage from 'react-native-fast-image'
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { giphySearchApi } from '../../Constant/ApiList';
import {API_KEY} from '@env';

const UserListScreen = (props) => {
    const [loading, setLoading] = useState(true)
    const [limit, setLimit] = useState(20);
    const [gifs, setGifs] = useState([]);
    const [gifs2, setGifs2] = useState([]);
    const [gifs3, setGifs3] = useState([]);
    const [gifs4, setGifs4] = useState([]);
    const [gifs5, setGifs5] = useState([]);
    const [selectedGrid, setSelectedGrid] = useState(true);

    const [pagination, setPagination] = useState({
        offset1: 0,
        offset2: 0,
        offset3: 0,
        offset4: 0,
        offset5: 0,

    })
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [term, setTerm] = useState("Trending");

    useEffect(() => {
        fetchGifs()
    }, [selectedIndex])

    async function fetchGifs() {

        try {
            var offsetValue
            if (selectedIndex == 0) {
                offsetValue = pagination.offset1;
            } else if (selectedIndex == 1) {
                offsetValue = pagination.offset2;
            } else if (selectedIndex == 2) {
                offsetValue = pagination.offset3;
            } else if (selectedIndex == 3) {
                offsetValue = pagination.offset4;
            } else {
                offsetValue = pagination.offset5
            }

            const URL = `${giphySearchApi}?api_key=${API_KEY}&q=${term}&offset=${offsetValue}&limit=${limit}`;
            const resJson = await fetch(URL);

            const res = await resJson.json();
            setLoading(false)
            var updatePagination = { ...pagination };

            if (selectedIndex == 0) {
                updatePagination.offset1 = pagination.offset1 + limit;
                setGifs([...gifs, ...res.data]);
            } else if (selectedIndex == 1) {
                updatePagination.offset2 = pagination.offset2 + limit;
                setGifs2([...gifs2, ...res.data]);
            } else if (selectedIndex == 2) {
                updatePagination.offset3 = pagination.offset3 + limit;
                setGifs3([...gifs3, ...res.data]);
            } else if (selectedIndex == 3) {
                updatePagination.offset4 = pagination.offset4 + limit;
                setGifs4([...gifs4, ...res.data]);
            } else {
                updatePagination.offset5 = pagination.offset5 + limit;
                setGifs5([...gifs5, ...res.data]);
            }

            setPagination(updatePagination)

        } catch (error) {
            console.warn(error);
        }
    }
    const renderItem = ({ item, index }) => {
        return (
            <View style={{ margin: 10 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate("Details", { item })}>
                    <FastImage
                        style={{ width: widthPercentageToDP(45), height: 150, backgroundColor: '#f1f1f1' }}
                        source={{
                            uri: item.images.original.url,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </TouchableOpacity>
                <Text numberOfLines={1} style={{ color: '#ffffff', fontSize: 13 }}>
                    {item.title.length > 25
                        ? `${item.title.substring(0, 25)}...`
                        : `${item.title}`}
                </Text>

            </View>
        )
    }

    const renderItem2 = ({ item, index }) => {
        return (
            <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => props.navigation.navigate("Details", { item })}>
                    <FastImage
                        style={{ width: 50, height: 50, backgroundColor: '#f1f1f1' }}
                        source={{
                            uri: item.images.original.url,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </TouchableOpacity>
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Details", { item })}>
                        <Text numberOfLines={1} style={{ color: '#ffffff', fontSize: 13 }}>
                            {item.title.length > 48
                                ? `${item.title.substring(0, 48)}...`
                                : `${item.title}`
                            }
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    const footer = () => {
        return (
            <View style={{ alignSelf: 'center' }}>
                <ActivityIndicator color="#f1f1f1" />
            </View>
        );
    };

    const handleClick = (selectedKey, selectedTerm) => {
        setTerm(selectedTerm)
        setSelectedIndex(selectedKey)
    };

    const renderHeader = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 20 }}>
                <TouchableOpacity style={{ backgroundColor: selectedIndex == 0 ? '#f1f1f1' : null, padding: 5, borderRadius: 20 }}
                    onPress={() => handleClick(0, "trending")}
                >
                    <Text style={{ color: selectedIndex == 0 ? '#000000' : '#ffffff' }}>TRENDING</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: selectedIndex == 1 ? '#f1f1f1' : null, padding: 5, borderRadius: 20 }}
                    onPress={() => handleClick(1, "haha")}
                >
                    <Text style={{ color: selectedIndex == 1 ? '#000000' : '#ffffff' }}>HAHA</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: selectedIndex == 2 ? '#f1f1f1' : null, padding: 5, borderRadius: 20 }}
                    onPress={() => handleClick(2, "sad")}
                >
                    <Text style={{ color: selectedIndex == 2 ? '#000000' : '#ffffff' }}>SAD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: selectedIndex == 3 ? '#f1f1f1' : null, padding: 5, borderRadius: 20 }}
                    onPress={() => handleClick(3, "love")}
                >
                    <Text style={{ color: selectedIndex == 3 ? '#000000' : '#ffffff' }}>LOVE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: selectedIndex == 4 ? '#f1f1f1' : null, padding: 5, borderRadius: 20 }}
                    onPress={() => handleClick(4, "reaction")}
                >
                    <Text style={{ color: selectedIndex == 4 ? '#000000' : '#ffffff' }}>REACTION</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Header
                centerComponent={{ text: 'List', style: { fontSize: 20, color: '#fff' } }}
                containerStyle={styles.headerContainer}
                statusBarProps={{ backgroundColor: 'transparent', barStyle: 'light-content' }}
                leftComponent={<Icon name={selectedGrid ? 'grid' : 'list'}
                    type='feather'
                    onPress={() => setSelectedGrid(!selectedGrid)}
                    color='#ffffff' />
                }

            />
            {
                (loading) ?
                    <View style={styles.loadingView}>
                        <ActivityIndicator size="large" color="#f1f1f1" />
                    </View>
                    :
                    <View style={{ flex: 1, }}>
                        {(gifs.length > 0) ?
                            selectedGrid ?
                                <FlatList
                                    key={'_'}
                                    data={selectedIndex == 0 ? gifs : selectedIndex == 1 ? gifs2 : selectedIndex == 2 ? gifs3 : selectedIndex == 3 ? gifs4 : selectedIndex == 4 ? gifs5 : []}
                                    renderItem={renderItem}
                                    contentContainerStyle={{ paddingBottom: 100 }}
                                    keyExtractor={(item, index) => 'key' + index}
                                    showsVerticalScrollIndicator={false}
                                    removeClippedSubviews
                                    numColumns={2}
                                    ListHeaderComponent={renderHeader}
                                    onEndReachedThreshold={0.5}
                                    onEndReached={({ }) => {
                                        fetchGifs(false)
                                    }}
                                    ListFooterComponent={footer}
                                    stickyHeaderIndices={[0]}
                                />
                                :
                                <FlatList
                                    key={'#'}
                                    data={selectedIndex == 0 ? gifs : selectedIndex == 1 ? gifs2 : selectedIndex == 2 ? gifs3 : selectedIndex == 3 ? gifs4 : selectedIndex == 4 ? gifs5 : []}
                                    renderItem={renderItem2}
                                    contentContainerStyle={{ paddingBottom: 100 }}
                                    keyExtractor={(item, index) => 'key' + index}
                                    showsVerticalScrollIndicator={false}
                                    removeClippedSubviews
                                    ListHeaderComponent={renderHeader}
                                    onEndReachedThreshold={0.5}
                                    onEndReached={({ }) => {
                                        fetchGifs(false)
                                    }}
                                    ListFooterComponent={footer}
                                    stickyHeaderIndices={[0]}
                                />
                            :
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#ffffff' }}>Data not found!</Text>
                            </View>
                        }
                    </View>
            }
        </View>
    );
};

export default UserListScreen;
