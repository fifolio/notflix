import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';

interface Props {
    placeholder: string;
    onPress?: () => void;
    value: string;
    onChangeText: (text: string) => void;
    onSubmitEditing?: () => void;
}

export default function SearchBar({ placeholder, onPress, value, onChangeText, onSubmitEditing }: Props) {
    return (
        <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
            <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#ab8bff" />
            <TextInput onPress={onPress} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#a8b5db" value={value} className='flex-1 ml-2 text-white' onSubmitEditing={onSubmitEditing} />
        </View>
    )
}