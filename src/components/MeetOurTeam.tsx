import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { fetchTeam } from '../services/teamService';
import { Employee } from '@/data/teamData';
import { HRLoginForm } from './HRLoginForm';
import { Search } from 'lucide-react';

export function MeetOurTeam() {
    const [team, setTeam] = useState<Employee[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        // Load team members from Supabase
        fetchTeam().then(setTeam).catch(console.error);

        // Check if user previously logged in via HR passkey
        const storedAuth = localStorage.getItem('hr_authenticated');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }

        // Check Supabase Auth session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) setIsAuthenticated(true);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            // Only force true if a valid Supabase session exists
            if (session) {
                setIsAuthenticated(true);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem('hr_authenticated');
        setIsAuthenticated(false);
    };

    const handleLoginSuccess = () => {
        localStorage.setItem('hr_authenticated', 'true');
        setIsAuthenticated(true);
        setShowLoginModal(false);
    };

    const filteredTeam = team.filter((e) =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header Bar */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-carbon">Meet Our Team</h1>

                {!isAuthenticated ? (
                    <button
                        onClick={() => setShowLoginModal(true)}
                        className="px-4 py-2 text-sm bg-ink text-white rounded-lg hover:bg-ink/90 transition-all"
                    >
                        HR Portal Access
                    </button>
                ) : (
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-green-600">
                            HR Mode Active
                        </span>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1.5 text-xs border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-all"
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </div>

            {/* Fixed Search Bar (Space added before -ml-2) */}
            <div className="w-full max-w-md mr-auto mb-8 -ml-2">
                <div className="relative flex items-center">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-carbon/40" />
                    <input
                        type="text"
                        placeholder="Search by name, role, or skills"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-line bg-paper pl-10 pr-4 py-2.5 text-sm text-carbon focus:border-ink focus:outline-none transition-all"
                    />
                </div>
            </div>

            {/* HR Actions Panel */}
            {isAuthenticated && (
                <div className="mb-6 p-4 border border-line rounded-xl bg-paper flex items-center justify-between">
                    <span className="text-sm font-medium">HR Management Tools</span>
                    <button className="px-4 py-2 bg-ink text-white rounded-lg text-sm">
                        + Add New Employee
                    </button>
                </div>
            )}

            {/* Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeam.map((emp) => (
                    <div key={emp.id} className="p-4 border border-line rounded-xl bg-paper">
                        <img src={emp.photo || '/placeholder.jpg'} alt={emp.name} className="w-20 h-20 rounded-full mb-3 object-cover" />
                        <h3 className="font-bold text-lg">{emp.name}</h3>
                        <p className="text-sm text-carbon/70">{emp.role}</p>
                        <p className="text-xs text-carbon/50">{emp.department}</p>
                    </div>
                ))}
            </div>

            {/* HR Login Modal */}
            {showLoginModal && !isAuthenticated && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-paper p-6 rounded-2xl relative w-full max-w-sm shadow-xl border border-line">
                        <button
                            onClick={() => setShowLoginModal(false)}
                            className="absolute top-3 right-3 text-carbon/60 hover:text-carbon"
                        >
                            ✕
                        </button>
                        <HRLoginForm onLoginSuccess={handleLoginSuccess} />
                    </div>
                </div>
            )}
        </div>
    );
}   