import { Button, Form } from 'antd';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    htmlType?: 'button' | 'submit' | 'reset' | undefined;
    onClick?: () => void;
    type?: 'link' | 'text' | 'default' | 'primary' | 'dashed' | 'ghost' | undefined;
    danger?: boolean;
    loading?: boolean;
    shape?: 'default' | 'circle' | 'round' | undefined;
    icon?: ReactNode;
};

const CustomButton = ({
    children,
    htmlType = 'button',
    type,
    danger,
    loading,
    shape,
    icon,
    onClick,
}: Props) => {
    return (
        <Form.Item>
            <Button
                htmlType={htmlType}
                type={type}
                danger={danger}
                loading={loading}
                shape={shape}
                icon={icon}
                onClick={onClick}
            >
                {children}
            </Button>
        </Form.Item>
    );
};

export default CustomButton;
