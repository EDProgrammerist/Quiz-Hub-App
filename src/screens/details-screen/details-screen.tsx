import { View, Text, Image, FlatList } from 'react-native'
import React, { FC } from 'react'
import styles from './style'
import Header from './header/header'
import Icons from '@expo/vector-icons/Ionicons'
import Animated, { SlideInLeft } from 'react-native-reanimated'
import {useAppTheme} from '../../theme/ThemeProvider'

const DetailsScreen: FC<any> = (props) => {
    const item = props.route.params.item
    const {colors} = useAppTheme()
    const data = [
        { questionNumber: 1 },
        { questionNumber: 2 },
        { questionNumber: 3 },
        { questionNumber: 4 },
        { questionNumber: 5 },
        { questionNumber: 6 },
        { questionNumber: 7 },
        { questionNumber: 8 },
        { questionNumber: 9 },
        { questionNumber: 10 }
    ]

    const renderItem = ({ item, index }: any) => {
        return (
            <Animated.View style={styles.renderItem} entering={SlideInLeft.delay(100*index)}>
                <View
                    style={[
                        styles.box,
                        {backgroundColor: colors.surface, shadowColor: colors.shadow},
                    ]}>
                    <Text style={[styles.title, {color: colors.text}]}>Question 1</Text>
                    <Icons name={"chevron-forward-outline"} size={20} color={colors.text} />
                </View>
            </Animated.View>
        )
    }
    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <Header item={item} />
            <FlatList data={data}
                renderItem={renderItem} />
        </View>
    )
}

export default DetailsScreen
