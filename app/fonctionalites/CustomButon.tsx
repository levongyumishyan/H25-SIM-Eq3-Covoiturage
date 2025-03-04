import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface CustomButonProps {
    onPress: () => void;
    title: string;
    textStyles?: string;
    containterStyles?: string;
}


const CustomButon = ({
    onPress,
    title,
}: CustomButonProps) => {
  return (
    <TouchableOpacity 
        activeOpacity={0.7}
        className={'bg-white rounded-xl min-h-[62px] justify-center items-center ${containerStyles}'}
        onPress={onPress}
        >
         <Text className={'font-semibold text-lg ${textStyles}'}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButon