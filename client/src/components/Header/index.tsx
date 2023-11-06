import { Layout, Space, Typography } from 'antd';
import styles from './index.module.css';
import { LoginOutlined, LogoutOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import CustomButton from '../CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../path';
import { useSelector } from 'react-redux';
import { logout, selectUser } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const Header = () => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClickLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate(Paths.login);
    };
    return (
        <Layout.Header className={styles.header}>
            <Space>
                <TeamOutlined className={styles.teamIcon} />
                <Link to={Paths.home}>
                    <CustomButton type="ghost">
                        <Typography.Title level={1}>Сотрудники</Typography.Title>
                    </CustomButton>
                </Link>
            </Space>
            {user ? (
                <CustomButton type="ghost" icon={<LogoutOutlined />} onClick={onClickLogout}>
                    Выйти
                </CustomButton>
            ) : (
                <Space>
                    <Link to={Paths.register}>
                        <CustomButton icon={<UserOutlined />} type="ghost">
                            Зарегистрироваться
                        </CustomButton>
                    </Link>
                    <Link to={Paths.login}>
                        <CustomButton icon={<LoginOutlined />} type="ghost">
                            Войти
                        </CustomButton>
                    </Link>
                </Space>
            )}
        </Layout.Header>
    );
};

export default Header;
