import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import {Alert, ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  List,
  Modal,
  Portal,
  SegmentedButtons,
  TextInput,
} from 'react-native-paper';
import EditProfileModal from '../../components/profile/edit-profile-modal';
import useUserStore, {ThemeMode} from '../../store/useUserStore';
import {useAppTheme} from '../../theme/ThemeProvider';
import styles from './style';

const SettingsScreen = () => {
  const {colors} = useAppTheme();
  const {themeMode, setAvatarUrl, setThemeMode} = useUserStore();
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const appVersion = Constants.expoConfig?.version ?? 'Unknown';

  const pickProfilePicture = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Photo Access Needed',
        'QuizHub needs photo library access to update your profile picture.',
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setAvatarUrl(result.assets[0].uri);
    }
  };

  const resetPasswordForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const submitPasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Missing Fields', 'Complete all password fields first.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Passwords Do Not Match', 'New password and confirmation must match.');
      return;
    }

    resetPasswordForm();
    setIsPasswordVisible(false);
    Alert.alert(
      'Password Updated',
      'This demo form validated locally. No backend password was changed.',
    );
  };

  const closePasswordModal = () => {
    resetPasswordForm();
    setIsPasswordVisible(false);
  };

  return (
    <>
      <ScrollView
        style={[styles.container, {backgroundColor: colors.background}]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.kicker, {color: colors.primary}]}>
            QuizHub Settings
          </Text>
          <Text style={[styles.title, {color: colors.text}]}>
            Tune your quiz flow
          </Text>
        </View>

        <List.Section
          style={[
            styles.section,
            {backgroundColor: colors.surface, shadowColor: colors.shadow},
          ]}>
          <List.Subheader style={[styles.subheader, {color: colors.primary}]}>
            Account
          </List.Subheader>
          <List.Item
            title="Change Profile Picture"
            description="Choose a new avatar from your library"
            onPress={pickProfilePicture}
            left={props => (
              <List.Icon {...props} color={colors.primary} icon="camera-outline" />
            )}
            titleStyle={[styles.listTitle, {color: colors.text}]}
            descriptionStyle={[styles.listDescription, {color: colors.mutedText}]}
          />
          <View style={[styles.divider, {backgroundColor: colors.border}]} />
          <List.Item
            title="Edit Profile"
            description="Update display name and username"
            onPress={() => setIsEditProfileVisible(true)}
            left={props => (
              <List.Icon
                {...props}
                color={colors.primary}
                icon="account-edit-outline"
              />
            )}
            titleStyle={[styles.listTitle, {color: colors.text}]}
            descriptionStyle={[styles.listDescription, {color: colors.mutedText}]}
          />
          <View style={[styles.divider, {backgroundColor: colors.border}]} />
          <List.Item
            title="Change Password"
            description="Local validation only"
            onPress={() => setIsPasswordVisible(true)}
            left={props => (
              <List.Icon {...props} color={colors.primary} icon="lock-outline" />
            )}
            titleStyle={[styles.listTitle, {color: colors.text}]}
            descriptionStyle={[styles.listDescription, {color: colors.mutedText}]}
          />
        </List.Section>

        <List.Section
          style={[
            styles.section,
            {backgroundColor: colors.surface, shadowColor: colors.shadow},
          ]}>
          <List.Subheader style={[styles.subheader, {color: colors.primary}]}>
            Appearance
          </List.Subheader>
          <View style={styles.segmentedWrapper}>
            <SegmentedButtons
              value={themeMode}
              onValueChange={value => setThemeMode(value as ThemeMode)}
              buttons={[
                {value: 'light', label: 'Light'},
                {value: 'dark', label: 'Dark'},
                {value: 'system', label: 'System'},
              ]}
            />
          </View>
        </List.Section>

        <List.Section
          style={[
            styles.section,
            {backgroundColor: colors.surface, shadowColor: colors.shadow},
          ]}>
          <List.Subheader style={[styles.subheader, {color: colors.primary}]}>
            About
          </List.Subheader>
          <List.Item
            title="App Version"
            description={appVersion}
            left={props => (
              <List.Icon
                {...props}
                color={colors.primary}
                icon="information-outline"
              />
            )}
            titleStyle={[styles.listTitle, {color: colors.text}]}
            descriptionStyle={[styles.listDescription, {color: colors.mutedText}]}
          />
        </List.Section>

        <List.Section
          style={[
            styles.section,
            {backgroundColor: colors.surface, shadowColor: colors.shadow},
          ]}>
          <List.Subheader style={[styles.subheader, {color: colors.primary}]}>
            Session
          </List.Subheader>
          <List.Item
            title="Logout"
            description="UI only; no auth backend is connected"
            left={props => (
              <List.Icon {...props} color={colors.danger} icon="logout" />
            )}
            titleStyle={[styles.listTitle, {color: colors.danger}]}
            descriptionStyle={[styles.listDescription, {color: colors.mutedText}]}
          />
        </List.Section>
      </ScrollView>

      <EditProfileModal
        visible={isEditProfileVisible}
        onDismiss={() => setIsEditProfileVisible(false)}
      />
      <Portal>
        <Modal
          visible={isPasswordVisible}
          onDismiss={closePasswordModal}
          contentContainerStyle={[
            styles.passwordModal,
            {backgroundColor: colors.surface, shadowColor: colors.shadow},
          ]}>
          <Text style={[styles.modalTitle, {color: colors.text}]}>
            Change Password
          </Text>
          <Text style={[styles.modalDescription, {color: colors.mutedText}]}>
            This validates locally only. No backend password will change.
          </Text>
          <TextInput
            mode="outlined"
            label="Current Password"
            value={currentPassword}
            secureTextEntry
            onChangeText={setCurrentPassword}
            style={[styles.input, {backgroundColor: colors.surface}]}
          />
          <TextInput
            mode="outlined"
            label="New Password"
            value={newPassword}
            secureTextEntry
            onChangeText={setNewPassword}
            style={[styles.input, {backgroundColor: colors.surface}]}
          />
          <TextInput
            mode="outlined"
            label="Confirm Password"
            value={confirmPassword}
            secureTextEntry
            onChangeText={setConfirmPassword}
            style={[styles.input, {backgroundColor: colors.surface}]}
          />
          <View style={styles.modalActions}>
            <Button mode="text" onPress={closePasswordModal}>
              Cancel
            </Button>
            <Button mode="contained" onPress={submitPasswordChange}>
              Submit
            </Button>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default SettingsScreen;
