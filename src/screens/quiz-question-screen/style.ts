import {StyleSheet} from 'react-native';

const cardShadow = {
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.18,
  shadowRadius: 3.84,
  elevation: 5,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 36,
  },
  header: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  headerTextBox: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 3,
  },
  questionBox: {
    width: '100%',
    borderRadius: 10,
    padding: 20,
    marginBottom: 18,
    ...cardShadow,
  },
  questionNumber: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '800',
  },
  optionsBox: {
    width: '100%',
    gap: 12,
  },
  option: {
    minHeight: 58,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '800',
  },
  feedback: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 16,
    textAlign: 'center',
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
    paddingHorizontal: 18,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '800',
  },
  resultBox: {
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 18,
    marginBottom: 16,
    ...cardShadow,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '800',
  },
  resultScore: {
    fontSize: 52,
    fontWeight: '900',
    marginTop: 8,
  },
  resultMeta: {
    fontSize: 14,
    fontWeight: '700',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryItem: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 18,
    alignItems: 'center',
    ...cardShadow,
  },
  summaryValue: {
    fontSize: 26,
    fontWeight: '900',
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '800',
    marginTop: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default styles;
