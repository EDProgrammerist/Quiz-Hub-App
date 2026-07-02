import { View, Text, Image } from 'react-native'
import React, { FC } from 'react'
import styles from './style'
import Animated, { BounceIn } from 'react-native-reanimated'
import useUserStore from '../../../../store/useUserStore'
import {useAppTheme} from '../../../../theme/ThemeProvider'

const Rewards:FC<any> = ({animatedHeaderStyle}) => {
  const {ranking, points} = useUserStore()
  const {colors} = useAppTheme()

  return (
    <Animated.View style={[styles.container,animatedHeaderStyle]} >
      <View
        style={[
          styles.box,
          {backgroundColor: colors.surface, shadowColor: colors.shadow},
        ]}>
        <View style={[styles.subBox,{borderRightWidth:0.5,borderColor: colors.border}]}>
            <Image source={{uri:"https://cdn3d.iconscout.com/3d/premium/thumb/trophy-4034567-3337288@0.png?f=webp"}} style={styles.icon}/>
            <View style={styles.textBox}>
                <Text style={[styles.title, {color: colors.mutedText}]}>Ranking</Text>
                <Text style={[styles.point, {color: colors.primary}]}>{ranking}</Text>
            </View>
        </View>
        <View style={styles.subBox}>
            <Image source={{uri:"https://static.vecteezy.com/system/resources/previews/011/964/954/non_2x/3d-gold-dollar-render-or-coin-sign-free-png.png"}} style={[styles.icon,{marginLeft:"10%"}]}/>
            <View style={styles.textBox}>
                <Text style={[styles.title, {color: colors.mutedText}]}>Points</Text>
                <Text style={[styles.point, {color: colors.primary}]}>{points}</Text>
            </View>
        </View>
      </View>
    </Animated.View>
  )
}

export default Rewards
