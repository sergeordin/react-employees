import { PlusCircleOutlined } from '@ant-design/icons';
import CustomButton from '../../components/CustomButton';
import Layout from '../../components/Layout';
import { Table } from 'antd';
import { useGetAllEmployeesQuery } from '../../app/services/employees';
import type { ColumnsType } from 'antd/es/table';
import { Employee } from '@prisma/client';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../path';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { useEffect } from 'react';

const columns: ColumnsType<Employee> = [
    {
        title: 'Имя',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Фамилия',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'Возраст',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Город',
        dataIndex: 'address',
        key: 'address',
    },
];
const Employees = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const { data, isLoading } = useGetAllEmployeesQuery();

    useEffect(() => {
        if (!user) {
            navigate(Paths.login);
        }
    }, [navigate, user]);

    const goToAddUser = () => {
        navigate(Paths.employeeAdd);
    };

    return (
        <Layout>
            <CustomButton type="primary" onClick={goToAddUser} icon={<PlusCircleOutlined />}>
                Добавить сотрудника
            </CustomButton>
            <Table
                loading={isLoading}
                dataSource={data}
                columns={columns}
                rowKey={(record) => record.id}
                bordered
                onRow={(record) => {
                    return {
                        onClick: () => navigate(`${Paths.employee}/${record.id}`),
                    };
                }}
            />
        </Layout>
    );
};

export default Employees;
