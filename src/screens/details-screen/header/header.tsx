import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import styles from './style'
import Icons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import {useAppTheme} from '../../../theme/ThemeProvider'

const Header:FC<any> = ({item}) => {
  const navigation = useNavigation()
  const {colors} = useAppTheme()

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Icons name={"chevron-back-outline"} size={24} color={colors.text}/>
      </TouchableOpacity>
      <View style={styles.titleBox}>
        <Text style={[styles.title, {color: colors.text}]}>{item?.name}</Text>
        <Text style={[styles.description, {color: colors.mutedText}]}>
          {item?.count} Questions
        </Text>
      </View>
      <Image source={{uri:item?.image_url}} style={styles.avatar}/>
    </View>
  )
}

export default Header
