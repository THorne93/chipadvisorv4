'use client';

import { Modal, Form, Input, Button, message } from "antd";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  async function handleLogin(values: LoginFormValues) {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values), // email and password here
    });

    if (res.ok) {
      message.success('Logged in');
      onClose();
      window.location.reload(); // reload page to refresh session
    } else {
      const err = await res.json();
      message.error(err.error || 'Login failed');
    }
  }

  return (
    <Modal title="Login" open={open} onCancel={onClose} footer={null}>
      <Form onFinish={handleLogin} layout="vertical">
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
