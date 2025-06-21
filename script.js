class RestaurantChatbot {
    constructor() {
        this.chatToggle = document.getElementById('chatToggle');
        this.chatClose = document.getElementById('chatClose');
        this.chatContainer = document.getElementById('chatContainer');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendButton');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.notificationBadge = document.getElementById('notificationBadge');
        
        this.isBookingFlow = false;
        this.bookingData = {};
        this.bookingStep = 0;
        this.lastTopic = '';
        this.conversationContext = [];
        this.userSentiment = 'neutral';
        
        this.initializeTrainingData();
        this.initializeEventListeners();
        this.setWelcomeTime();
        this.hideNotificationAfterDelay();
    }

    initializeTrainingData() {
        // Extensive greeting patterns (English & Bengali)
        this.greetingPatterns = [
            // English greetings
            'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening',
            'namaste', 'greetings', 'howdy', 'what\'s up', 'whats up', 'yo',
            'good day', 'hiya', 'salutations', 'bonjour', 'hola',
            
            // Bengali greetings
            'assalamu alaikum', 'assalamualaikum', 'salam', 'adab', 'namaskar',
            'nomoshkar', 'ki khobor', 'kemon achen', 'kemon acho', 'ki obostha',
            'kemon cholche', 'ki koiren', 'ki koren', 'bhalo achen',
            'আসসালামু আলাইকুম', 'নমস্কার', 'কেমন আছেন', 'কেমন আছো', 'কী খবর',
            'কী অবস্থা', 'কেমন চলছে', 'ভালো আছেন', 'কী করেন', 'কী করছেন'
        ];

        // Menu patterns (comprehensive food categories)
        this.menuPatterns = [
            // General menu inquiries
            'menu', 'food', 'dish', 'meal', 'eat', 'hungry', 'order', 'cuisine',
            'specialty', 'recommend', 'suggestion', 'popular', 'famous', 'best',
            'tasty', 'delicious', 'yummy', 'what do you have', 'what can i eat',
            
            // Specific food categories
            'biryani', 'rice', 'polao', 'khichuri', 'fried rice', 'chinese rice',
            'curry', 'dal', 'vorta', 'bhaji', 'sabji', 'fish', 'chicken', 'beef',
            'mutton', 'goat', 'lamb', 'prawn', 'shrimp', 'crab', 'hilsa', 'rui',
            'katla', 'pabda', 'tilapia', 'pangash', 'koi', 'magur', 'shing',
            
            // Appetizers & snacks
            'starter', 'appetizer', 'snack', 'chop', 'cutlet', 'samosa', 'singara',
            'puri', 'luchi', 'paratha', 'roti', 'nan', 'naan', 'bread', 'biscuit',
            'toast', 'sandwich', 'burger', 'pizza', 'pasta', 'noodles', 'soup',
            
            // Sweets & desserts
            'sweet', 'dessert', 'mishti', 'rasgulla', 'rosogolla', 'sandesh',
            'chomchom', 'kaju katli', 'barfi', 'laddu', 'halwa', 'kheer', 'payesh',
            'firni', 'pudding', 'ice cream', 'kulfi', 'faluda', 'jilapi', 'imarti',
            
            // Beverages
            'drink', 'beverage', 'tea', 'coffee', 'chai', 'lemon tea', 'milk tea',
            'black tea', 'green tea', 'lassi', 'juice', 'mango juice', 'orange juice',
            'fresh lime', 'soft drink', 'coke', 'pepsi', 'fanta', 'sprite', 'water',
            'borhani', 'lemonade', 'smoothie', 'shake', 'milkshake',
            
            // Bengali menu terms
            'tarkari', 'mach', 'mangsho', 'chingri', 'kankra', 'dim', 'egg',
            'bhat', 'ruti', 'chapati', 'parota', 'alur dom', 'begun bhaja',
            'dhokar dalna', 'shukto', 'chorchori', 'ghonto', 'labra',
            'মেনু', 'খাবার', 'খাদ্য', 'তরকারি', 'মাছ', 'মাংস', 'চিংড়ি',
            'ভাত', 'রুটি', 'পরোটা', 'বিরিয়ানি', 'পোলাও', 'ডাল', 'ভর্তা'
        ];

        // Booking patterns
        this.bookingPatterns = [
            'book', 'reserve', 'reservation', 'table', 'booking', 'seat', 'place',
            'book a table', 'reserve table', 'table booking', 'dinner booking',
            'lunch booking', 'want to book', 'need reservation', 'table reserve',
            'i want to book', 'can i book', 'how to book', 'booking process',
            'reserve a seat', 'table for', 'party booking', 'group booking',
            'বুকিং', 'রিজার্ভেশন', 'টেবিল', 'আসন', 'জায়গা', 'বুক করতে চাই',
            'টেবিল বুক', 'রিজার্ভ করতে চাই', 'টেবিল রিজার্ভ'
        ];

        // Location & contact patterns
        this.locationPatterns = [
            'location', 'address', 'where', 'find', 'direction', 'map', 'situated',
            'located', 'place', 'area', 'road', 'street', 'building', 'landmark',
            'how to reach', 'how to find', 'where is', 'where are you',
            'contact', 'phone', 'number', 'mobile', 'call', 'reach you',
            'get in touch', 'communicate', 'talk', 'speak',
            'ঠিকানা', 'যোগাযোগ', 'ফোন', 'নম্বর', 'কোথায়', 'কীভাবে যাবো',
            'কীভাবে পৌঁছাবো', 'অবস্থান', 'কোন এলাকায়'
        ];

        // Hours patterns
        this.hoursPatterns = [
            'hours', 'time', 'open', 'close', 'timing', 'schedule', 'when open',
            'opening time', 'closing time', 'what time', 'business hours',
            'working hours', 'operation hours', 'available', 'service time',
            'খোলা', 'বন্ধ', 'সময়', 'কখন খোলে', 'কখন বন্ধ', 'সার্ভিস টাইম'
        ];

        // Price patterns
        this.pricePatterns = [
            'price', 'cost', 'rate', 'charge', 'fee', 'bill', 'amount', 'money',
            'expensive', 'cheap', 'affordable', 'budget', 'how much', 'what cost',
            'pricing', 'tariff', 'fare', 'payment', 'pay', 'spend',
            'দাম', 'মূল্য', 'খরচ', 'কত টাকা', 'কতো পয়সা', 'বিল'
        ];

        // Delivery patterns
        this.deliveryPatterns = [
            'delivery', 'deliver', 'home delivery', 'takeaway', 'take away',
            'pickup', 'pick up', 'online order', 'order online', 'food delivery',
            'পৌঁছে দেওয়া', 'ডেলিভারি', 'হোম ডেলিভারি', 'নিয়ে যাওয়া'
        ];

        // FAQ patterns
        this.faqPatterns = {
            parking: ['parking', 'park', 'car park', 'vehicle', 'গাড়ি পার্ক'],
            wifi: ['wifi', 'internet', 'connection', 'online', 'ওয়াইফাই', 'ইন্টারনেট'],
            ac: ['ac', 'air condition', 'cooling', 'temperature', 'এসি', 'শীতাতপ'],
            group: ['group', 'party', 'large group', 'big party', 'event', 'দল', 'পার্টি'],
            hygiene: ['clean', 'hygiene', 'sanitize', 'safe', 'health', 'পরিচ্ছন্ন', 'স্বাস্থ্যকর'],
            kids: ['kids', 'children', 'family', 'child', 'baby', 'বাচ্চা', 'শিশু', 'পরিবার']
        };

        // Sentiment patterns
        this.sentimentPatterns = {
            positive: [
                'good', 'great', 'excellent', 'amazing', 'awesome', 'fantastic',
                'wonderful', 'perfect', 'love', 'like', 'best', 'super', 'nice',
                'beautiful', 'brilliant', 'outstanding', 'impressive', 'cool',
                'ভালো', 'দারুণ', 'চমৎকার', 'অসাধারণ', 'পছন্দ', 'সুন্দর'
            ],
            negative: [
                'bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'dislike',
                'poor', 'disappointing', 'unsatisfied', 'complain', 'problem',
                'issue', 'wrong', 'error', 'fail', 'angry', 'frustrated',
                'খারাপ', 'বাজে', 'ভয়ানক', 'সমস্যা', 'অভিযোগ', 'রাগ'
            ]
        };

        // Conversation starters
        this.conversationStarters = [
            "Try asking: 'What's your specialty?'",
            "Ask me: 'Do you have biryani?'",
            "Say: 'I want to book a table'",
            "Try: 'What are your hours?'",
            "Ask: 'Do you deliver food?'"
        ];

        // Contextual responses
        this.contextualResponses = {
            menu: [
                "Would you like to know about our appetizers, main courses, or desserts?",
                "Are you interested in Bengali, Chinese, or Continental cuisine?",
                "Do you have any dietary preferences or allergies I should know about?"
            ],
            booking: [
                "What date would you prefer for your reservation?",
                "How many people will be joining you?",
                "Do you have a preferred time slot?"
            ],
            location: [
                "Would you like directions from a specific location?",
                "Are you planning to drive or use public transport?",
                "Do you need parking information as well?"
            ]
        };
    }

    initializeEventListeners() {
        this.chatToggle.addEventListener('click', () => this.toggleChat());
        this.chatClose.addEventListener('click', () => this.closeChat());
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });        // Quick action buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-btn') || e.target.classList.contains('quick-action-btn')) {
                const message = e.target.getAttribute('data-message');
                const action = e.target.getAttribute('data-action');
                
                if (message) {
                    this.addMessage(message, 'user');
                    this.processMessage(message);
                } else if (action) {
                    this.handleQuickAction(action);
                }
            }
        });
    }    toggleChat() {
        if (this.chatContainer.classList.contains('active')) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.chatContainer.classList.add('active');
        this.hideNotificationBadge();
        this.chatInput.focus();
        if (this.chatMessages.children.length <= 1) {
            this.addWelcomeMessage();
        }
    }

    closeChat() {
        this.chatContainer.classList.remove('active');
    }

    addWelcomeMessage() {
        const welcomeMessages = [
            `🙏 Welcome to our restaurant! I'm here to help you with menu information, table bookings, and any questions you might have.`,
            `How may I assist you today? You can ask about our menu, book a table, or get information about our services.`
        ];
        
        welcomeMessages.forEach((message, index) => {
            setTimeout(() => {
                this.addMessage(message, 'bot');
                if (index === welcomeMessages.length - 1) {
                    this.addQuickActions();
                }
            }, index * 1000);
        });
    }

    addQuickActions() {
        const quickActions = [
            { text: '🍽️ View Menu', action: 'menu' },
            { text: '📅 Book Table', action: 'booking' },
            { text: '📍 Location', action: 'location' },
            { text: '⏰ Hours', action: 'hours' }
        ];

        const actionsHtml = quickActions.map(action => 
            `<button class="quick-action-btn" data-action="${action.action}">${action.text}</button>`
        ).join('');

        this.addMessage(`<div class="quick-actions">${actionsHtml}</div>`, 'bot');
    }

    handleQuickAction(action) {
        const actionTexts = {
            menu: 'Show me the menu',
            booking: 'I want to book a table',
            location: 'Where are you located?',
            hours: 'What are your hours?'
        };
        
        this.addMessage(actionTexts[action], 'user');
        this.processMessage(actionTexts[action]);
    }

    sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.chatInput.value = '';
        
        this.conversationContext.push(message);
        if (this.conversationContext.length > 5) {
            this.conversationContext.shift();
        }

        this.showTypingIndicator();
        setTimeout(() => {
            this.hideTypingIndicator();
            this.processMessage(message);
        }, 1000 + Math.random() * 1000);
    }

    processMessage(message) {
        this.updateSentiment(message);
        
        if (this.isBookingFlow) {
            this.handleBookingFlow(message);
            return;
        }

        const response = this.generateResponse(message);
        this.addMessage(response, 'bot');
        
        // Add contextual follow-up if relevant
        setTimeout(() => {
            const followUp = this.generateContextualFollowUp(message);
            if (followUp) {
                this.addMessage(followUp, 'bot');
            }
        }, 2000);
    }

    updateSentiment(message) {
        const lowerMessage = message.toLowerCase();
        
        if (this.sentimentPatterns.positive.some(word => lowerMessage.includes(word))) {
            this.userSentiment = 'positive';
        } else if (this.sentimentPatterns.negative.some(word => lowerMessage.includes(word))) {
            this.userSentiment = 'negative';
        } else {
            this.userSentiment = 'neutral';
        }
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        const words = lowerMessage.split(' ');

        // Check for patterns and generate appropriate responses
        if (this.matchesPattern(lowerMessage, this.greetingPatterns)) {
            this.lastTopic = 'greeting';
            return this.getGreetingResponse();
        }

        if (this.matchesPattern(lowerMessage, this.menuPatterns)) {
            this.lastTopic = 'menu';
            return this.getMenuResponse(lowerMessage);
        }

        if (this.matchesPattern(lowerMessage, this.bookingPatterns)) {
            this.lastTopic = 'booking';
            return this.initiateBooking();
        }

        if (this.matchesPattern(lowerMessage, this.locationPatterns)) {
            this.lastTopic = 'location';
            return this.getLocationResponse();
        }

        if (this.matchesPattern(lowerMessage, this.hoursPatterns)) {
            this.lastTopic = 'hours';
            return this.getHoursResponse();
        }

        if (this.matchesPattern(lowerMessage, this.pricePatterns)) {
            this.lastTopic = 'price';
            return this.getPriceResponse();
        }

        if (this.matchesPattern(lowerMessage, this.deliveryPatterns)) {
            this.lastTopic = 'delivery';
            return this.getDeliveryResponse();
        }

        // Check FAQ patterns
        for (const [category, patterns] of Object.entries(this.faqPatterns)) {
            if (this.matchesPattern(lowerMessage, patterns)) {
                this.lastTopic = 'faq';
                return this.getFAQResponse(category);
            }
        }

        // Handle follow-up questions based on context
        if (this.lastTopic && this.isFollowUpQuestion(lowerMessage)) {
            return this.getContextualResponse(lowerMessage, this.lastTopic);
        }

        // Default response with suggestions
        return this.getDefaultResponse();
    }

    matchesPattern(message, patterns) {
        return patterns.some(pattern => 
            message.includes(pattern) || 
            this.fuzzyMatch(message, pattern)
        );
    }

    fuzzyMatch(text, pattern) {
        // Simple fuzzy matching for typos
        if (Math.abs(text.length - pattern.length) > 2) return false;
        
        let distance = 0;
        for (let i = 0; i < Math.max(text.length, pattern.length); i++) {
            if (text[i] !== pattern[i]) distance++;
        }
        
        return distance <= 2;
    }

    isFollowUpQuestion(message) {
        const followUpIndicators = [
            'what about', 'how about', 'and', 'also', 'more', 'other',
            'anything else', 'tell me more', 'details', 'আর', 'অন্য',
            'আরো', 'বিস্তারিত'
        ];
        
        return followUpIndicators.some(indicator => message.includes(indicator));
    }

    getGreetingResponse() {
        const greetings = [
            "Hello! Welcome to our restaurant! 🍽️ I'm delighted to help you today.",
            "Hi there! Great to see you! How can I make your dining experience wonderful?",
            "আসসালামু আলাইকুম! Welcome! I'm here to assist you with anything you need.",
            "নমস্কার! How are you doing today? Ready for some delicious food?"
        ];
        
        let response = greetings[Math.floor(Math.random() * greetings.length)];
        
        if (this.userSentiment === 'positive') {
            response += " I can sense you're in a great mood! Let's make this experience even better! 😊";
        }
        
        return response;
    }

    getMenuResponse(message) {
        // Specific food item responses
        if (message.includes('biryani')) {
            return `🍛 Our Biryani is our signature dish! We offer:
            
• **Kacchi Biryani** - Traditional mutton biryani (৳450)
• **Chicken Biryani** - Aromatic chicken biryani (৳320)
• **Beef Biryani** - Rich and flavorful (৳380)
• **Vegetable Biryani** - Perfect for vegetarians (৳250)
• **Prawn Biryani** - Fresh water prawns (৳420)

All served with borhani, salad, and dessert! Which one interests you?`;
        }
        
        if (message.includes('fish') || message.includes('mach')) {
            return `🐟 We have an amazing selection of fresh fish dishes:

**Hilsa Specialties:**
• Ilish Bhapa - Steamed hilsa (৳650)
• Ilish Curry - Traditional curry (৳600)

**Other Fish:**
• Rui Fish Curry (৳350) • Katla Fish Fry (৳320)
• Pabda Fish Jhol (৳380) • Chinese Fish (৳450)
• Fish Fry Platter (৳420)

Fresh catch daily! Any particular preparation you prefer?`;
        }

        if (message.includes('chicken') || message.includes('murgi')) {
            return `🐔 Our chicken dishes are customer favorites:

**Traditional:**
• Chicken Curry (৳280) • Chicken Roast (৳350)
• Chicken Korma (৳320) • Chicken Bhuna (৳300)

**Chinese:**
• Chicken Chili (৳380) • Sweet & Sour Chicken (৳360)
• Chicken Fried Rice (৳280) • Honey Chicken (৳420)

**Grilled & BBQ:**
• Grilled Chicken (৳450) • BBQ Chicken (৳480)

What style are you craving?`;
        }

        if (message.includes('sweet') || message.includes('dessert') || message.includes('mishti')) {
            return `🍮 Our dessert menu will make you smile:

**Traditional Sweets:**
• Rasgulla (৳80) • Sandesh (৳90) • Chomchom (৳85)
• Kala Jamun (৳75) • Rasmalai (৳120)

**Puddings & Ice Cream:**
• Kheer/Payesh (৳80) • Firni (৳90)
• Kulfi (৳60) • Ice Cream (৳50-80)
• Faluda (৳120)

**Special:**
• Mishti Doi (৳70) • Bhapa Pitha (seasonal)

Perfect way to end your meal! Any favorites?`;
        }

        // General menu response
        return `🍽️ Our extensive menu features:

**Main Categories:**
• **Rice Dishes** - Biryani, Polao, Fried Rice
• **Fish & Seafood** - Fresh daily catches
• **Meat Dishes** - Chicken, Beef, Mutton
• **Vegetarian** - Dal, Vegetables, Vorta
• **Chinese** - Noodles, Chili items, Soup
• **Desserts** - Traditional sweets & modern desserts
• **Beverages** - Tea, Coffee, Fresh Juices

**Today's Specials:**
• Chef's Special Biryani (৳480)
• Fresh Hilsa Curry (৳650)
• Beef Tehari (৳350)

Would you like details about any specific category?`;
    }

    initiateBooking() {
        this.isBookingFlow = true;
        this.bookingStep = 1;
        this.bookingData = {};
        
        return `📅 I'd be happy to help you book a table! Let me gather some details:

**Step 1:** How many people will be dining? (Please enter the number of guests)`;
    }

    handleBookingFlow(message) {
        switch (this.bookingStep) {
            case 1:
                const guests = parseInt(message);
                if (guests && guests > 0 && guests <= 20) {
                    this.bookingData.guests = guests;
                    this.bookingStep = 2;
                    this.addMessage(`Great! Table for ${guests} people. 

**Step 2:** What date would you prefer? (Please enter in DD/MM/YYYY format or say 'today', 'tomorrow')`, 'bot');
                } else {
                    this.addMessage("Please enter a valid number of guests (1-20 people).", 'bot');
                }
                break;

            case 2:
                this.bookingData.date = this.parseDate(message);
                if (this.bookingData.date) {
                    this.bookingStep = 3;
                    this.addMessage(`Perfect! Date: ${this.bookingData.date}

**Step 3:** What time would you prefer? 
Available slots: 12:00 PM - 3:00 PM (Lunch) or 7:00 PM - 11:00 PM (Dinner)`, 'bot');
                } else {
                    this.addMessage("Please enter a valid date (DD/MM/YYYY) or say 'today'/'tomorrow'.", 'bot');
                }
                break;

            case 3:
                this.bookingData.time = this.parseTime(message);
                if (this.bookingData.time) {
                    this.bookingStep = 4;
                    this.addMessage(`Excellent! Time: ${this.bookingData.time}

**Step 4:** Please provide your name for the reservation:`, 'bot');
                } else {
                    this.addMessage("Please enter a valid time (e.g., 7:30 PM, 1:00 PM, or 19:30).", 'bot');
                }
                break;

            case 4:
                this.bookingData.name = message.trim();
                this.bookingStep = 5;
                this.addMessage(`Thank you, ${this.bookingData.name}!

**Step 5:** Please provide your contact number:`, 'bot');
                break;

            case 5:
                const phone = message.replace(/\D/g, '');
                if (phone.length >= 10) {
                    this.bookingData.phone = phone;
                    this.confirmBooking();
                } else {
                    this.addMessage("Please enter a valid phone number (at least 10 digits).", 'bot');
                }
                break;
        }
    }

    parseDate(input) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (input.toLowerCase().includes('today')) {
            return today.toLocaleDateString();
        } else if (input.toLowerCase().includes('tomorrow')) {
            return tomorrow.toLocaleDateString();
        } else if (input.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
            return input;
        }
        return null;
    }

    parseTime(input) {
        const timeRegex = /(\d{1,2}):?(\d{0,2})\s*(am|pm|AM|PM)?/;
        const match = input.match(timeRegex);
        
        if (match) {
            let hours = parseInt(match[1]);
            const minutes = match[2] ? parseInt(match[2]) : 0;
            const ampm = match[3] ? match[3].toLowerCase() : '';
            
            if (ampm === 'pm' && hours !== 12) hours += 12;
            if (ampm === 'am' && hours === 12) hours = 0;
            
            if (hours >= 12 && hours <= 15) return `${hours}:${minutes.toString().padStart(2, '0')}`;
            if (hours >= 19 && hours <= 23) return `${hours}:${minutes.toString().padStart(2, '0')}`;
        }
        
        return null;
    }

    confirmBooking() {
        this.isBookingFlow = false;
        this.bookingStep = 0;
        
        // Save booking (in real app, this would go to a database)
        const bookingId = 'BK' + Date.now().toString().slice(-6);
        localStorage.setItem('latestBooking', JSON.stringify({
            ...this.bookingData,
            id: bookingId,
            timestamp: new Date().toISOString()
        }));

        const confirmationMessage = `✅ **Booking Confirmed!**

**Booking Details:**
• **Booking ID:** ${bookingId}
• **Name:** ${this.bookingData.name}
• **Date:** ${this.bookingData.date}
• **Time:** ${this.bookingData.time}
• **Guests:** ${this.bookingData.guests} people
• **Contact:** ${this.bookingData.phone}

📞 We'll call you 2 hours before your reservation to confirm.
📍 Please arrive 10 minutes early.

Thank you for choosing our restaurant! We look forward to serving you! 🍽️

Is there anything else I can help you with?`;

        this.addMessage(confirmationMessage, 'bot');
    }

    getLocationResponse() {
        return `📍 **Our Location:**

**Address:** 123 Food Street, Dhanmondi, Dhaka-1205

**Landmarks:**
• Opposite Dhanmondi Lake
• Next to Rabindra Sarobar Metro Station
• 2 minutes walk from Dhanmondi 27

**Contact:**
📞 Phone: +880-1712-345678
📞 Landline: 02-9876543

**Getting Here:**
🚗 **By Car:** Free parking available
🚌 **By Bus:** Bus stop 100m away
🚇 **By Metro:** Rabindra Sarobar Station

Would you like directions from a specific location?`;
    }

    getHoursResponse() {
        const now = new Date();
        const currentHour = now.getHours();
        let status = '';
        
        if (currentHour >= 11 && currentHour < 24) {
            status = '🟢 **Currently OPEN**';
        } else {
            status = '🔴 **Currently CLOSED**';
        }

        return `⏰ **Operating Hours:**

${status}

**Daily Schedule:**
• **Lunch:** 11:00 AM - 4:00 PM
• **Dinner:** 6:00 PM - 12:00 AM

**Weekend Special:**
• **Friday:** Extended till 1:00 AM
• **Saturday:** 10:00 AM - 1:00 AM

**Kitchen Closing:**
• Last order: 30 minutes before closing

**Delivery Hours:**
• 12:00 PM - 11:00 PM (Daily)

We're open 7 days a week! 🍽️`;
    }

    getPriceResponse() {
        return `💰 **Our Pricing:**

**Budget-Friendly Options:**
• Set Menu: ৳180-250 per person
• Rice + Dal + Vegetable: ৳120
• Basic Biryani: ৳250-320

**Premium Dishes:**
• Special Biryani: ৳450-550
• Fresh Fish: ৳350-650
• BBQ Items: ৳480-650

**Family Packages:**
• Family Set (4 people): ৳1200
• Party Package (8 people): ৳2500

**Payment Methods:**
💳 Cash, bKash, Nagad, Cards accepted

**Special Offers:**
🎉 20% off on groups of 6+ people
🎉 Free dessert on birthdays

Would you like to know prices for specific items?`;
    }

    getDeliveryResponse() {
        return `🚚 **Delivery & Takeaway:**

**Delivery Areas:**
• Dhanmondi, Lalmatia, Mohammadpur
• New Market, Azimpur, Green Road
• Kalabagan, Panthapath

**Delivery Charges:**
• Within 2 km: ৳30
• 2-5 km: ৳50
• Beyond 5 km: ৳80

**Delivery Time:**
• 30-45 minutes (normal hours)
• 45-60 minutes (peak hours)

**Minimum Order:**
• ৳300 for delivery
• No minimum for pickup

**How to Order:**
📞 Call: +880-1712-345678
💬 WhatsApp: Same number
🌐 Online: www.ourrestaurant.com

**Free Delivery:**
🎉 Orders above ৳800

Would you like to place an order now?`;
    }

    getFAQResponse(category) {
        const responses = {
            parking: `🚗 **Parking Information:**
            
• Free parking for 50+ cars
• Covered parking available
• Valet service during peak hours
• Motorcycle parking separate area
• CCTV monitored 24/7

Safe and convenient parking for all our guests! 🅿️`,

            wifi: `📶 **WiFi & Internet:**
            
• Free high-speed WiFi for all guests
• Network: "Restaurant_Guest"
• Password: "foodlover123"
• Works throughout the restaurant
• Perfect for work meetings or casual browsing

Stay connected while you dine! 💻`,

            ac: `❄️ **Air Conditioning:**
            
• Full AC in all dining areas
• Temperature controlled environment
• Separate AC zones for comfort
• Backup power for uninterrupted cooling
• Perfect ambiance year-round

Comfortable dining in any weather! 🌡️`,

            group: `👥 **Group Bookings & Events:**
            
• Special rates for groups of 10+
• Private dining rooms available
• Corporate lunch packages
• Birthday party arrangements
• Wedding reception catering
• Audio-visual equipment available

Perfect for your special occasions! 🎉`,

            hygiene: `🧼 **Hygiene & Safety:**
            
• Daily deep cleaning protocols
• Sanitized tables between guests
• Staff health monitoring
• Fresh ingredients daily
• Kitchen hygiene certified
• Hand sanitizers available

Your health is our priority! ✨`,

            kids: `👨‍👩‍👧‍👦 **Family & Kids Friendly:**
            
• High chairs for toddlers
• Kids menu available
• Play area (supervised)
• Baby changing facilities
• Family restrooms
• Kid-friendly dishes

Perfect for family dining! 🧸`
        };

        return responses[category] || "I'd be happy to help with your question!";
    }

    generateContextualFollowUp(message) {
        if (!this.lastTopic || Math.random() > 0.3) return null;

        const followUps = this.contextualResponses[this.lastTopic];
        if (!followUps) return null;

        return followUps[Math.floor(Math.random() * followUps.length)];
    }

    getContextualResponse(message, topic) {
        switch (topic) {
            case 'menu':
                if (message.includes('price') || message.includes('cost')) {
                    return "Menu prices range from ৳80-650. Would you like specific pricing for any dish?";
                }
                if (message.includes('spicy') || message.includes('hot')) {
                    return "We can adjust spice levels! Most dishes can be made mild, medium, or spicy. Any preferences?";
                }
                break;
            case 'booking':
                if (message.includes('cancel') || message.includes('change')) {
                    return "To modify reservations, please call us at +880-1712-345678. We're flexible with changes!";
                }
                break;
        }
        
        return this.getDefaultResponse();
    }

    getDefaultResponse() {
        const responses = [
            "I'm here to help! You can ask me about our menu, book a table, or get information about our restaurant. What interests you?",
            "I didn't quite catch that. Try asking about our food, reservations, location, or hours. How can I assist you?",
            "Let me help you better! Feel free to ask about our specialties, booking process, or any other restaurant information.",
            "আমি আপনাকে সাহায্য করতে চাই! আমাদের খাবার, বুকিং, বা রেস্তোরাঁ সম্পর্কে যেকোনো প্রশ্ন করুন।"
        ];
        
        let response = responses[Math.floor(Math.random() * responses.length)];
        
        // Add suggestions based on conversation context
        if (this.conversationContext.length > 0) {
            response += "\n\n💡 " + this.conversationStarters[Math.floor(Math.random() * this.conversationStarters.length)];
        }
        
        return response;
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        if (sender === 'user') {
            messageDiv.innerHTML = `<div class="message-content">${this.escapeHtml(content)}</div>`;
        } else {
            messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
        }
        
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showTypingIndicator() {
        this.typingIndicator.style.display = 'flex';
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        this.typingIndicator.style.display = 'none';
    }

    setWelcomeTime() {
        const now = new Date();
        const hours = now.getHours();
        let greeting;
        
        if (hours < 12) greeting = 'Good Morning!';
        else if (hours < 17) greeting = 'Good Afternoon!';
        else greeting = 'Good Evening!';
        
        this.notificationBadge.textContent = greeting;
    }

    hideNotificationAfterDelay() {
        setTimeout(() => {
            this.hideNotificationBadge();
        }, 5000);
    }

    hideNotificationBadge() {
        this.notificationBadge.style.display = 'none';
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new RestaurantChatbot();
});
