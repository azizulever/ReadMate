// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const tabBtns = document.querySelectorAll('.tab-btn');
const booksContainer = document.getElementById('books-container');
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotMessages = document.getElementById('chatbot-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');

// State
let currentGenre = 'fiction';
let isTyping = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeGenres();
    initializeChatbot();
    initializeImages();
    loadBooks(currentGenre);
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Genre tabs functionality
function initializeGenres() {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const genre = btn.getAttribute('data-genre');
            
            // Update active tab
            tabBtns.forEach(tabBtn => tabBtn.classList.remove('active'));
            btn.classList.add('active');
            
            // Load books for selected genre
            currentGenre = genre;
            loadBooks(genre);
        });
    });
}

// Load and display books
function loadBooks(genre) {
    const books = booksData[genre] || [];
    
    // Add loading animation
    booksContainer.innerHTML = '<div class="loading">Loading books...</div>';
    
    setTimeout(() => {
        booksContainer.innerHTML = '';
        
        if (books.length === 0) {
            booksContainer.innerHTML = '<p>No books found for this genre.</p>';
            return;
        }
        
        books.forEach(book => {
            const bookCard = createBookCard(book);
            booksContainer.appendChild(bookCard);
        });
    }, 300);
}

// Create book card element
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    
    // Generate book cover URLs with multiple fallbacks
    const primaryImage = `https://covers.openlibrary.org/b/title/${encodeURIComponent(book.title.replace(/[^\w\s]/g, '').replace(/\s+/g, '_'))}-L.jpg`;
    const fallbackImage = `https://via.placeholder.com/280x400/4338ca/ffffff?text=${encodeURIComponent(book.title.substring(0, 20))}`;
    
    card.innerHTML = `
        <div class="book-image">
            <img src="${primaryImage}" 
                 alt="${book.title} cover" 
                 onerror="this.onerror=null; this.src='${fallbackImage}';"
                 onload="this.classList.add('loaded')"
                 loading="lazy">
        </div>
        <div class="book-content">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <p class="book-description">${book.description}</p>
            <span class="book-genre">${book.genre}</span>
        </div>
    `;
    
    return card;
}

// Chatbot functionality
function initializeChatbot() {
    // Send message on Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);
}

// Toggle chatbot visibility
function toggleChatbot() {
    chatbotContainer.classList.toggle('active');
    if (chatbotContainer.classList.contains('active')) {
        userInput.focus();
    }
}

// Open chatbot
function openChatbot() {
    chatbotContainer.classList.add('active');
    userInput.focus();
}

// Close chatbot
function closeChatbot() {
    chatbotContainer.classList.remove('active');
}

// Send message to chatbot
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message || isTyping) return;
    
    // Add user message
    addMessage(message, 'user');
    userInput.value = '';
    
    // Show typing indicator
    showTyping();
    
    try {
        // Get AI response (simulate API call for now)
        const response = await getAIResponse(message);
        hideTyping();
        addMessage(response, 'bot');
    } catch (error) {
        hideTyping();
        addMessage('Sorry, I encountered an error. Please try again later.', 'bot');
        console.error('Chatbot error:', error);
    }
}

// Add message to chat
function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    // Process the content to handle formatting
    let processedContent = content;
    
    // Convert markdown-style formatting to HTML if AI still uses it
    processedContent = processedContent
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // **text** to <strong>text</strong>
        .replace(/\*(.*?)\*/g, '<em>$1</em>')              // *text* to <em>text</em>
        .replace(/\n/g, '<br>')                             // Line breaks
        .replace(/• /g, '• ')                              // Bullet points
        .replace(/(\d+\.\s)/g, '<br>$1');                  // Numbered lists
    
    messageContent.innerHTML = `<p>${processedContent}</p>`;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Show typing indicator
