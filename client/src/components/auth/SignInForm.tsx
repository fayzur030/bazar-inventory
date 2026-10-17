'use client'

import { AppstoreOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Divider,
  Flex,
  Form,
  Input,
  Space,
  Typography,
  type FormProps,
} from 'antd'
import Link from 'next/link'

const { Title, Text } = Typography

// Same palette as the original sign-in page — colors unchanged.
const C = {
  pageBg: '#0B1020',
  cardBg: '#131a2e',
  cardBorder: '#1e293b',
  accentFrom: '#818cf8',
  accentTo: '#6366f1',
  heading: '#ffffff',
  subtext: '#94a3b8',
  muted: '#64748b',
  inputBg: '#0B1020',
  inputBorder: '#334155',
  link: '#818cf8',
  linkHover: '#a5b4fc',
}

const gradient = `linear-gradient(135deg, ${C.accentFrom}, ${C.accentTo})`

function GoogleIcon() {
  return (
    <svg viewBox='0 0 48 48' style={{ width: 20, height: 20 }} aria-hidden='true'>
      <path
        fill='#EA4335'
        d='M24 9.5c3.5 0 6.3 1.2 8.5 3.2l6.3-6.3C35 2.8 29.9.5 24 .5 14.8.5 6.8 5.8 2.9 13.5l7.4 5.7C12.2 13.2 17.6 9.5 24 9.5Z'
      />
      <path
        fill='#4285F4'
        d='M47 24.5c0-1.6-.2-3.2-.5-4.7H24v9h12.9c-.6 3-2.3 5.5-4.8 7.2l7.4 5.7C44 37.5 47 31.6 47 24.5Z'
      />
      <path
        fill='#FBBC05'
        d='M10.3 28.8a14.5 14.5 0 0 1 0-9.6l-7.4-5.7a23.5 23.5 0 0 0 0 21l7.4-5.7Z'
      />
      <path
        fill='#34A853'
        d='M24 47.5c6.3 0 11.6-2.1 15.5-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.1 2.3-6.4 0-11.8-3.7-13.7-9.1l-7.4 5.7C6.8 42.2 14.8 47.5 24 47.5Z'
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox='0 0 24 24' style={{ width: 20, height: 20, fill: '#fff' }} aria-hidden='true'>
      <path d='M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.47 11.47 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.13 3.17.76.84 1.22 1.91 1.22 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z' />
    </svg>
  )
}

export default function SignInForm() {
  const [form] = Form.useForm()

  const onFinish: FormProps['onFinish'] = () => {}

  return (
    <Flex
      align='center'
      justify='center'
      style={{ minHeight: '100vh', background: C.pageBg, padding: '40px 16px' }}
    >
      <div style={{ width: '100%', maxWidth: 448 }}>
        {/* Logo + heading */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              margin: '0 auto 16px',
              width: 56,
              height: 56,
              borderRadius: 16,
              background: gradient,
              boxShadow: '0 12px 24px -8px rgba(129, 140, 248, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AppstoreOutlined style={{ fontSize: 28, color: '#fff' }} />
          </div>
          <Title level={2} style={{ margin: 0, color: C.heading, letterSpacing: '-0.02em' }}>
            Bazar Inventory
          </Title>
          <Text style={{ display: 'block', marginTop: 8, color: C.subtext, fontSize: 14 }}>
            Smart inventory. Simplified management.
          </Text>
        </div>

        {/* Card */}
        <Card
          style={{
            background: C.cardBg,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: 16,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
          styles={{ body: { padding: 32 } }}
        >
          <Title level={2} style={{ color: C.heading }}>
            Welcome back
          </Title>
          <Text style={{ display: 'block', marginTop: 8, marginBottom: 28, color: C.subtext, fontSize: 14 }}>
            Sign in to manage your inventory.
          </Text>

          <Form form={form} layout='vertical' onFinish={onFinish} requiredMark={false}>
            <Form.Item
              name='email'
              label={
                <span style={{ color: C.heading, fontWeight: 500 }}>Email address</span>
              }
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
              style={{ marginBottom: 20 }}
            >
              <Input
                type='email'
                placeholder='you@example.com'
                size='large'
                style={{ background: C.inputBg, borderColor: C.inputBorder, color: C.heading }}
              />
            </Form.Item>

            <Form.Item
              name='password'
              label={
                <Flex align='center' justify='space-between' style={{ width: '100%' }}>
                  <span style={{ color: C.heading, fontWeight: 500 }}>Password</span>
                  <Link
                    href='/forgot-password'
                    style={{ color: C.link, fontSize: 14 }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = C.linkHover)}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = C.link)}
                  >
                    Forgot password?
                  </Link>
                </Flex>
              }
              rules={[{ required: true, message: 'Please enter your password' }]}
              style={{ marginBottom: 24 }}
            >
              <Input.Password
                placeholder='Enter your password'
                size='large'
                style={{ background: C.inputBg, borderColor: C.inputBorder, color: C.heading }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type='primary'
                htmlType='submit'
                block
                size='large'
                style={{
                  background: gradient,
                  border: 'none',
                  fontWeight: 500,
                  boxShadow: '0 12px 24px -8px rgba(129, 140, 248, 0.4)',
                }}
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>

          <Divider plain style={{ color: C.muted, fontSize: 12, margin: '24px 0' }}>
            OR CONTINUE WITH
          </Divider>

          <Space.Compact block>
            <Button
              size='large'
              icon={<GoogleIcon />}
              style={{ background: 'transparent', borderColor: C.inputBorder, color: C.heading }}
            >
              Google
            </Button>
            <Button
              size='large'
              icon={<GitHubIcon />}
              style={{ background: 'transparent', borderColor: C.inputBorder, color: C.heading }}
            >
              GitHub
            </Button>
          </Space.Compact>

          <Text style={{ display: 'block', marginTop: 28, textAlign: 'center', color: C.subtext, fontSize: 14 }}>
            Don&apos;t have an account?{' '}
            <Link
              href='/sign-up'
              style={{ color: C.link, fontWeight: 500 }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = C.linkHover)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = C.link)}
            >
              Sign up
            </Link>
          </Text>
        </Card>

        <Text style={{ display: 'block', marginTop: 24, textAlign: 'center', color: C.muted, fontSize: 12 }}>
          &copy; 2026 Bazar Inventory. All rights reserved.
        </Text>
      </div>
    </Flex>
  )
}
