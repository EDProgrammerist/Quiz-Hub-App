import { View, Text } from 'react-native'
import React from 'react'
import styles from './style'
import Header from './molecules/header/header'
import Rewards from './molecules/rewards/rewards'
import CategoryList from './template/category-list/category-list'
import {useAppTheme} from '../../theme/ThemeProvider'

const QuizApp = () => {
  const {colors} = useAppTheme()

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Header/>
      {/* <Rewards/> */}
      <CategoryList/>
    </View>
  )
}

export default QuizApp
