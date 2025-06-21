# 🤖 Restaurant Chatbot - Bella's Kitchen

A highly intelligent, rule-based restaurant chatbot built with vanilla HTML, CSS, and JavaScript. This chatbot provides comprehensive restaurant assistance including menu information, table booking, FAQ support, and multilingual communication (English & Bengali).

![Chatbot Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow) ![Responsive](https://img.shields.io/badge/Design-Responsive-blue)

## ✨ Features

### 🧠 **Intelligent Conversation System**
- **Advanced Pattern Matching** - Recognizes 500+ patterns in English and Bengali
- **Context Awareness** - Remembers conversation history and maintains topic context
- **Sentiment Analysis** - Adapts responses based on user mood (positive/negative/neutral)
- **Fuzzy Matching** - Handles typos and spelling variations
- **Multi-turn Conversations** - Supports complex, contextual dialogues

### 🍽️ **Restaurant Services**
- **Comprehensive Menu System** - Detailed food categories with prices
- **Smart Table Booking** - 5-step booking process with validation
- **FAQ Support** - Answers about parking, WiFi, AC, hygiene, etc.
- **Delivery Information** - Coverage areas, timing, and charges
- **Operating Hours** - Real-time status and schedule information

### 🌐 **Multilingual Support**
- **Bengali Language** - Native support for Bengali queries
- **Mixed Language** - Handles Bangla-English mixed conversations
- **Cultural Context** - Understands local food terminology and preferences

### 🎨 **Modern UI/UX**
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - CSS transitions and typing indicators
- **Quick Actions** - One-click buttons for common requests
- **Professional Design** - Modern gradient backgrounds and clean interface

## 🚀 **Advanced Capabilities**

### **Pattern Recognition Engine**
```javascript
// Supports complex pattern matching
✅ "I want biryani" → Shows biryani menu with prices
✅ "বিরিয়ানি আছে?" → Bengali language support
✅ "book table for 4 people" → Initiates booking flow
✅ "wher r u located" → Handles typos and informal text
```

### **Intelligent Response System**
- **Contextual Follow-ups** - Asks relevant questions based on user interest
- **Sentiment-Aware Responses** - Adjusts tone based on user emotions
- **Smart Suggestions** - Provides helpful recommendations
- **Conversation Memory** - Remembers last 5 interactions for better context

### **Comprehensive Food Database**
- **Biryani** - 5+ varieties with detailed descriptions and prices
- **Fish Dishes** - 10+ types including Bengali specialties like Hilsa
- **Chicken Items** - Traditional, Chinese, and grilled options
- **Desserts** - Traditional Bengali sweets and modern desserts
- **Beverages** - Complete drink menu with local preferences

## 📁 **Project Structure**

```
chatbot/
├── index.html          # Main HTML structure
├── styles.css          # Comprehensive CSS styling
├── script.js           # Advanced chatbot logic
├── prompt.md          # Original requirements
└── README.md          # This documentation
```

## 🛠️ **Installation & Setup**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/rohulkuddusrobi/chatbot.git
   cd chatbot
   ```

2. **Open in Browser**
   ```bash
   # Simply open index.html in any modern web browser
   # No build process or dependencies required!
   ```

3. **Or Use Live Server**
   ```bash
   # If using VS Code with Live Server extension
   # Right-click on index.html → "Open with Live Server"
   ```

## 💻 **Usage Examples**

### **Basic Interactions**
```
User: "Hello"
Bot: "Hello! Welcome to our restaurant! 🍽️ I'm delighted to help you today."

User: "Show me the menu"
Bot: [Displays comprehensive menu with categories and prices]

User: "Book a table"
Bot: [Initiates 5-step booking process]
```

### **Bengali Language Support**
```
User: "আসসালামু আলাইকুম"
Bot: "ওয়ালাইকুম আসসালাম! আমাদের রেস্তোরাঁয় স্বাগতম!"

User: "বিরিয়ানি আছে?"
Bot: [Shows biryani options in Bengali/English]
```

### **Advanced Queries**
```
User: "Do you have parking and WiFi?"
Bot: [Provides detailed information about both facilities]

User: "I'm looking for something spicy for 4 people"
Bot: [Suggests spicy dishes suitable for groups]
```

## 🔧 **Technical Implementation**

### **Core Technologies**
- **HTML5** - Semantic structure with accessibility features
- **CSS3** - Modern styling with animations and responsive design
- **Vanilla JavaScript** - ES6+ features, no external dependencies
- **Local Storage** - For booking data persistence

### **Architecture Highlights**
- **Object-Oriented Design** - Clean class-based structure
- **Event-Driven Programming** - Efficient event handling
- **Pattern Matching Engine** - Custom fuzzy matching algorithm
- **State Management** - Conversation context and booking flow states

### **Performance Features**
- **Lazy Loading** - Training data loaded on demand
- **Efficient DOM Manipulation** - Minimal reflows and repaints
- **Memory Management** - Conversation history cleanup
- **Responsive Debouncing** - Smooth typing indicators

## 🎯 **Use Cases**

### **For Restaurant Owners**
- Reduce customer service workload
- Handle multiple inquiries simultaneously
- Provide 24/7 customer support
- Collect booking information efficiently
- Improve customer engagement

### **For Customers**
- Quick access to menu and pricing
- Easy table booking process
- Instant answers to common questions
- Multilingual support for local users
- Mobile-friendly interface

## 🔮 **Future Enhancements**

- [ ] **Backend Integration** - Connect to real database
- [ ] **Voice Recognition** - Add speech-to-text capability
- [ ] **Payment Integration** - Online payment for bookings
- [ ] **Admin Dashboard** - Manage bookings and menu
- [ ] **Analytics** - Track user interactions and preferences
- [ ] **Push Notifications** - Booking reminders and updates

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 **License**

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 **Developer**

**Rohul Kuddus Robi**
- GitHub: [@rohulkuddusrobi](https://github.com/rohulkuddusrobi)

## 🙏 **Acknowledgments**

- Font Awesome for icons
- Google Fonts for typography
- Modern CSS Grid and Flexbox techniques
- ES6+ JavaScript features

---

### 📱 **Live Demo**

Simply open `index.html` in your browser to see the chatbot in action!

**Key Features to Test:**
- Click the chat bubble in bottom-right corner
- Try different languages (English/Bengali)
- Test the booking flow
- Ask about menu items, prices, location
- Check FAQ responses for parking, WiFi, etc.

---

*Built with ❤️ for better customer experience*
