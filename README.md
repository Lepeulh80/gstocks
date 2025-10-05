# GSTK - GST Calculator

A comprehensive, modern GST (Goods and Services Tax) calculator built with vanilla HTML, CSS, and JavaScript. Calculate GST amounts, find tax rates, and perform reverse calculations with a beautiful, responsive interface.

## 🚀 Features

### Core Calculator Features
- **Basic GST Calculation**: Calculate GST amount and total amount
- **Multiple Calculation Types**: 
  - Amount + GST (Exclusive)
  - Amount (GST Inclusive)
- **All GST Rates**: Support for 0%, 5%, 12%, 18%, and 28% GST rates
- **Real-time Calculations**: Instant results as you type
- **CGST/SGST Breakdown**: Shows Central GST and State GST separately

### Business Type Calculators
- **B2B Calculator**: For business-to-business transactions
- **B2C Calculator**: For business-to-consumer transactions
- **Custom Rate Support**: Use any GST rate for calculations

### Advanced Features
- **Reverse GST Calculator**: Calculate original amount from GST inclusive amount
- **GST Rate Finder**: Search and find GST rates for different goods and services
- **Comprehensive Rate Database**: Built-in database of GST rates for various categories
- **HSN Code Lookup**: Find GST rates by searching goods/services

### User Experience
- **Modern UI**: Clean, professional design with smooth animations
- **Dark/Light Theme**: Toggle between dark and light themes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Mobile-First**: Optimized for mobile devices
- **Accessibility**: Keyboard navigation and screen reader support

## 🎯 GST Rates Covered

| Rate | Categories |
|------|------------|
| **0%** | Essential food items, books, educational services, healthcare, public transport |
| **5%** | Essential medicines, transport services, small restaurants, economy air travel |
| **12%** | Processed food, mobile phones, business air travel, work contracts |
| **18%** | Most goods and services, IT services, telecom, financial services |
| **28%** | Luxury items, sin goods, automobiles, entertainment, five-star hotels |

## 🛠️ Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (optional, for development server)

### Quick Start
1. **Clone or Download** the repository
2. **Open** `index.html` in your web browser
3. **Start calculating** GST instantly!

### Development Setup
```bash
# Install dependencies (optional)
npm install

# Start development server
npm run dev

# Or use any static file server
npx serve .
```

## 📱 Usage

### Basic GST Calculation
1. Enter the amount in the "Amount" field
2. Select the appropriate GST rate (0%, 5%, 12%, 18%, 28%)
3. Choose calculation type:
   - **Amount + GST**: Calculate total including GST
   - **Amount (GST Inclusive)**: Calculate GST from inclusive amount
4. View instant results with CGST/SGST breakdown

### Business Type Calculations
- Use **B2B Calculator** for business transactions
- Use **B2C Calculator** for consumer transactions
- Both support all GST rates and provide detailed breakdowns

### Reverse Calculation
1. Enter the GST inclusive amount
2. Select the GST rate applied
3. Get the original amount and GST amount

### Rate Finder
1. Search for goods or services
2. Find applicable GST rates
3. Use the information for accurate calculations

## 🎨 Customization

### Themes
The application supports both light and dark themes:
- Click the theme toggle button in the header
- Theme preference is saved in localStorage
- Automatic theme detection based on system preference

### Adding New GST Rates
To add new GST rates or categories, modify the `rateData` array in `script.js`:

```javascript
const rateData = [
    { name: 'Your Category', rate: '18%', description: 'Description here' },
    // ... existing entries
];
```

## 🏗️ Technical Details

### Architecture
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome 6
- **Fonts**: Inter (Google Fonts)
- **No Dependencies**: Pure vanilla JavaScript, no frameworks

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance
- **Lightweight**: < 50KB total size
- **Fast Loading**: Optimized assets and minimal dependencies
- **Responsive**: Smooth animations and transitions
- **Offline Ready**: Works without internet connection

## 📊 Calculation Formulas

### GST Calculation (Exclusive)
```
GST Amount = Original Amount × (GST Rate / 100)
Total Amount = Original Amount + GST Amount
CGST = SGST = GST Amount / 2
```

### GST Calculation (Inclusive)
```
Original Amount = Total Amount / (1 + GST Rate / 100)
GST Amount = Total Amount - Original Amount
CGST = SGST = GST Amount / 2
```

### Reverse Calculation
```
Original Amount = GST Inclusive Amount / (1 + GST Rate / 100)
GST Amount = GST Inclusive Amount - Original Amount
```

## 🔧 API Reference

### GSTCalculator Class
Main calculator class with methods for all calculations.

#### Methods
- `calculateGST()`: Calculate basic GST
- `calculateB2B()`: Calculate B2B GST
- `calculateB2C()`: Calculate B2C GST
- `calculateReverse()`: Reverse GST calculation
- `searchRates()`: Search GST rates

### GSTUtils Class
Utility functions for GST calculations.

#### Methods
- `formatCurrency(amount)`: Format amount as currency
- `validateAmount(amount)`: Validate input amount
- `calculateGST(amount, rate, type)`: Core GST calculation
- `reverseCalculate(totalAmount, rate)`: Reverse calculation

## 🚀 Deployment

### Static Hosting
Deploy to any static hosting service:
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your repository
- **GitHub Pages**: Enable in repository settings
- **AWS S3**: Upload files to S3 bucket

### Local Development
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Follow existing code style
2. Add comments for complex logic
3. Test on multiple browsers
4. Ensure mobile responsiveness
5. Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Indian Government**: For GST rate information
- **Font Awesome**: For beautiful icons
- **Google Fonts**: For Inter font family
- **Open Source Community**: For inspiration and tools

## 📞 Support

For support, feature requests, or bug reports:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Basic GST calculation
- Business type calculators
- Reverse calculation
- Rate finder
- Dark/light themes
- Responsive design

---

**Made with ❤️ for India's GST System**

*GSTK - Your comprehensive GST calculation solution*
