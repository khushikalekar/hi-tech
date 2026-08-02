import { useState } from 'react';
import { Lock, Mail, ArrowLeft, Loader2, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { businessInfo } from '@/data/business';

interface AdminLoginPageProps {
  onBackToSite: () => void;
  onLoginSuccess: () => void;
}

export default function AdminLoginPage({ onBackToSite, onLoginSuccess }: AdminLoginPageProps) {
  const { signIn, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'login' | 'reset'>('login');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) {
        setError(
          error === 'Invalid login credentials'
            ? 'Invalid email or password. Please try again.'
            : error,
        );
        setLoading(false);
      } else {
        onLoginSuccess();
      }
    } else {
      const { error } = await resetPassword(email);
      if (error) {
        setError(error);
      } else {
        setResetSent(true);
      }
      setLoading(false);
    }
  };

  const inputClass =
    'w-full pl-11 pr-4 py-3 border border-navy-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all text-navy-800 placeholder-navy-400';

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 section-pattern opacity-30" />

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-strong p-8 animate-fade-in-up">
          {/* Logo + branding */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={businessInfo.logo}
              alt="Hitech Solutions"
              className="h-16 w-16 rounded-xl object-cover ring-2 ring-brand-100 mb-3"
            />
            <h1 className="font-heading font-bold text-2xl text-navy-900">
              {mode === 'login' ? 'Owner Login' : 'Reset Password'}
            </h1>
            <p className="text-sm text-navy-500 mt-1">
              {mode === 'login'
                ? 'Sign in to manage your website'
                : 'Enter your email to receive a reset link'}
            </p>
          </div>

          {/* Security badge */}
          {mode === 'login' && (
            <div className="flex items-center justify-center gap-1.5 mb-5 text-xs text-navy-400">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Secured admin access — authorized personnel only</span>
            </div>
          )}

          {resetSent ? (
            <div className="text-center py-6">
              <div className="p-3 rounded-full bg-emerald-50 w-fit mx-auto mb-4">
                <Mail className="h-8 w-8 text-emerald-500" />
              </div>
              <p className="text-navy-700 font-medium mb-2">Reset link sent!</p>
              <p className="text-sm text-navy-500 mb-6">
                Check your email for password reset instructions.
              </p>
              <button
                onClick={() => {
                  setMode('login');
                  setResetSent(false);
                }}
                className="btn-primary w-full"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-navy-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@hitechsolutions.in"
                    className={inputClass}
                  />
                </div>
              </div>

              {mode === 'login' && (
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-navy-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-11 pr-11 py-3 border border-navy-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all text-navy-800 placeholder-navy-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                  {error}
                </div>
              )}

              {mode === 'login' && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-navy-300 text-brand-600 focus:ring-brand-400"
                    />
                    <span className="text-sm text-navy-600">Remember Me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('reset');
                      setError(null);
                    }}
                    className="text-sm text-brand-600 hover:text-brand-700 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full !py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {mode === 'login' ? 'Signing in...' : 'Sending...'}
                  </>
                ) : mode === 'login' ? (
                  'Sign In'
                ) : (
                  'Send Reset Link'
                )}
              </button>

              {mode === 'reset' && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setError(null);
                    }}
                    className="text-sm text-brand-600 hover:text-brand-700 font-medium"
                  >
                    Back to login
                  </button>
                </div>
              )}
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-navy-100">
            <button
              onClick={onBackToSite}
              className="w-full flex items-center justify-center gap-2 text-sm text-navy-500 hover:text-navy-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Website
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-navy-300 mt-4">
          {businessInfo.name} — Admin Portal
        </p>
      </div>
    </div>
  );
}
