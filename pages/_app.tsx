import '../styles/globals.css';
import { AppProps } from "next/app";
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion';

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
    return (
        <AnimatePresence exitBeforeEnter
        onExitComplete={() => window.scrollTo(0, 0)}>
             <AnimateSharedLayout>
            <Component {...pageProps} />
        </AnimateSharedLayout>
        </AnimatePresence>
       
    );
}

export default MyApp;