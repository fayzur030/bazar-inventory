import { SignInForm } from '@/components/auth/SignInForm'
import logo from '@/assets/Bazar-Inventory Storefront Logo (1).png'
import Link from 'next/link'
import Image from 'next/image'

const SignInPage = () => {
  return (
    <div>
      <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10'>
        <div className='flex w-full max-w-sm flex-col gap-6'>
          <Link
            href='#'
            className='flex items-center gap-2 self-center font-medium'
          >
            <div>
              <Image src={logo} alt='Logo' width={100} height={100} />
            </div>
          </Link>
          <SignInForm />
        </div>
      </div>
    </div>
  )
}

export default SignInPage
