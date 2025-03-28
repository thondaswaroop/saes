import React, { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { ToastProvider } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from './src/redux/Store';
import { setIsUserLoggedIn } from './src/redux/slice/AuthSlice';
import { LoaderProvider } from './src/utils/common/LoaderContext';
import Loader from './src/components/Loader';
import BottomNavigation from './src/navigation/BottomNavigation';
import AuthNavigation from './src/navigation/AuthNavigation';
import Splash from './src/screens/common/Splash';
import { theme } from './src/Resources';

const App: React.FC = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 4000); // Display splash screen for 4 seconds

    requestStoragePermission(); // Request storage permission on app launch

    return () => clearTimeout(timer); // Cleanup the timer if the component is unmounted
  }, []);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message: 'This app needs access to your storage to download images.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Storage permission granted');
            } else {
                console.log('Storage permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
};


  const LoadNavigationControl = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
      fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
      let isUserLoggedIn = await AsyncStorage.getItem('UserId');
      if (isUserLoggedIn) {
        dispatch(setIsUserLoggedIn(true));
      } else {
        dispatch(setIsUserLoggedIn(false));
      }
      setLoading(false); // Update loading state
    };

    const userLoggedStatus = useSelector((state: any) => state.userInfo.isUserLoggedIn);

    // If loading, don't render any navigation screen
    if (loading) {
      return null; // Render nothing while checking login state
    }

    return userLoggedStatus ? <BottomNavigation /> : <AuthNavigation />;
  };


  return (
    <Provider store={store}>
      <LoaderProvider>
        <ToastProvider>
          <NavigationContainer>
            <SafeAreaView style={styles.container}>
              <Loader />
              <PaperProvider theme={theme}>
              {isSplashVisible ? <Splash /> : <LoadNavigationControl />}
              </PaperProvider>
            </SafeAreaView>
          </NavigationContainer>
        </ToastProvider>
      </LoaderProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Ensure background color to prevent white screen
  },
});

export default App;
