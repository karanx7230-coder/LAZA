import { Linking } from 'react-native';
import { useEffect } from 'react';
import { navigate } from '../navigation/navigationService';

function useDeepLinking() {
    useEffect(() => {
        Linking.getInitialURL().then((url) => {
            if (url) handleDeepLink(url);
        });

        const subscription = Linking.addEventListener('url', ({ url }) => {
            handleDeepLink(url);
        });

        return () => subscription.remove();
    }, []);

    function handleDeepLink(url) {
        console.log('Deep link received:', url);
        const parsed = new URL(url);
        const productId = parsed.pathname.replace(/^\//,'');
        navigate('productstack', { id: productId });
    }
}
export default useDeepLinking;