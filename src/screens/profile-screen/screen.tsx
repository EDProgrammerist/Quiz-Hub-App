import {Image, ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, List} from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import EditProfileModal from '../../components/profile/edit-profile-modal';
import useUserStore from '../../store/useUserStore';
import {useAppTheme} from '../../theme/ThemeProvider';
import styles from './style';

const ProfileScreen = () => {
  const {
    name,
    username,
    avatarUrl,
    ranking,
    points,
    totalQuizzesTaken,
    averageScore,
    highestScore,
  } = useUserStore();
  const {colors} = useAppTheme();
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);
  const rankingLabel = ranking > 0 ? `${ranking}` : 'Unranked';

  return (
    <>
      <ScrollView
        style={[styles.container, {backgroundColor: colors.background}]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={[styles.kicker, {color: colors.primary}]}>
          QuizHub Profile
        </Text>
        <Text style={[styles.title, {color: colors.text}]}>
          Your progress hub
        </Text>
      </View>

      <View
        style={[
          styles.card,
          {backgroundColor: colors.surface, shadowColor: colors.shadow},
        ]}>
        <Image source={{uri: avatarUrl}} style={styles.avatar} />
        <Text style={[styles.name, {color: colors.text}]}>{name}</Text>
        <Text style={[styles.description, {color: colors.mutedText}]}>
          {username}
        </Text>
      </View>

      <View
        style={[
          styles.card,
          {backgroundColor: colors.surface, shadowColor: colors.shadow},
        ]}>
        <List.Item
          title="Display Name"
          description={name}
          left={props => (
            <List.Icon {...props} color={colors.primary} icon="account" />
          )}
          titleStyle={[styles.listTitle, {color: colors.text}]}
          descriptionStyle={[styles.listDescription, {color: colors.mutedText}]}
        />
        <View style={[styles.divider, {backgroundColor: colors.border}]} />
        <List.Item
          title="Username"
          description={username}
          left={props => (
            <List.Icon {...props} color={colors.primary} icon="at" />
          )}
          titleStyle={[styles.listTitle, {color: colors.text}]}
          descriptionStyle={[styles.listDescription, {color: colors.mutedText}]}
        />
        <View style={[styles.divider, {backgroundColor: colors.border}]} />
        <List.Item
          title="Ranking"
          description={rankingLabel}
          left={props => (
            <List.Icon
              {...props}
              color={colors.primary}
              icon="trophy-outline"
            />
          )}
          titleStyle={[styles.listTitle, {color: colors.text}]}
          descriptionStyle={[styles.listDescription, {color: colors.mutedText}]}
        />
        <View style={[styles.divider, {backgroundColor: colors.border}]} />
        <List.Item
          title="Points"
          description={`${points}`}
          left={props => (
            <List.Icon {...props} color={colors.primary} icon="cash" />
          )}
          titleStyle={[styles.listTitle, {color: colors.text}]}
          descriptionStyle={[styles.listDescription, {color: colors.mutedText}]}
        />
        <View style={[styles.divider, {backgroundColor: colors.border}]} />
        <List.Item
          title="Total Quizzes Taken"
          description={`${totalQuizzesTaken}`}
          left={props => (
            <List.Icon
              {...props}
              color={colors.primary}
              icon="playlist-check"
            />
          )}
          titleStyle={[styles.listTitle, {color: colors.text}]}
          descriptionStyle={[styles.listDescription, {color: colors.mutedText}]}
        />
        <View style={[styles.divider, {backgroundColor: colors.border}]} />
        <List.Item
          title="Average Score"
          description={`${averageScore}/10`}
          left={props => (
            <List.Icon {...props} color={colors.primary} icon="chart-line" />
          )}
          titleStyle={[styles.listTitle, {color: colors.text}]}
          descriptionStyle={[styles.listDescription, {color: colors.mutedText}]}
        />
        <View style={[styles.divider, {backgroundColor: colors.border}]} />
        <List.Item
          title="Highest Score"
          description={`${highestScore}/10`}
          left={props => (
            <List.Icon {...props} color={colors.primary} icon="star-outline" />
          )}
          titleStyle={[styles.listTitle, {color: colors.text}]}
          descriptionStyle={[styles.listDescription, {color: colors.mutedText}]}
        />
      </View>

      <Button
        mode="contained"
        icon={() => <Ionicons name="create-outline" size={18} color="#fff" />}
        onPress={() => setIsEditProfileVisible(true)}
        contentStyle={styles.editButtonContent}
        style={styles.editButton}>
        Edit Profile
      </Button>
    </ScrollView>
      <EditProfileModal
        visible={isEditProfileVisible}
        onDismiss={() => setIsEditProfileVisible(false)}
      />
    </>
  );
};

export default ProfileScreen;
