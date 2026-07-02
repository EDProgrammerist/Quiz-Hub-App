import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import styles from './style'
import Header from './header/header'
import Icons from '@expo/vector-icons/Ionicons'
import Animated, { SlideInLeft } from 'react-native-reanimated'
import {useAppTheme} from '../../theme/ThemeProvider'
import {getQuestionsForCategory, QuizQuestion} from '../../data/questions'
import {useNavigation} from '@react-navigation/native'

const DetailsScreen: FC<any> = (props) => {
    const item = props.route.params?.item
    const {colors} = useAppTheme()
    const navigation: any = useNavigation()
    const questions = getQuestionsForCategory(item?.id)

    const renderItem = ({ item: question, index }: {item: QuizQuestion; index: number}) => {
        return (
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={() =>
                    navigation.navigate('QuizQuestionScreen', {
                        item,
                        initialQuestionIndex: index,
                    })
                }>
            <Animated.View style={styles.renderItem} entering={SlideInLeft.delay(100*index)}>
                <View
                    style={[
                        styles.box,
                        {backgroundColor: colors.surface, shadowColor: colors.shadow},
                    ]}>
                    <View style={styles.questionTextBox}>
                        <Text style={[styles.questionNumber, {color: colors.primary}]}>
                            Question {index + 1}
                        </Text>
                        <Text
                            style={[styles.title, {color: colors.text}]}
                            numberOfLines={2}>
                            {question.question}
                        </Text>
                    </View>
                    <Icons name={"chevron-forward-outline"} size={20} color={colors.text} />
                </View>
            </Animated.View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <Header item={item} />
            <FlatList
                data={questions}
                keyExtractor={question => question.id}
                renderItem={renderItem}
                ListEmptyComponent={() => (
                    <View style={styles.emptyState}>
                        <Text style={[styles.emptyText, {color: colors.mutedText}]}>
                            No questions available yet.
                        </Text>
                    </View>
                )}
            />
        </View>
    )
}

export default DetailsScreen
