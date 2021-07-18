/**
 * @Details
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    Share,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import styles from './style';

const UserDetails = (props) => {
    const { item } = props.route.params;
    console.log(item)
    const onSharePress = () => {
        Share.share({
            title: 'Share GIF',
            message: item.images.original.url
        }).then((res) => console.log(res))
            .catch((error) => console.log(error))
    }

    return (
        <View style={styles.container}>
            <Header
                leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => props.navigation.goBack() }}
                centerComponent={{ text: "Details", style: { fontSize: 20, color: '#fff' } }}
                containerStyle={styles.headerContainer}
                statusBarProps={{ backgroundColor: 'transparent', barStyle: 'light-content' }}
            />

            <View style={styles.container2}>
                <View>
                    <FastImage
                        style={{ width: widthPercentageToDP(100), height: 200 }}
                        source={{
                            uri: item.images.original.url,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <View style={{ ...styles.sideContainer, justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ ...styles.sideContainer, margin: 0 }}>
                           {( item.user && item.user.avatar_url ) && <FastImage
                                style={{ width: 50, height: 50 }}
                                source={{
                                    uri: item.user.avatar_url,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.contain}
                            />}

                            <View style={{ marginLeft: 20 }}>
                                {
                                    (item.user && item.user.display_name) &&
                                    <Text style={{ color: '#fff', fontWeight: '600' }}>{item.user.display_name}</Text>
                                    }
                                    {
                                      ( item.user && item.user.username )&& 
                                <Text style={{ color: '#fff' }}>@{item.user.username}</Text>

                                    }
                            </View>
                        </View>
                        <View style={{ ...styles.sideContainer, margin: 0 }}>
                            <Icon
                                name="telegram"
                                type="material-community"
                                color="#ffffff"
                                onPress={() => onSharePress()}
                            />
                        </View>
                     
                    </View>
                   { item.user && item.user.description && <Text style={{ color: '#fff', margin: 20 }}>{item.user.description}</Text>}

                </View>
            </View>
        </View>
    );
};

export default UserDetails;
