import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Button, Modal, Portal, TextInput} from 'react-native-paper';
import useUserStore from '../../store/useUserStore';
import {useAppTheme} from '../../theme/ThemeProvider';

type EditProfileModalProps = {
  visible: boolean;
  onDismiss: () => void;
};

const normalizeUsername = (value: string) => {
  const compactValue = value.trim().replace(/\s+/g, '').replace(/^@+/, '');
  return compactValue ? `@${compactValue}` : '';
};

const EditProfileModal = ({visible, onDismiss}: EditProfileModalProps) => {
  const {colors} = useAppTheme();
  const {name, username, setName, setUsername} = useUserStore();
  const [displayName, setDisplayName] = useState(name);
  const [profileUsername, setProfileUsername] = useState(username);

  useEffect(() => {
    if (visible) {
      setDisplayName(name);
      setProfileUsername(username);
    }
  }, [name, username, visible]);

  const saveProfile = () => {
    const nextName = displayName.trim();
    const nextUsername = normalizeUsername(profileUsername);

    if (!nextName) {
      Alert.alert('Display Name Required', 'Add a display name before saving.');
      return;
    }

    if (!nextUsername) {
      Alert.alert('Username Required', 'Add a username before saving.');
      return;
    }

    setName(nextName);
    setUsername(nextUsername);
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.modal,
          {backgroundColor: colors.surface, shadowColor: colors.shadow},
        ]}>
        <Text style={[styles.title, {color: colors.text}]}>Edit Profile</Text>
        <Text style={[styles.description, {color: colors.mutedText}]}>
          Update the details that appear across QuizHub.
        </Text>
        <View style={styles.form}>
          <TextInput
            mode="outlined"
            label="Display Name"
            value={displayName}
            onChangeText={setDisplayName}
            style={[styles.input, {backgroundColor: colors.surface}]}
          />
          <TextInput
            mode="outlined"
            label="Username"
            value={profileUsername}
            autoCapitalize="none"
            onChangeText={setProfileUsername}
            style={[styles.input, {backgroundColor: colors.surface}]}
          />
        </View>
        <View style={styles.actions}>
          <Button mode="text" onPress={onDismiss}>
            Cancel
          </Button>
          <Button mode="contained" onPress={saveProfile}>
            Save
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  description: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
  },
  form: {
    marginTop: 18,
  },
  input: {
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
});

export default EditProfileModal;
