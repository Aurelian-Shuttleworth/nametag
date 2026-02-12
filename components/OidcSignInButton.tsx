'use client';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';

interface OidcSignInButtonProps {
  mode: 'signin' | 'signup';
}

export function OidcSignInButton({ mode }: OidcSignInButtonProps) {
  const t = useTranslations('auth');
  return (
    <button
      type="button"
      onClick={() => signIn('oidc', { callbackUrl: '/dashboard' })}
      className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-border rounded-lg hover:bg-surface-hover transition-colors"
    >
      <span>
        {mode === 'signin' ? t('signInWithOidc') : t('signUpWithOidc')}
      </span>
    </button>
  );
}
