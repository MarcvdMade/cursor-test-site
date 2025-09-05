// Theme Toggle Component
export function ThemeToggle() {
    return {
        // State
        isDark: false,
        
        // Methods
        toggleTheme() {
            this.isDark = !this.isDark;
            this.applyTheme();
        },
        
        applyTheme() {
            console.log('Applying theme:', this.isDark ? 'dark' : 'light');
            if (this.isDark) {
                document.documentElement.classList.add('dark');
                console.log('Added dark class to html element');
            } else {
                document.documentElement.classList.remove('dark');
                console.log('Removed dark class from html element');
            }
            // Save to localStorage
            localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
            console.log('Theme saved to localStorage:', this.isDark ? 'dark' : 'light');
        },
        
        // Computed properties
        get themeIcon() {
            return this.isDark ? 'sun' : 'moon';
        },
        
        get themeLabel() {
            return this.isDark ? 'Switch to light mode' : 'Switch to dark mode';
        },
        
        // Lifecycle methods
        init() {
            console.log('Theme Toggle component initialized');
            
            // Load theme from localStorage or system preference
            const savedTheme = localStorage.getItem('theme');
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme) {
                this.isDark = savedTheme === 'dark';
            } else {
                this.isDark = systemPrefersDark;
            }
            
            // Apply the theme
            this.applyTheme();
            
            // Listen for system theme changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.isDark = e.matches;
                    this.applyTheme();
                }
            });
        }
    }
}
