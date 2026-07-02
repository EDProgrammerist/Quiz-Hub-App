import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native'
import styles from './style'
import useUserStore from '../../../../store/useUserStore'
import {useAppTheme} from '../../../../theme/ThemeProvider'

const Header = () => {
  const navigation = useNavigation<any>()
  const {name, avatarUrl} = useUserStore()
  const {colors} = useAppTheme()

  const openProfile = () => {
    const parent = navigation.getParent?.()
    if (parent) {
      parent.navigate('Profile')
      return
    }

    navigation.navigate('Profile')
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={[styles.title, {color: colors.text}]}>Hi, {name}</Text>
        <Text style={[styles.description, {color: colors.mutedText}]}>
          Let's make this day productive
        </Text>
      </View>
      <TouchableOpacity onPress={openProfile} activeOpacity={0.75}>
        <Image source={{uri: avatarUrl}} style={styles.avatar}/>
      </TouchableOpacity>
    </View>
  )
}

export default Header
