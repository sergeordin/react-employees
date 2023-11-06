import { Card, Form, Row, Space, Typography } from 'antd';
import Layout from '../../components/Layout';
import CustomInput from '../../components/CustomInput';
import PasswordInput from '../../components/PasswordInput';
import CustomButton from '../../components/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../path';
import { UserData, useLoginMutation } from '../../app/services/auth';
import { isErrorWithMessage } from '../../utils/isErrorWithMessage';
import { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';

const Login = () => {
    const navigate = useNavigate();
    const [loginUser, loginUserResult] = useLoginMutation();
    const [error, setError] = useState<string>('');

    const login = async (data: UserData) => {
        try {
            await loginUser(data).unwrap();
            navigate('/');
        } catch (err) {
            const maybeError = isErrorWithMessage(err);
            if (maybeError) {
                setError(err.data.message);
            } else {
                setError('Неизвестная ошибка');
            }
        }
    };

    return (
        <Layout>
            <Row align="middle" justify="center">
                <Card title="Войдите" style={{ width: '30rem' }}>
                    <Form onFinish={login}>
                        <CustomInput type="email" name="email" placeholder="Email" />
                        <PasswordInput name="password" placeholder="Пароль" />
                        <CustomButton
                            type="primary"
                            htmlType="submit"
                            loading={loginUserResult.isLoading}
                        >
                            Войти
                        </CustomButton>
                    </Form>
                    <Space direction="vertical" size="large">
                        <Typography.Text>
                            Нет аккаунта? <Link to={Paths.register}>Зарегистрируйтесь</Link>
                        </Typography.Text>
                        <ErrorMessage message={error} />
                    </Space>
                </Card>
            </Row>
        </Layout>
    );
};

export default Login;
