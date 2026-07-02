import {NavigationContainer} from '@react-navigation/native';
import TabRouter from './tab-routes';
import {useAppTheme} from '../theme/ThemeProvider';

const Routes = () => {
  const {navigationTheme} = useAppTheme();

  return (
    <NavigationContainer theme={navigationTheme}>
      <TabRouter />
    </NavigationContainer>
  );
};

export default Routes;
