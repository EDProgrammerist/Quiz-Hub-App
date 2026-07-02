import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 36,
  },
  header: {
    marginBottom: 16,
  },
  kicker: {
    fontSize: 13,
    fontWeight: '800',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
  },
  card: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 8,
    marginBottom: 18,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 96,
    alignSelf: 'center',
    marginBottom: 14,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  listDescription: {
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
  editButton: {
    borderRadius: 10,
  },
  editButtonContent: {
    height: 50,
  },
});

export default styles;
