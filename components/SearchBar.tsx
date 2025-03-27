import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';

interface Props {
    placeholder: string;
    onPress: () => void;
}

export default function SearchBar({ placeholder, onPress }: Props) {
    return (
        <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
            <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#ab8bff" />
            <TextInput onPress={onPress} onChangeText={() => { }} placeholder={placeholder} placeholderTextColor="#a8b5db" value='' className='flex-1 ml-2 text-white' />
        </View>
    )
}