import Alpine from 'alpinejs'
import { Counter, TodoList, Modal, RandomWheel, ThemeToggle } from './components/index.js'

// Register components with Alpine (following Alpine.js naming conventions)
Alpine.data('Counter', Counter)
Alpine.data('TodoList', TodoList)
Alpine.data('Modal', Modal)
Alpine.data('RandomWheel', RandomWheel)
Alpine.data('ThemeToggle', ThemeToggle)

// Make Alpine available globally
window.Alpine = Alpine

// Start Alpine
Alpine.start()
