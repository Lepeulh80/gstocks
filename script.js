// GST Calculator Application
class GSTCalculator {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.applyTheme();
        this.initializeCalculators();
        this.setupNavigation();
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        
        // Menu toggle for mobile
        document.getElementById('menuToggle').addEventListener('click', () => this.toggleMenu());
        
        // Main calculator
        document.getElementById('calculateBtn').addEventListener('click', () => this.calculateGST());
        
        // Business type calculators
        document.getElementById('b2bCalculate').addEventListener('click', () => this.calculateB2B());
        document.getElementById('b2cCalculate').addEventListener('click', () => this.calculateB2C());
        
        // Reverse calculator
        document.getElementById('reverseCalculate').addEventListener('click', () => this.calculateReverse());
        
        // Rate finder
        document.getElementById('searchBtn').addEventListener('click', () => this.searchRates());
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchRates();
        });
        
        // Real-time calculation on input change
        document.getElementById('amount').addEventListener('input', () => this.calculateGST());
        document.getElementById('gstRate').addEventListener('change', () => this.calculateGST());
        document.getElementById('calculationType').addEventListener('change', () => this.calculateGST());
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('data-section');
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Show target section
                sections.forEach(s => s.classList.remove('active'));
                document.getElementById(targetSection).classList.add('active');
                
                // Close mobile menu
                this.closeMobileMenu();
            });
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    toggleMenu() {
        const nav = document.getElementById('nav');
        nav.classList.toggle('mobile-open');
    }

    closeMobileMenu() {
        const nav = document.getElementById('nav');
        nav.classList.remove('mobile-open');
    }

    calculateGST() {
        const amount = parseFloat(document.getElementById('amount').value) || 0;
        const gstRate = parseFloat(document.getElementById('gstRate').value) || 0;
        const calculationType = document.getElementById('calculationType').value;
        
        let originalAmount, gstAmount, totalAmount;
        
        if (calculationType === 'exclusive') {
            originalAmount = amount;
            gstAmount = (amount * gstRate) / 100;
            totalAmount = originalAmount + gstAmount;
        } else {
            totalAmount = amount;
            originalAmount = amount / (1 + gstRate / 100);
            gstAmount = totalAmount - originalAmount;
        }
        
        const cgstAmount = gstAmount / 2;
        const sgstAmount = gstAmount / 2;
        
        this.displayResults({
            originalAmount,
            gstAmount,
            totalAmount,
            cgstAmount,
            sgstAmount
        });
    }

    calculateB2B() {
        const amount = parseFloat(document.getElementById('b2bAmount').value) || 0;
        const gstRate = parseFloat(document.getElementById('b2bRate').value) || 0;
        
        const gstAmount = (amount * gstRate) / 100;
        const totalAmount = amount + gstAmount;
        const cgstAmount = gstAmount / 2;
        const sgstAmount = gstAmount / 2;
        
        const results = `
            <div class="result-item">
                <span class="result-label">Original Amount:</span>
                <span class="result-value">₹${amount.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">GST Amount:</span>
                <span class="result-value">₹${gstAmount.toFixed(2)}</span>
            </div>
            <div class="result-item total">
                <span class="result-label">Total Amount:</span>
                <span class="result-value">₹${totalAmount.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">CGST (${(gstRate/2).toFixed(1)}%):</span>
                <span class="result-value">₹${cgstAmount.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">SGST (${(gstRate/2).toFixed(1)}%):</span>
                <span class="result-value">₹${sgstAmount.toFixed(2)}</span>
            </div>
        `;
        
        document.getElementById('b2bResults').innerHTML = results;
        document.getElementById('b2bResults').classList.add('show');
    }

    calculateB2C() {
        const amount = parseFloat(document.getElementById('b2cAmount').value) || 0;
        const gstRate = parseFloat(document.getElementById('b2cRate').value) || 0;
        
        const gstAmount = (amount * gstRate) / 100;
        const totalAmount = amount + gstAmount;
        const cgstAmount = gstAmount / 2;
        const sgstAmount = gstAmount / 2;
        
        const results = `
            <div class="result-item">
                <span class="result-label">Original Amount:</span>
                <span class="result-value">₹${amount.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">GST Amount:</span>
                <span class="result-value">₹${gstAmount.toFixed(2)}</span>
            </div>
            <div class="result-item total">
                <span class="result-label">Total Amount:</span>
                <span class="result-value">₹${totalAmount.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">CGST (${(gstRate/2).toFixed(1)}%):</span>
                <span class="result-value">₹${cgstAmount.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">SGST (${(gstRate/2).toFixed(1)}%):</span>
                <span class="result-value">₹${sgstAmount.toFixed(2)}</span>
            </div>
        `;
        
        document.getElementById('b2cResults').innerHTML = results;
        document.getElementById('b2cResults').classList.add('show');
    }

    calculateReverse() {
        const totalAmount = parseFloat(document.getElementById('reverseAmount').value) || 0;
        const gstRate = parseFloat(document.getElementById('reverseRate').value) || 0;
        
        const originalAmount = totalAmount / (1 + gstRate / 100);
        const gstAmount = totalAmount - originalAmount;
        
        document.getElementById('reverseOriginalAmount').textContent = `₹${originalAmount.toFixed(2)}`;
        document.getElementById('reverseGstAmount').textContent = `₹${gstAmount.toFixed(2)}`;
    }

    displayResults(results) {
        document.getElementById('originalAmount').textContent = `₹${results.originalAmount.toFixed(2)}`;
        document.getElementById('gstAmount').textContent = `₹${results.gstAmount.toFixed(2)}`;
        document.getElementById('totalAmount').textContent = `₹${results.totalAmount.toFixed(2)}`;
        document.getElementById('cgstAmount').textContent = `₹${results.cgstAmount.toFixed(2)}`;
        document.getElementById('sgstAmount').textContent = `₹${results.sgstAmount.toFixed(2)}`;
    }

    searchRates() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const searchResults = document.getElementById('searchResults');
        
        // Sample data - in a real app, this would come from an API
        const rateData = [
            { name: 'Mobile Phones', rate: '12%', description: 'Smartphones and mobile devices' },
            { name: 'Restaurant Services (AC)', rate: '18%', description: 'Air-conditioned restaurants' },
            { name: 'Books', rate: '0%', description: 'Educational books and literature' },
            { name: 'Medicines', rate: '5%', description: 'Essential medicines' },
            { name: 'Luxury Cars', rate: '28%', description: 'High-end automobiles' },
            { name: 'IT Services', rate: '18%', description: 'Software and IT services' },
            { name: 'Essential Food', rate: '0%', description: 'Basic food items' },
            { name: 'Processed Food', rate: '12%', description: 'Packaged food items' },
            { name: 'Hotel Services', rate: '18%', description: 'Hotel accommodation' },
            { name: 'Five Star Hotels', rate: '28%', description: 'Luxury hotel services' },
            { name: 'Educational Services', rate: '0%', description: 'Educational institutions' },
            { name: 'Healthcare Services', rate: '0%', description: 'Medical services' },
            { name: 'Transport Services', rate: '5%', description: 'Public transportation' },
            { name: 'Entertainment', rate: '28%', description: 'Cinema and entertainment' },
            { name: 'Financial Services', rate: '18%', description: 'Banking and finance' }
        ];
        
        const filteredData = rateData.filter(item => 
            item.name.toLowerCase().includes(searchTerm) || 
            item.description.toLowerCase().includes(searchTerm)
        );
        
        if (filteredData.length === 0) {
            searchResults.innerHTML = '<div class="search-item"><p>No results found. Try a different search term.</p></div>';
            return;
        }
        
        const resultsHTML = filteredData.map(item => `
            <div class="search-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                </div>
                <span class="gst-rate">${item.rate}</span>
            </div>
        `).join('');
        
        searchResults.innerHTML = resultsHTML;
    }

    initializeCalculators() {
        // Initialize with default values
        this.calculateGST();
    }
}

