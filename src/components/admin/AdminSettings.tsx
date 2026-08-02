import { useState } from 'react';
import { Lock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { businessInfo } from '@/data/business';

export default function AdminSettings() {
  const { user, updatePassword } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setSaving(true);
    const { error } = await updatePassword(newPassword);
    setSaving(false);

    if (error) {
      setMessage({ type: 'error', text: error });
    } else {
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const inputClass = 'w-full pl-11 pr-4 py-3 border border-navy-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all text-navy-800 placeholder-navy-400';

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading font-bold text-2xl text-navy-900">Settings</h2>
        <p className="text-navy-500 mt-1">Manage your account settings.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Account info */}
        <div className="bg-white rounded-2xl shadow-soft border border-navy-100 p-6">
          <h3 className="font-heading font-semibold text-lg text-navy-900 mb-4">Account Information</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-1">Email</label>
              <p className="text-navy-800 font-medium">{user?.email}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-1">Role</label>
              <p className="text-navy-800 font-medium">Owner / Admin</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-1">Business</label>
              <p className="text-navy-800 font-medium">{businessInfo.name}</p>
            </div>
          </div>
        </div>

        {/* Change password */}
        <div className="bg-white rounded-2xl shadow-soft border border-navy-100 p-6">
          <h3 className="font-heading font-semibold text-lg text-navy-900 mb-4">Change Password</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-navy-400" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-navy-400" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className={inputClass}
                />
              </div>
            </div>

            {message && (
              <div className={`px-4 py-3 rounded-xl text-sm flex items-center gap-2 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                {message.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                {message.text}
              </div>
            )}

            <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-60">
              {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Lock className="h-5 w-5" />}
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
