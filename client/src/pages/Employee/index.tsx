import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useGetEmployeeQuery, useRemoveEmployeeMutation } from '../../app/services/employees';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import Layout from '../../components/Layout';
import { Descriptions, Divider, Modal, Space } from 'antd';
import CustomButton from '../../components/CustomButton';
import { Paths } from '../../path';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ErrorMessage from '../../components/ErrorMessage';
import { isErrorWithMessage } from '../../utils/isErrorWithMessage';

const Employee = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const params = useParams<{ id: string }>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { data, isLoading } = useGetEmployeeQuery(params.id || '');
    const [removeEmployee] = useRemoveEmployeeMutation();
    const user = useSelector(selectUser);

    if (isLoading) {
        return <span>Загрузка...</span>;
    }

    if (!data) {
        return <Navigate to="/" />;
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const hideModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteUser = async () => {
        hideModal();
        try {
            await removeEmployee(data.id).unwrap();
            navigate(`${Paths.status}/deleted`);
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
            <Descriptions title="Информация о сотруднике" bordered>
                <Descriptions.Item label="Имя" span={3}>
                    {`${data.firstName} ${data.lastName}`}
                </Descriptions.Item>
                <Descriptions.Item label="Возраст" span={3}>
                    {data.age}
                </Descriptions.Item>
                <Descriptions.Item label="Город" span={3}>
                    {data.address}
                </Descriptions.Item>
                <Descriptions.Item label="ID" span={3}>
                    {data.id}
                </Descriptions.Item>
            </Descriptions>
            {user?.id === data.userId && (
                <>
                    <Divider orientation="left">Действие</Divider>
                    <Space>
                        <Link to={`${Paths.employeeEdit}/${data.id}`}>
                            <CustomButton shape="round" type="default" icon={<EditOutlined />}>
                                Редактировать
                            </CustomButton>
                        </Link>
                        <CustomButton
                            shape="round"
                            danger
                            onClick={showModal}
                            icon={<DeleteOutlined />}
                        >
                            Удалить
                        </CustomButton>
                    </Space>
                </>
            )}
            <ErrorMessage message={error} />
            <Modal
                title="Подвердите удаление"
                open={isModalOpen}
                onOk={handleDeleteUser}
                onCancel={hideModal}
                okText="Подвердить"
                cancelText="Отмена"
            >
                Вы действительно хотите удалить сотрудника?
            </Modal>
        </Layout>
    );
};

export default Employee;
