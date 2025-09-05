// Random Wheel Component
export function RandomWheel() {
    return {
        // State
        items: [],
        newItem: '',
        selectedItem: null,
        isSpinning: false,
        showAddForm: false,
        
        // Methods
        addItem() {
            if (this.newItem.trim()) {
                this.items.push({
                    id: Date.now(),
                    text: this.newItem.trim(),
                    createdAt: new Date().toISOString()
                });
                this.newItem = '';
                this.showAddForm = false;
            }
        },
        
        removeItem(id) {
            this.items = this.items.filter(item => item.id !== id);
            // Clear selection if the selected item was removed
            if (this.selectedItem && this.selectedItem.id === id) {
                this.selectedItem = null;
            }
        },
        
        spinWheel() {
            if (this.items.length === 0) return;
            
            this.isSpinning = true;
            this.selectedItem = null;
            
            // Calculate spin parameters
            const spinDuration = 3000 + Math.random() * 2000; // 3-5 seconds
            const minRotations = 5; // Minimum full rotations
            const maxRotations = 8; // Maximum full rotations
            const totalRotations = minRotations + Math.random() * (maxRotations - minRotations);
            
            // Calculate final angle (where the wheel will stop)
            const finalIndex = Math.floor(Math.random() * this.items.length);
            const segmentAngle = 360 / this.items.length;
            const finalAngle = (finalIndex * segmentAngle) + (Math.random() * segmentAngle);
            
            // Total rotation including full spins
            const totalAngle = (totalRotations * 360) + finalAngle;
            
            // Apply the rotation
            const wheelElement = this.$refs.spinningWheel;
            if (wheelElement) {
                wheelElement.style.transition = `transform ${spinDuration}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)`;
                wheelElement.style.transform = `rotate(${totalAngle}deg)`;
            }
            
            // Set the final selected item
            setTimeout(() => {
                this.selectedItem = this.items[finalIndex];
                this.isSpinning = false;
            }, spinDuration);
        },
        
        clearAllItems() {
            this.items = [];
            this.selectedItem = null;
        },
        
        // Computed properties
        get hasItems() {
            return this.items.length > 0;
        },
        
        get canSpin() {
            return this.hasItems && !this.isSpinning;
        },
        
        // Helper methods
        getSegmentColor(index) {
            const colors = [
                '#ff5f39', // primary-500
                '#ff8f75', // primary-400
                '#ff3d1a', // primary-600
                '#ffb8a8', // primary-300
                '#d42a0f', // primary-700
                '#ffd5cc', // primary-200
                '#b02312', // primary-800
                '#922217'  // primary-900
            ];
            return colors[index % colors.length];
        },
        
        getTextColor(index) {
            const color = this.getSegmentColor(index);
            // Convert hex to RGB
            const hex = color.replace('#', '');
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            
            // Calculate brightness using luminance formula
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            
            // Return black text for light backgrounds, white for dark
            return brightness > 128 ? '#000000' : '#ffffff';
        },
        
        getConicGradient() {
            if (!this.items || this.items.length === 0) return '#ff5f39';
            
            const segmentAngle = 360 / this.items.length;
            const gradientStops = this.items.map((item, index) => {
                const startAngle = index * segmentAngle;
                const endAngle = (index + 1) * segmentAngle;
                const color = this.getSegmentColor(index);
                return `${color} ${startAngle}deg ${endAngle}deg`;
            });
            
            return gradientStops.join(', ');
        },
        
        
        // Lifecycle methods
        init() {
            console.log('Random Wheel component initialized');
            
            // Load items from localStorage
            const savedItems = localStorage.getItem('randomWheelItems');
            if (savedItems) {
                try {
                    this.items = JSON.parse(savedItems);
                } catch (e) {
                    console.error('Error loading wheel items:', e);
                    // If there's an error, start with default items
                    this.items = [
                        { id: 1, text: 'Option 1', createdAt: new Date().toISOString() },
                        { id: 2, text: 'Option 2', createdAt: new Date().toISOString() },
                        { id: 3, text: 'Option 3', createdAt: new Date().toISOString() }
                    ];
                }
            } else {
                // If no saved items, start with default ones
                this.items = [
                    { id: 1, text: 'Option 1', createdAt: new Date().toISOString() },
                    { id: 2, text: 'Option 2', createdAt: new Date().toISOString() },
                    { id: 3, text: 'Option 3', createdAt: new Date().toISOString() }
                ];
            }
            
            // Watch for changes to items and save to localStorage
            this.$watch('items', (newItems) => {
                localStorage.setItem('randomWheelItems', JSON.stringify(newItems));
            }, { deep: true });
        }
    }
}
