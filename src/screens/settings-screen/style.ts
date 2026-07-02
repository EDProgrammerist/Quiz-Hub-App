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
  section: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 6,
    marginBottom: 18,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subheader: {
    fontSize: 13,
    fontWeight: '800',
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
  segmentedWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  passwordModal: {
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
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  modalDescription: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
    marginBottom: 18,
  },
  input: {
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
});

export default styles;
