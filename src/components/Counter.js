// Multi-Counter Component
export function Counter() {
    return {
        // State
        counters: [],
        newCounterTitle: '',
        showAddForm: false,
        
        // Methods
        addCounter() {
            if (this.newCounterTitle.trim()) {
                const newCounter = {
                    id: Date.now(),
                    title: this.newCounterTitle.trim(),
                    count: 0,
                    createdAt: new Date().toISOString()
                };
                this.counters.push(newCounter);
                this.newCounterTitle = '';
                this.showAddForm = false;
            }
        },
        
        removeCounter(id) {
            this.counters = this.counters.filter(counter => counter.id !== id);
        },
        
        increment(id) {
            const counter = this.counters.find(c => c.id === id);
            if (counter) counter.count++;
        },
        
        decrement(id) {
            const counter = this.counters.find(c => c.id === id);
            if (counter) counter.count--;
        },
        
        reset(id) {
            const counter = this.counters.find(c => c.id === id);
            if (counter) counter.count = 0;
        },
        
        clearAllCounters() {
            this.counters = [];
        },
        
        // Computed properties
        get hasCounters() {
            return this.counters.length > 0;
        },
        
        get totalCount() {
            return this.counters.reduce((sum, counter) => sum + counter.count, 0);
        },
        
        // Lifecycle methods
        init() {
            console.log('Multi-Counter component initialized');
            
            // Load counters from localStorage
            const savedCounters = localStorage.getItem('multiCounters');
            if (savedCounters) {
                try {
                    this.counters = JSON.parse(savedCounters);
                } catch (e) {
                    console.error('Error loading counters:', e);
                    // If there's an error, start with default counter
                    this.counters = [
                        {
                            id: 1,
                            title: 'Default Counter',
                            count: 0,
                            createdAt: new Date().toISOString()
                        }
                    ];
                }
            } else {
                // If no saved counters, start with a default one
                this.counters = [
                    {
                        id: 1,
                        title: 'Default Counter',
                        count: 0,
                        createdAt: new Date().toISOString()
                    }
                ];
            }
            
            // Watch for changes to counters and save to localStorage
            this.$watch('counters', (newCounters) => {
                localStorage.setItem('multiCounters', JSON.stringify(newCounters));
            }, { deep: true });
        }
    }
}

