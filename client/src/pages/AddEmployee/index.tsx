import { Row } from 'antd';
import Layout from '../../components/Layout';
import EmployeeForm from '../../components/EmployeeForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { useAddEmployeeMutation } from '../../app/services/employees';
import { Paths } from '../../path';
import { Employee } from '@prisma/client';
import { isErrorWithMessage } from '../../utils/isErrorWithMessage';

const AddEmployee = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [addEmployee] = useAddEmployeeMutation();

    useEffect(() => {
        if (!user) {
            navigate(Paths.login);
        }
    }, [navigate, user]);

    const handleAddEmployee = async (data: Employee) => {
        try {
            await addEmployee(data).unwrap();

            navigate(`${Paths.status}/created`);
        } catch (error) {
            const maybeError = isErrorWithMessage(error);

            if (maybeError) {
                setError(error.data.message);
            } else {
                setError('Неизвестная ошибка');
            }
        }
    };
    return (
        <Layout>
            <Row align="middle" justify="center">
                <EmployeeForm
                    title="Добавить сотрудника"
                    btnText="Добавить"
                    onFinish={handleAddEmployee}
                    error={error}
                />
            </Row>
        </Layout>
    );
};

export default AddEmployee;