function showTyping() {
    isTyping = true;
    typingIndicator.style.display = 'flex';
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Hide typing indicator
function hideTyping() {
    isTyping = false;
    typingIndicator.style.display = 'none';
}

// Check if message is book-related
function isBookRelated(message) {
    const bookKeywords = [
        'book', 'books', 'read', 'reading', 'author', 'novel', 'story', 'literature',
        'fiction', 'non-fiction', 'biography', 'memoir', 'autobiography', 'self-help',
        'technology', 'programming', 'coding', 'science', 'history', 'philosophy',
        'romance', 'mystery', 'thriller', 'fantasy', 'sci-fi', 'horror', 'drama',
        'poetry', 'education', 'textbook', 'reference', 'guide', 'manual',
        'recommend', 'suggestion', 'genre', 'chapter', 'plot', 'character',
        'bestseller', 'classic', 'contemporary', 'series', 'trilogy', 'sequel',
        'publisher', 'publication', 'review', 'rating', 'award', 'pulitzer',
        'library', 'bookstore', 'kindle', 'ebook', 'audiobook', 'paperback',
        'hardcover', 'reading list', 'book club', 'literary', 'narrative'
    ];
    
    return bookKeywords.some(keyword => message.toLowerCase().includes(keyword));
}

// Call Gemini AI API
async function callGeminiAPI(userMessage) {
    const API_KEY = 'AIzaSyDOP9GWh8Ju5v2g0oC9t0vy3Nj4D07r8QQ';
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    
    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are ReadMate, a knowledgeable book expert and recommendation assistant. You have extensive knowledge about books, authors, genres, literary history, and reading culture. You only answer book-related questions.

If the user asks about anything not related to books, politely redirect them to book topics.

For book-related questions:
- Provide concise but informative answers with 3-5 specific book recommendations
- Include book titles, authors, and brief one-sentence descriptions
- Share relevant facts about books or authors when helpful
- Give direct, helpful responses without excessive detail
- Keep responses conversational and engaging
- Format text using HTML tags: use <strong> for emphasis instead of ** or markdown

User question: "${userMessage}"

Provide a helpful response with specific book recommendations. Keep it informative but concise (aim for 2-3 paragraphs maximum).`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 800,
                }
            })
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Invalid API response format');
        }
    } catch (error) {
        console.error('Gemini API error:', error);
        throw error;
    }
}

// Simulate AI response (replace with actual API call)
async function getAIResponse(userMessage) {
    // Try Gemini AI first, fallback to keyword-based responses
    try {
        const aiResponse = await callGeminiAPI(userMessage);
        return aiResponse;
    } catch (error) {
        console.error('AI API failed, using fallback responses:', error);
        // Fallback to existing keyword-based system
        return await getKeywordBasedResponse(userMessage);
    }
}

// Keyword-based fallback responses
async function getKeywordBasedResponse(userMessage) {
    // Simulate API delay for consistency
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const message = userMessage.toLowerCase();
    
    // Check if the question is book-related
    if (!isBookRelated(message)) {
        return "I'm ReadMate, your personal book assistant! I specialize in helping you discover amazing books. Please ask me about book recommendations, genres, authors, or anything related to reading. What kind of books are you interested in today?";
    }
    
    // Enhanced book-related responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return "Hello! I'm ReadMate, your personal book assistant. I can help you discover amazing books across all genres. Whether you're looking for fiction, non-fiction, biographies, self-help, or any specific topic, I'm here to help! What kind of reading experience are you seeking today?";
    }
    
    // Genre-specific recommendations
    if (message.includes('fiction') || message.includes('novel') || message.includes('story')) {
        const recommendations = bookRecommendations.fiction;
        return `Here are some excellent fiction recommendations:\n\n${recommendations.join('\n')}\n\nWould you like suggestions for a specific fiction subgenre like mystery, romance, sci-fi, or fantasy?`;
    }
    
    if (message.includes('technology') || message.includes('programming') || message.includes('coding') || message.includes('tech') || message.includes('software') || message.includes('computer')) {
        const recommendations = bookRecommendations.technology;
        return `Perfect! Here are some outstanding technology books:\n\n${recommendations.join('\n')}\n\nAre you interested in a specific area like web development, data science, AI, or cybersecurity?`;
    }
    
    if (message.includes('biography') || message.includes('life story') || message.includes('memoir') || message.includes('autobiography')) {
        const recommendations = bookRecommendations.biography;
        return `Here are some inspiring biographies and memoirs:\n\n${recommendations.join('\n')}\n\nAre you interested in biographies of specific types of people like entrepreneurs, scientists, politicians, or artists?`;
    }
    
    if (message.includes('self-help') || message.includes('motivational') || message.includes('personal development') || message.includes('motivation') || message.includes('improvement')) {
        const recommendations = bookRecommendations.motivational;
        return `Here are some transformative self-help books:\n\n${recommendations.join('\n')}\n\nWhat specific area would you like to improve? Relationships, career, health, or mindset?`;
    }
    
    if (message.includes('productivity') || message.includes('habits') || message.includes('efficient') || message.includes('time management')) {
        const recommendations = bookRecommendations.productivity;
        return `Here are some excellent productivity and habit-building books:\n\n${recommendations.join('\n')}\n\nAre you looking to build specific habits or improve particular areas of your life?`;
    }
    
    if (message.includes('leadership') || message.includes('management') || message.includes('business') || message.includes('entrepreneur')) {
        const recommendations = bookRecommendations.leadership;
        return `Here are some powerful leadership and business books:\n\n${recommendations.join('\n')}\n\nAre you interested in startup advice, team management, or general business strategy?`;
    }
    
    if (message.includes('non-fiction') || message.includes('educational') || message.includes('learning') || message.includes('knowledge')) {
        const recommendations = bookRecommendations["non-fiction"];
        return `Here are some fascinating non-fiction books:\n\n${recommendations.join('\n')}\n\nWhat topics interest you most? Science, history, psychology, or current events?`;
    }
    
    // Specific reading situations and moods
    if (message.includes('sad') || message.includes('depressed') || message.includes('down') || message.includes('upset')) {
        return "For uplifting reads when you're feeling down, I recommend:\n\n• The Alchemist by Paulo Coelho - An inspiring journey of self-discovery\n• Man's Search for Meaning by Viktor Frankl - Finding purpose in difficult times\n• The Book Thief by Markus Zusak - A beautiful story about hope\n• Chicken Soup for the Soul series - Short, uplifting stories\n\nWould you prefer fiction or non-fiction for comfort reading?";
    }
    
    if (message.includes('romance') || message.includes('love') || message.includes('romantic')) {
        return "For romance lovers, here are some wonderful options:\n\n• Pride and Prejudice by Jane Austen - The ultimate classic romance\n• The Notebook by Nicholas Sparks - A tearjerker love story\n• Outlander by Diana Gabaldon - Time-traveling romance adventure\n• Me Before You by Jojo Moyes - Contemporary emotional romance\n\nDo you prefer historical, contemporary, or fantasy romance?";
    }
    
    if (message.includes('mystery') || message.includes('detective') || message.includes('crime') || message.includes('thriller')) {
        return "For mystery and thriller enthusiasts:\n\n• The Girl with the Dragon Tattoo by Stieg Larsson - Swedish crime thriller\n• Gone Girl by Gillian Flynn - Psychological thriller masterpiece\n• The Da Vinci Code by Dan Brown - Action-packed mystery\n• Agatha Christie's works - Classic detective stories\n\nDo you prefer psychological thrillers, cozy mysteries, or police procedurals?";
    }
    
    if (message.includes('fantasy') || message.includes('magic') || message.includes('dragons') || message.includes('wizards')) {
        return "For fantasy adventures:\n\n• The Lord of the Rings by J.R.R. Tolkien - Epic fantasy classic\n• Harry Potter series by J.K. Rowling - Magical coming-of-age\n• Game of Thrones by George R.R. Martin - Dark political fantasy\n• The Name of the Wind by Patrick Rothfuss - Beautiful prose fantasy\n\nDo you prefer high fantasy, urban fantasy, or dark fantasy?";
    }
    
    if (message.includes('sci-fi') || message.includes('science fiction') || message.includes('space') || message.includes('future')) {
        return "For science fiction fans:\n\n• Dune by Frank Herbert - Epic space opera\n• The Martian by Andy Weir - Hard sci-fi survival story\n• Foundation by Isaac Asimov - Classic space civilization saga\n• Ready Player One by Ernest Cline - VR dystopian adventure\n\nAre you interested in space opera, cyberpunk, or near-future sci-fi?";
    }
    
    if (message.includes('short') || message.includes('quick read') || message.includes('busy') || message.includes('time')) {
        return "For quick reads when you're busy:\n\n• Of Mice and Men by John Steinbeck - Classic novella\n• The Great Gatsby by F. Scott Fitzgerald - Short but powerful\n• Animal Farm by George Orwell - Allegorical tale\n• The Stranger by Albert Camus - Philosophical short novel\n\nWould you prefer short story collections or novellas?";
    }
    
    if (message.includes('classic') || message.includes('literature') || message.includes('canonical')) {
        return "For classic literature:\n\n• To Kill a Mockingbird by Harper Lee - American classic about justice\n• 1984 by George Orwell - Dystopian masterpiece\n• Jane Eyre by Charlotte Brontë - Gothic romance\n• The Catcher in the Rye by J.D. Salinger - Coming-of-age classic\n\nAre you interested in American, British, or world literature classics?";
    }
    
    if (message.includes('young adult') || message.includes('ya') || message.includes('teen')) {
        return "For young adult readers:\n\n• The Hunger Games by Suzanne Collins - Dystopian action series\n• The Fault in Our Stars by John Green - Contemporary emotional drama\n• Divergent by Veronica Roth - Dystopian faction-based society\n• Eleanor & Park by Rainbow Rowell - Sweet first love story\n\nWhat themes interest you most in YA fiction?";
    }
    
    if (message.includes('author') && (message.includes('like') || message.includes('similar'))) {
        return "I'd love to help you find authors similar to ones you enjoy! Could you tell me which author you like? For example:\n\n• If you love Stephen King → Try Dean Koontz or Clive Barker\n• If you enjoy Jane Austen → Try George Eliot or the Brontë sisters\n• If you like Dan Brown → Try James Rollins or Steve Berry\n\nWho is your favorite author?";
    }
    
    if (message.includes('recommend') || message.includes('suggest') || message.includes('what should i read')) {
        return "I'd love to give you personalized recommendations! To help me suggest the perfect book, could you tell me:\n\n• What genres do you usually enjoy?\n• What's your current mood or what you're looking for?\n• Any favorite books or authors?\n• Do you prefer fiction or non-fiction?\n• Are you looking for something light or challenging?\n\nThe more you tell me, the better I can help!";
    }
    
    if (message.includes('best') || message.includes('top') || message.includes('greatest')) {
        return "Here are some universally acclaimed 'best' books across genres:\n\n• Fiction: To Kill a Mockingbird, 1984, Pride and Prejudice\n• Non-fiction: Sapiens, Educated, The Immortal Life of Henrietta Lacks\n• Self-help: Atomic Habits, The 7 Habits of Highly Effective People\n• Biography: Steve Jobs, Long Walk to Freedom, Becoming\n\nWhat specific category of 'best books' interests you most?";
    }
    
    // Default book-related response
    return "I'm here to help you discover your next great read! I can recommend books across all genres including fiction, non-fiction, biographies, self-help, technology, and more. I can also suggest books based on your mood, specific interests, or reading goals. What kind of reading experience are you looking for today?";
}

// Initialize placeholder images
function initializeImages() {
    const heroImg = document.getElementById('hero-img');
    const aboutImg = document.getElementById('about-img');
    
    // Set hero image with fallback
    if (heroImg) {
        heroImg.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600';
        heroImg.onerror = function() {
            heroImg.style.display = 'none';
            heroImg.parentElement.innerHTML = '<div style="background: linear-gradient(45deg, #667eea, #764ba2); min-height: 300px; border-radius: 15px; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;"><i class="fas fa-book-open"></i></div>';
        };
    }
    
    // Set about image with fallback
    if (aboutImg) {
        aboutImg.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600';
        aboutImg.onerror = function() {
            aboutImg.style.display = 'none';
            aboutImg.parentElement.innerHTML = '<div style="background: linear-gradient(45deg, #f3f4f6, #e5e7eb); min-height: 300px; border-radius: 15px; display: flex; align-items: center; justify-content: center; color: #9ca3af; font-size: 3rem;"><i class="fas fa-user-graduate"></i></div>';
        };
    }
}

// API Integration - Using Gemini AI (see callGeminiAPI function above)
// Old OpenAI function replaced with Gemini integration

// Generate book cover image URL using multiple sources
function generateBookCoverImage(title, author) {
    // Clean and encode title and author for URLs
    const cleanTitle = title.replace(/[^\w\s]/g, '').trim();
    const cleanAuthor = author.replace(/[^\w\s]/g, '').trim();
    const encodedTitle = encodeURIComponent(cleanTitle);
    const encodedAuthor = encodeURIComponent(cleanAuthor);
    
    // Create a hash-based color scheme for consistent book covers
    const hash = hashCode(title + author);
    const colors = [
        { bg: '2563eb', text: 'ffffff' }, // Blue
        { bg: '7c3aed', text: 'ffffff' }, // Purple
        { bg: 'dc2626', text: 'ffffff' }, // Red
        { bg: '059669', text: 'ffffff' }, // Green
        { bg: 'd97706', text: 'ffffff' }, // Orange
        { bg: '4338ca', text: 'ffffff' }, // Indigo
        { bg: 'be185d', text: 'ffffff' }, // Pink
        { bg: '0891b2', text: 'ffffff' }  // Cyan
    ];
    
    const colorScheme = colors[Math.abs(hash) % colors.length];
    
    // Try multiple image sources with fallbacks
    const sources = [
        // Open Library covers (real book covers)
        `https://covers.openlibrary.org/b/title/${encodedTitle.replace(/\s+/g, '_')}-L.jpg`,
        // Google Books API (backup)
        `https://books.google.com/books/content?id=&printsec=frontcover&img=1&zoom=1&source=gbs_api&q=${encodedTitle}+${encodedAuthor}`,
        // Custom designed book cover placeholder
        createCustomBookCover(cleanTitle, cleanAuthor, colorScheme)
    ];
    
    return sources[0]; // Primary source with fallback handling in HTML
}

// Create custom book cover design
function createCustomBookCover(title, author, colorScheme) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 280;
    canvas.height = 400;
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, `#${colorScheme.bg}`);
    gradient.addColorStop(1, `#${adjustBrightness(colorScheme.bg, -20)}`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Title text
    ctx.fillStyle = `#${colorScheme.text}`;
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.textAlign = 'center';
    
    // Wrap title text
    const words = title.split(' ');
    let line = '';
    let y = 150;
    const maxWidth = canvas.width - 40;
    
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, canvas.width / 2, y);
            line = words[n] + ' ';
            y += 30;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, canvas.width / 2, y);
    
    // Author text
    ctx.font = '18px Inter, sans-serif';
    ctx.fillText(author, canvas.width / 2, canvas.height - 60);
    
    // Decorative elements
    ctx.strokeStyle = `#${colorScheme.text}`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, y + 40);
    ctx.lineTo(canvas.width - 40, y + 40);
    ctx.stroke();
    
    return canvas.toDataURL();
}

// Hash function for consistent color selection
function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
}

// Adjust color brightness
function adjustBrightness(hex, percent) {
    const num = parseInt(hex, 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error handling
window.addEventListener('error', (event) => {
    console.error('JavaScript error:', event.error);
});

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
