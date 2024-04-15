import { StyleSheet } from 'react-native';

// Components sharedStyles
export const sharedStyles = StyleSheet.create({
  buttonText: {
    color: '#3B82F6',
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 48,
    paddingLeft: 16,
    color: 'gray',
    borderWidth: 1,
  },
  textError: {
    paddingLeft: 4,
    marginTop: 1,
    marginBottom: 12,
    color: '#EF4444',
  },
  viewForm: {
    width: '100%',
  },
  viewLoading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
  },
});
