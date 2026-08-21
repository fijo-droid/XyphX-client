import { useState } from 'react';

export function HRLoginForm({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    const [passkey, setPasskey] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        // Gets passkey from .env.local (defaults to 'fijopanto@007' if env is missing)
        const validPasskey = import.meta.env.VITE_HR_PASSKEY || 'fijopanto@007';

        if (passkey.trim() === validPasskey) {
            onLoginSuccess();
        } else {
            setErrorMsg('Invalid HR Authorization Passkey');
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <h3 className="text-lg font-bold text-carbon">HR Admin Login</h3>

            <div>
                <label className="block text-xs font-medium text-carbon/70 mb-1">
                    HR Passkey
                </label>
                <input
                    type="password"
                    placeholder="Enter HR Passkey"
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    className="w-full p-2.5 border border-line rounded-lg text-sm text-carbon focus:outline-none focus:ring-1 focus:ring-ink"
                    required
                />
            </div>

            {errorMsg && <p className="text-xs text-red-500 font-medium">{errorMsg}</p>}

            <button
                type="submit"
                className="w-full bg-ink text-white py-2.5 rounded-lg text-sm font-medium hover:bg-ink/90 transition-all"
            >
                Submit Passkey
            </button>
        </form>
    );
}