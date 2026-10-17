import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function SignInForm() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-[#0B1020] px-4 py-10 text-white'>
      <div className='w-full max-w-md'>
        {/* <div className='mb-8 text-center'>
          <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600'>
            <Package size={30} />
          </div>
          <h1 className='text-2xl font-bold tracking-tight'>Bazar Inventory</h1>
          <p className='mt-2 text-sm text-gray-400'>
            Smart inventory. Simplified management.
          </p>
        </div> */}

        <div className='rounded-2xl border border-slate-800 bg-[#111827] p-6 shadow-2xl sm:p-8'>
          <h2 className='text-2xl font-semibold'>Welcome back</h2>
          <p className='mt-2 text-sm text-gray-400'>
            Sign in to manage your inventory.
          </p>

          <form className='mt-7 space-y-5'>
            <div>
              <label className='mb-2 block text-sm font-medium'>
                Email address
              </label>
              <input
                type='email'
                placeholder='you@example.com'
                className='w-full rounded-xl border border-slate-700 bg-[#0B1020] px-4 py-3 outline-none transition placeholder:text-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
              />
            </div>

            <div>
              <div className='mb-2 flex justify-between'>
                <label className='text-sm font-medium'>Password</label>
                <Link
                  href='/forgot-password'
                  className='text-sm text-indigo-400 hover:text-indigo-300'
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type='password'
                placeholder='Enter your password'
                className='w-full rounded-xl border border-slate-700 bg-[#0B1020] px-4 py-3 outline-none transition placeholder:text-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
              />
            </div>

            <button
              type='button'
              className='flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-medium transition hover:bg-indigo-500'
            >
              Sign in <ArrowRight size={18} />
            </button>
          </form>

          <div className='my-6 flex items-center gap-4'>
            <div className='h-px flex-1 bg-slate-700' />
            <span className='text-xs text-gray-500'>OR CONTINUE WITH</span>
            <div className='h-px flex-1 bg-slate-700' />
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <button
              type='button'
              className='flex items-center justify-center gap-2 rounded-xl border border-slate-700 py-3 text-sm font-medium transition hover:bg-slate-800'
            >
              <svg viewBox='0 0 48 48' className='h-5 w-5'>
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
              Google
            </button>

            <button
              type='button'
              className='flex items-center justify-center gap-2 rounded-xl border border-slate-700 py-3 text-sm font-medium transition hover:bg-slate-800'
            >
              {' '}
              <svg
                viewBox='0 0 24 24'
                className='h-5 w-5 fill-white'
                aria-hidden='true'
              >
                <path d='M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.47 11.47 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.13 3.17.76.84 1.22 1.91 1.22 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z' />
              </svg>
              GitHub
            </button>
          </div>

          <p className='mt-7 text-center text-sm text-gray-400'>
            Don't have an account?{' '}
            <Link
              href='/sign-up'
              className='font-medium text-indigo-400 hover:text-indigo-300'
            >
              Sign up
            </Link>
          </p>
        </div>

        <p className='mt-6 text-center text-xs text-gray-500'>
          © 2026 Bazar Inventory. All rights reserved.
        </p>
      </div>
    </main>
  )
}
