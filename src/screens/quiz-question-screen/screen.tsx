import Ionicons from '@expo/vector-icons/Ionicons';
import React, {FC, useMemo, useRef, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {getQuestionsForCategory} from '../../data/questions';
import useUserStore from '../../store/useUserStore';
import {useAppTheme} from '../../theme/ThemeProvider';
import styles from './style';

const POINTS_PER_CORRECT_ANSWER = 10;
const CORRECT_COLOR = '#2f9e44';

const QuizQuestionScreen: FC<any> = ({route, navigation}) => {
  const item = route.params?.item;
  const initialQuestionIndex = route.params?.initialQuestionIndex ?? 0;
  const categoryQuestions = getQuestionsForCategory(item?.id);
  const {colors} = useAppTheme();
  const recordQuizResult = useUserStore(state => state.recordQuizResult);
  const addPoints = useUserStore(state => state.addPoints);
  const hasRecordedResult = useRef(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null,
  );
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const questions = useMemo(() => {
    if (categoryQuestions.length === 0) {
      return [];
    }

    const requestedStartIndex = Number(initialQuestionIndex);
    const safeStartIndex = Number.isFinite(requestedStartIndex)
      ? Math.min(Math.max(requestedStartIndex, 0), categoryQuestions.length - 1)
      : 0;

    return [
      ...categoryQuestions.slice(safeStartIndex),
      ...categoryQuestions.slice(0, safeStartIndex),
    ];
  }, [categoryQuestions, initialQuestionIndex]);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const scorePercentage =
    totalQuestions > 0
      ? Math.round((correctAnswerCount / totalQuestions) * 100)
      : 0;
  const pointsEarned = correctAnswerCount * POINTS_PER_CORRECT_ANSWER;

  const goHome = () => {
    if (typeof navigation.popToTop === 'function') {
      navigation.popToTop();
      return;
    }

    navigation.navigate('QuizApp');
  };

  const completeQuiz = () => {
    if (!hasRecordedResult.current) {
      recordQuizResult(correctAnswerCount);
      addPoints(pointsEarned);
      hasRecordedResult.current = true;
    }

    setIsComplete(true);
  };

  const handleSelectAnswer = (answerIndex: number) => {
    if (selectedAnswerIndex !== null || !currentQuestion) {
      return;
    }

    setSelectedAnswerIndex(answerIndex);

    if (answerIndex === currentQuestion.correctAnswerIndex) {
      setCorrectAnswerCount(count => count + 1);
    }
  };

  const handleContinue = () => {
    if (selectedAnswerIndex === null) {
      return;
    }

    if (currentQuestionIndex === totalQuestions - 1) {
      completeQuiz();
      return;
    }

    setCurrentQuestionIndex(index => index + 1);
    setSelectedAnswerIndex(null);
  };

  const getOptionStyle = (optionIndex: number) => {
    if (selectedAnswerIndex === null || !currentQuestion) {
      return [
        styles.option,
        {backgroundColor: colors.surface, borderColor: colors.border},
      ];
    }

    const isCorrect = optionIndex === currentQuestion.correctAnswerIndex;
    const isSelected = optionIndex === selectedAnswerIndex;

    if (isCorrect) {
      return [
        styles.option,
        {backgroundColor: CORRECT_COLOR, borderColor: CORRECT_COLOR},
      ];
    }

    if (isSelected) {
      return [
        styles.option,
        {backgroundColor: colors.danger, borderColor: colors.danger},
      ];
    }

    return [
      styles.option,
      {backgroundColor: colors.surfaceMuted, borderColor: colors.border},
    ];
  };

  const getOptionTextColor = (optionIndex: number) => {
    if (!currentQuestion || selectedAnswerIndex === null) {
      return colors.text;
    }

    const isCorrect = optionIndex === currentQuestion.correctAnswerIndex;
    const isSelected = optionIndex === selectedAnswerIndex;

    return isCorrect || isSelected ? '#ffffff' : colors.mutedText;
  };

  if (!currentQuestion) {
    return (
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, {color: colors.text}]}>Quiz</Text>
        </View>
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, {color: colors.mutedText}]}>
            No questions are available for this category.
          </Text>
        </View>
      </View>
    );
  }

  if (isComplete) {
    return (
      <ScrollView
        style={[styles.container, {backgroundColor: colors.background}]}
        contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconButton}>
            <Ionicons name="checkmark-circle-outline" size={24} color={CORRECT_COLOR} />
          </View>
          <View style={styles.headerTextBox}>
            <Text style={[styles.headerTitle, {color: colors.text}]}>
              Quiz Complete
            </Text>
            <Text style={[styles.headerSubtitle, {color: colors.mutedText}]}>
              {item?.name ?? 'Category'}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.resultBox,
            {backgroundColor: colors.surface, shadowColor: colors.shadow},
          ]}>
          <Text style={[styles.resultLabel, {color: colors.mutedText}]}>
            Final Score
          </Text>
          <Text style={[styles.resultScore, {color: colors.primary}]}>
            {correctAnswerCount} / {totalQuestions}
          </Text>
          <Text style={[styles.resultMeta, {color: colors.mutedText}]}>
            {scorePercentage}% correct
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <View
            style={[
              styles.summaryItem,
              {backgroundColor: colors.surface, shadowColor: colors.shadow},
            ]}>
            <Text style={[styles.summaryValue, {color: colors.text}]}>
              {pointsEarned}
            </Text>
            <Text style={[styles.summaryLabel, {color: colors.mutedText}]}>
              Points
            </Text>
          </View>
          <View
            style={[
              styles.summaryItem,
              {backgroundColor: colors.surface, shadowColor: colors.shadow},
            ]}>
            <Text style={[styles.summaryValue, {color: colors.text}]}>
              {POINTS_PER_CORRECT_ANSWER}
            </Text>
            <Text style={[styles.summaryLabel, {color: colors.mutedText}]}>
              Per correct
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.primaryButton, {backgroundColor: colors.primary}]}
          onPress={goHome}>
          <Text style={styles.primaryButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  const isSelectedAnswerCorrect =
    selectedAnswerIndex === currentQuestion.correctAnswerIndex;

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerTextBox}>
          <Text style={[styles.headerTitle, {color: colors.text}]}>
            {item?.name ?? 'Quiz'}
          </Text>
          <Text style={[styles.headerSubtitle, {color: colors.mutedText}]}>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.questionBox,
          {backgroundColor: colors.surface, shadowColor: colors.shadow},
        ]}>
        <Text style={[styles.questionNumber, {color: colors.primary}]}>
          Question {currentQuestionIndex + 1}
        </Text>
        <Text style={[styles.questionText, {color: colors.text}]}>
          {currentQuestion.question}
        </Text>
      </View>

      <View style={styles.optionsBox}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            activeOpacity={0.85}
            disabled={selectedAnswerIndex !== null}
            key={option}
            onPress={() => handleSelectAnswer(index)}
            style={getOptionStyle(index)}>
            <Text
              style={[
                styles.optionText,
                {color: getOptionTextColor(index)},
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedAnswerIndex !== null ? (
        <Text
          style={[
            styles.feedback,
            {color: isSelectedAnswerCorrect ? CORRECT_COLOR : colors.danger},
          ]}>
          {isSelectedAnswerCorrect ? 'Correct answer' : 'Incorrect answer'}
        </Text>
      ) : null}

      <TouchableOpacity
        activeOpacity={0.85}
        disabled={selectedAnswerIndex === null}
        style={[
          styles.primaryButton,
          {
            backgroundColor:
              selectedAnswerIndex === null ? colors.surfaceMuted : colors.primary,
          },
        ]}
        onPress={handleContinue}>
        <Text
          style={[
            styles.primaryButtonText,
            {color: selectedAnswerIndex === null ? colors.mutedText : '#ffffff'},
          ]}>
          {currentQuestionIndex === totalQuestions - 1
            ? 'Show Results'
            : 'Next Question'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default QuizQuestionScreen;