// GST Rate Database
class GSTRateDatabase {
    constructor() {
        this.rates = {
            '0%': [
                'Essential food items (rice, wheat, etc.)',
                'Books and newspapers',
                'Educational services',
                'Healthcare services',
                'Public transport',
                'Agricultural implements',
                'Milk and milk products',
                'Fresh vegetables and fruits'
            ],
            '5%': [
                'Essential food items (packaged)',
                'Medicines',
                'Transport services',
                'Small restaurants',
                'Economy class air travel',
                'Railway services',
                'Coal and lignite',
                'Fertilizers'
            ],
            '12%': [
                'Processed food items',
                'Mobile phones',
                'Business class air travel',
                'Work contracts',
                'Railway services (AC)',
                'Apparel (above ₹1000)',
                'Footwear (above ₹500)',
                'Furniture'
            ],
            '18%': [
                'Most goods and services',
                'Restaurants (AC)',
                'IT services',
                'Telecom services',
                'Financial services',
                'Hotel services',
                'Software services',
                'Consulting services'
            ],
            '28%': [
                'Luxury items',
                'Sin goods (tobacco, alcohol)',
                'Automobiles',
                'Entertainment services',
                'Five-star hotels',
                'Luxury cars',
                'Cinema tickets',
                'Gambling and betting'
            ]
        };
    }

    getRate(category) {
        for (const [rate, items] of Object.entries(this.rates)) {
            if (items.some(item => item.toLowerCase().includes(category.toLowerCase()))) {
                return rate;
            }
        }
        return '18%'; // Default rate
    }

    getAllRates() {
        return this.rates;
    }
}

// Utility Functions
class GSTUtils {
    static formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        }).format(amount);
    }

    static validateAmount(amount) {
        return !isNaN(amount) && amount >= 0;
    }

    static calculateGST(amount, rate, type = 'exclusive') {
        if (type === 'exclusive') {
            const gstAmount = (amount * rate) / 100;
            return {
                originalAmount: amount,
                gstAmount: gstAmount,
                totalAmount: amount + gstAmount,
                cgstAmount: gstAmount / 2,
                sgstAmount: gstAmount / 2
            };
        } else {
            const originalAmount = amount / (1 + rate / 100);
            const gstAmount = amount - originalAmount;
            return {
                originalAmount: originalAmount,
                gstAmount: gstAmount,
                totalAmount: amount,
                cgstAmount: gstAmount / 2,
                sgstAmount: gstAmount / 2
            };
        }
    }

    static reverseCalculate(totalAmount, rate) {
        const originalAmount = totalAmount / (1 + rate / 100);
        const gstAmount = totalAmount - originalAmount;
        return {
            originalAmount: originalAmount,
            gstAmount: gstAmount,
            cgstAmount: gstAmount / 2,
            sgstAmount: gstAmount / 2
        };
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new GSTCalculator();
});

// Add some additional CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            background: var(--bg-secondary);
            transition: left 0.3s ease;
            z-index: 1000;
        }
        
        .nav.mobile-open {
            left: 0;
        }
        
        .nav-list {
            flex-direction: column;
            padding: 1rem;
        }
        
        .nav-link {
            padding: 1rem;
            border-bottom: 1px solid var(--border-light);
        }
    }
`;
document.head.appendChild(style);
