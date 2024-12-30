import React from 'react';
import Tasks from './src/screens/Tasks';
import ScreenStack from './src/navigation/ScreenStack';
import { NavigationContainer } from '@react-navigation/native';





const App: React.FC = () => {
  return (
    <NavigationContainer>

      <ScreenStack />
    </NavigationContainer>

  );
};

export default App;
