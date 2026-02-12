'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface OidcSignInButtonProps {
  mode?: 'signin' | 'signup';
}

export function OidcSignInButton({ mode = 'signin' }: OidcSignInButtonProps) {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const [isLoading, setIsLoading] = useState(false);

  const handleOidcSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('oidc', { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('OIDC sign-in error:', error);
      setIsLoading(false);
    }
  };

  const buttonText =
    mode === 'signin' ? 'Sign in with SSO' : 'Sign up with SSO';

  return (
    <button
      type="button"
      onClick={handleOidcSignIn}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-border rounded-lg shadow-sm bg-surface hover:bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isLoading ? (
        <span className="text-sm font-medium text-foreground">
          {tCommon('loading')}
        </span>
      ) : (
        <>
          <svg
            className="w-5 h-5 text-foreground"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span className="text-sm font-medium text-foreground">
            {buttonText}
          </span>
        </>
      )}
    </button>
  );
}
