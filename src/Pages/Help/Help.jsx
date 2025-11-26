

export default function Help() {
    return(
        <div className="bg-(--backgroundColor) flex flex-col mx-auto max-w-3xl w-full h-screen p-6 overflow-y-auto pt-15 gap-10 animate-fade-in">
            <h1 className="text-3xl font-bold mb-6 text-(--primaryColor)">Ascend Application Help Center</h1>
            
            <div className="flex flex-col gap-8">
                <section>
                    <p className="text-lg text-(--textColorSecondary) mb-6">
                        Welcome to Ascend! This application is designed to help you track your personal development and goals through gamification.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                        Getting Started
                    </h2>
                    <p className="mb-4 text-(--textColorSecondary)">The application uses an email and password system for authentication.</p>
                    <ol className="list-decimal list-inside space-y-3 text-(--textColorSecondary)">
                        <li><span className="text-white font-medium">Sign In:</span> If you already have an account, sign in with your email and password.</li>
                        <li><span className="text-white font-medium">Sign Up:</span> If you are a new user, create an account. You will be prompted to check your email for a login link to complete the sign-up process.</li>
                    </ol>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4 text-white">Core Concepts</h2>
                    <p className="mb-4 text-(--textColorSecondary)">Ascend uses several metrics to track your progress, all viewable in the User Stats section on the Home and Profile pages.</p>
                    <ul className="space-y-4">
                        <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                            <span className="text-blue-400 font-bold whitespace-nowrap">Experience Points (XP):</span>
                            <span className="text-(--textColorSecondary)">Earn XP by completing tasks and challenges. Accumulate XP to level up your character.</span>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                            <span className="text-yellow-400 font-bold whitespace-nowrap">Level:</span>
                            <span className="text-(--textColorSecondary)">Your level increases as you gain XP. Higher levels unlock new features and rewards.</span>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                            <span className="text-red-400 font-bold whitespace-nowrap">Health Points (HP):</span>
                            <span className="text-(--textColorSecondary)">HP represents your character's vitality. Completing tasks restores HP, while failing to complete them may decrease it.</span>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                            <span className="text-green-400 font-bold whitespace-nowrap">Stamina:</span>
                            <span className="text-(--textColorSecondary)">Stamina is used to perform actions within the app. It regenerates over time or through specific activities.</span>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4 text-white">Navigating the App</h2>
                    <p className="mb-4 text-(--textColorSecondary)">The main sections of the app include:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl hover:bg-white/10 transition-colors">
                            <strong className="text-white block mb-1">Home</strong>
                            <span className="text-sm text-(--textColorSecondary)">View your current stats, recent activities, and quick access to tasks.</span>
                        </div>
                        <div className="p-4 rounded-xl hover:bg-white/10 transition-colors">
                            <strong className="text-white block mb-1">Profile</strong>
                            <span className="text-sm text-(--textColorSecondary)">Manage your personal information, view detailed stats, and customize your avatar.</span>
                        </div>
                        <div className="p-4 rounded-xl hover:bg-white/10 transition-colors">
                            <strong className="text-white block mb-1">Tasks</strong>
                            <span className="text-sm text-(--textColorSecondary)">Create, view, and manage your tasks and challenges.</span>
                        </div>
                        <div className="p-4 rounded-xl hover:bg-white/10 transition-colors">
                            <strong className="text-white block mb-1">Settings</strong>
                            <span className="text-sm text-(--textColorSecondary)">Adjust your preferences, notification settings, and account details.</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};