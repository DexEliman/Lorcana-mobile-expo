import { Stack } from 'expo-router';
import SplashScreen from '../screens/SplashScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import AccountScreen from '../screens/AccountScreen';
import ChaptersScreen from '../screens/ChaptersScreen';
import ChapterCardsScreen from '../screens/ChapterCardsScreen';
import CardDetailsScreen from '../screens/CardDetailsScreen';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Chapters" component={ChaptersScreen} />
      <Stack.Screen name="ChapterCards" component={ChapterCardsScreen} />
      <Stack.Screen name="CardDetails" component={CardDetailsScreen} />
    </Stack>
  );
}
