// Quick Note Component
export function Modal() {
    return {
        // State
        showModal: false,
        noteText: '',
        notes: [],
        
        // Methods
        openModal() {
            this.showModal = true;
            // Focus on textarea when modal opens
            this.$nextTick(() => {
                const textarea = this.$refs.noteTextarea;
                if (textarea) textarea.focus();
            });
        },
        
        closeModal() {
            this.showModal = false;
            this.noteText = '';
        },
        
        saveNote() {
            if (this.noteText.trim()) {
                this.notes.push({
                    id: Date.now(),
                    text: this.noteText.trim(),
                    createdAt: new Date().toLocaleString()
                });
                this.noteText = '';
                this.closeModal();
            }
        },
        
        deleteNote(id) {
            this.notes = this.notes.filter(note => note.id !== id);
        },
        
        clearAllNotes() {
            this.notes = [];
        },
        
        // Computed properties
        get hasNotes() {
            return this.notes.length > 0;
        },
        
        // Lifecycle methods
        init() {
            console.log('Quick Note component initialized');
            // Load notes from localStorage if available
            const savedNotes = localStorage.getItem('quickNotes');
            if (savedNotes) {
                try {
                    this.notes = JSON.parse(savedNotes);
                } catch (e) {
                    console.error('Error loading notes:', e);
                }
            }
            
            // Watch for changes to notes and save to localStorage
            this.$watch('notes', (newNotes) => {
                localStorage.setItem('quickNotes', JSON.stringify(newNotes));
            }, { deep: true });
        }
    }
}

