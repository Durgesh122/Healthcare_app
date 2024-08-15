import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  circle: {
    borderWidth: 2,
    borderColor: 'rgba(71, 194, 196, 1)',
    borderRadius: responsiveWidth(100),
    height: responsiveHeight(15),
    width: responsiveWidth(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle2: {
    borderRadius: responsiveWidth(100),
    height: responsiveHeight(10),
    width: responsiveWidth(24),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  wavestyle: {
    position: 'absolute',
    height: responsiveHeight(10),
    width: responsiveWidth(50),
    borderRadius:15
  },
});

export default style;
