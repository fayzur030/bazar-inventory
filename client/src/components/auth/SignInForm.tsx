import { cn } from 'cn'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Welcome back</CardTitle>
          <CardDescription>
            Login with your Github or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <Button variant='outline' type='button'>
                  <svg
                    viewBox='0 0 24 24'
                    className='h-5 w-5 fill-gray-900'
                    aria-hidden='true'
                  >
                    <path d='M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.47 11.47 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.13 3.17.76.84 1.22 1.91 1.22 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z' />
                  </svg>
                  Login with GitHub
                </Button>
                <Button variant='outline' type='button'>
                  <svg
                    viewBox='0 0 24 24'
                    className='h-5 w-5'
                    aria-hidden='true'
                  >
                    <path
                      fill='#4285F4'
                      d='M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.45a5.51 5.51 0 0 1-2.39 3.62v3.01h3.87c2.27-2.09 3.56-5.17 3.56-8.66Z'
                    />
                    <path
                      fill='#34A853'
                      d='M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.87-3.01c-1.07.72-2.43 1.15-4.06 1.15-3.13 0-5.79-2.11-6.74-4.95H1.26v3.1A12 12 0 0 0 12 24Z'
                    />
                    <path
                      fill='#FBBC05'
                      d='M5.26 14.28A7.2 7.2 0 0 1 4.88 12c0-.79.14-1.56.38-2.28V6.62H1.26A12 12 0 0 0 0 12c0 1.94.46 3.78 1.26 5.38l4-3.1Z'
                    />
                    <path
                      fill='#EA4335'
                      d='M12 4.77c1.76 0 3.34.61 4.58 1.8l3.43-3.43C17.95 1.16 15.24 0 12 0A12 12 0 0 0 1.26 6.62l4 3.1c.95-2.84 3.61-4.95 6.74-4.95Z'
                    />
                  </svg>
                  Login with Google
                </Button>
              </Field>
              <FieldSeparator className='*:data-[slot=field-separator-content]:bg-card'>
                Or continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor='email'>Email</FieldLabel>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  required
                />
              </Field>
              <Field>
                <div className='flex items-center'>
                  <FieldLabel htmlFor='password'>Password</FieldLabel>
                  <a
                    href='#'
                    className='ml-auto text-sm underline-offset-4 hover:underline'
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id='password' type='password' required />
              </Field>
              <Field>
                <Link href={'/dashboard'}>
                  {' '}
                  <Button type='submit'>Login</Button>
                </Link>
                <FieldDescription className='text-center'>
                  Don&apos;t have an account? <a href='#'>Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className='px-6 text-center'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
        and <a href='#'>Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
