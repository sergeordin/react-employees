import { ReactNode } from 'react';
import { Layout as Antlayout } from 'antd';
import styles from './index.module.css';
import Header from '../Header';

type Props = {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div className={styles.main}>
            <Header />
            <Antlayout.Content style={{ height: '100%' }}>{children}</Antlayout.Content>
        </div>
    );
};

export default Layout;
