import { useAppStore } from './store/appStore';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import TutorialScreen from './screens/TutorialScreen';
import DashboardScreen from './screens/DashboardScreen';

export default function App() {
  const screen = useAppStore(s => s.screen);

  switch (screen) {
    case 'home':
      return <HomeScreen />;
    case 'game':
      return <GameScreen />;
    case 'tutorial':
      return <TutorialScreen />;
    case 'dashboard':
      return <DashboardScreen />;
  }
}
