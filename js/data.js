// Book data for different genres
const booksData = {
    fiction: [
        {
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            description: "A gripping tale of racial injustice and childhood innocence in the American South. This timeless classic explores themes of morality, prejudice, and the loss of innocence through the eyes of young Scout Finch.",
            genre: "Fiction",
            image: "images/books/to-kill-mockingbird.jpg"
        },
        {
            title: "1984",
            author: "George Orwell",
            description: "A dystopian masterpiece that explores surveillance, totalitarianism, and the power of language. Winston Smith's struggle against Big Brother remains eerily relevant in today's digital age.",
            genre: "Fiction",
            image: "images/books/1984.jpg"
        },
        {
            title: "Pride and Prejudice",
            author: "Jane Austen",
            description: "A witty and romantic novel about Elizabeth Bennet and Mr. Darcy. Austen's sharp social commentary and memorable characters make this a beloved classic of English literature.",
            genre: "Fiction",
            image: "images/books/pride-prejudice.jpg"
        },
        {
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            description: "Set in the Jazz Age, this novel captures the decadence and moral decay beneath the glittering surface of the American Dream. Nick Carraway tells the tragic story of Jay Gatsby's obsessive love.",
            genre: "Fiction",
            image: "images/books/great-gatsby.jpg"
        },
        {
            title: "One Hundred Years of Solitude",
            author: "Gabriel García Márquez",
            description: "A magical realist masterpiece that chronicles the Buendía family through seven generations. This epic novel blends fantasy with reality in the fictional town of Macondo.",
            genre: "Fiction",
            image: "images/books/hundred-years.jpg"
        },
        {
            title: "The Catcher in the Rye",
            author: "J.D. Salinger",
            description: "Holden Caulfield's journey through New York City after being expelled from prep school. A coming-of-age story that resonates with readers across generations.",
            genre: "Fiction",
            image: "images/books/catcher-rye.jpg"
        }
    ],
    "non-fiction": [
        {
            title: "Sapiens",
            author: "Yuval Noah Harari",
            description: "A brief history of humankind from the Stone Age to the present. Harari explores how Homo sapiens came to dominate the world through cognitive, agricultural, and scientific revolutions.",
            genre: "Non-Fiction",
            image: "images/books/sapiens.jpg"
        },
        {
            title: "Educated",
            author: "Tara Westover",
            description: "A powerful memoir about a woman who grows up in a survivalist family and eventually escapes to learn about the wider world through education. A testament to the transformative power of learning.",
            genre: "Non-Fiction",
            image: "images/books/educated.jpg"
        },
        {
            title: "The Immortal Life of Henrietta Lacks",
            author: "Rebecca Skloot",
            description: "The story of how one woman's cancer cells, taken without her knowledge, became one of the most important tools in medicine and sparked important questions about medical ethics.",
            genre: "Non-Fiction",
            image: "images/books/henrietta-lacks.jpg"
        },
        {
            title: "Thinking, Fast and Slow",
            author: "Daniel Kahneman",
            description: "Nobel laureate Daniel Kahneman explores the two systems that drive the way we think: the fast, intuitive system and the slow, deliberate system. A fascinating journey into the human mind.",
            genre: "Non-Fiction",
            image: "images/books/thinking-fast-slow.jpg"
        },
        {
            title: "The Diary of a Young Girl",
            author: "Anne Frank",
            description: "The powerful and moving diary of a young Jewish girl hiding from the Nazis in Amsterdam. Anne Frank's observations about life, war, and humanity continue to inspire readers worldwide.",
            genre: "Non-Fiction",
            image: "images/books/anne-frank.jpg"
        },
        {
            title: "Into the Wild",
            author: "Jon Krakauer",
            description: "The true story of Christopher McCandless, who gave up his savings to charity and hitchhiked to Alaska to live in the wilderness. A gripping tale of adventure and self-discovery.",
            genre: "Non-Fiction",
            image: "images/books/into-wild.jpg"
        }
    ],
    technology: [
        {
            title: "Clean Code",
            author: "Robert C. Martin",
            description: "Essential reading for any programmer. Uncle Bob's principles for writing readable, maintainable code that will help you become a better software craftsman.",
            genre: "Technology",
            image: "images/books/clean-code.jpg"
        },
        {
            title: "The Pragmatic Programmer",
            author: "David Thomas, Andrew Hunt",
            description: "From journeyman to master - practical tips and techniques for becoming a more effective and productive programmer. A classic in software development literature.",
            genre: "Technology",
            image: "images/books/pragmatic-programmer.jpg"
        },
        {
            title: "You Don't Know JS",
            author: "Kyle Simpson",
            description: "A deep dive into the core mechanisms of JavaScript. This series goes beyond surface-level understanding to help you truly master the language.",
            genre: "Technology",
            image: "images/books/you-dont-know-js.jpg"
        },
        {
            title: "Design Patterns",
            author: "Gang of Four",
            description: "The foundational book on software design patterns. Learn about reusable solutions to commonly occurring problems in software design and architecture.",
            genre: "Technology",
            image: "images/books/design-patterns.jpg"
        },
        {
            title: "The Innovator's Dilemma",
            author: "Clayton Christensen",
            description: "Why established companies fail when faced with disruptive innovation. Essential reading for understanding technology markets and business strategy.",
            genre: "Technology",
            image: "images/books/innovators-dilemma.jpg"
        },
        {
            title: "Algorithms to Live By",
            author: "Brian Christian, Tom Griffiths",
            description: "How computer algorithms can help solve human problems. A fascinating exploration of the intersection between computer science and everyday life.",
            genre: "Technology",
            image: "images/books/algorithms-live-by.jpg"
        }
    ],
    biography: [
        {
            title: "Steve Jobs",
            author: "Walter Isaacson",
            description: "The definitive biography of Apple's co-founder, based on exclusive interviews. Isaacson captures Jobs' perfectionism, passion, and the dark side of his relentless pursuit of innovation.",
            genre: "Biography",
            image: "images/books/steve-jobs.jpg"
        },
        {
            title: "Einstein: His Life and Universe",
            author: "Walter Isaacson",
            description: "A comprehensive biography of the world's most famous scientist. Isaacson explores Einstein's scientific achievements alongside his complex personal life and political views.",
            genre: "Biography",
            image: "images/books/einstein.jpg"
        },
        {
            title: "Long Walk to Freedom",
            author: "Nelson Mandela",
            description: "Mandela's autobiography traces his journey from rural childhood to becoming South Africa's first Black president. A powerful story of resistance, forgiveness, and reconciliation.",
            genre: "Biography",
            image: "images/books/long-walk-freedom.jpg"
        },
        {
            title: "The Autobiography of Malcolm X",
            author: "Malcolm X, Alex Haley",
            description: "A powerful account of Malcolm X's transformation from street hustler to influential civil rights leader. A brutally honest examination of race, religion, and redemption in America.",
            genre: "Biography",
            image: "images/books/malcolm-x.jpg"
        },
        {
            title: "Becoming",
            author: "Michelle Obama",
            description: "The former First Lady's intimate memoir chronicles her journey from Chicago's South Side to the White House. An inspiring story of resilience, family, and public service.",
            genre: "Biography",
            image: "images/books/becoming.jpg"
        },
        {
            title: "Leonardo da Vinci",
            author: "Walter Isaacson",
            description: "A masterful biography of history's ultimate Renaissance man. Isaacson explores how Leonardo's scientific curiosity informed his art and vice versa.",
            genre: "Biography",
            image: "images/books/leonardo.jpg"
        }
    ],
    "self-help": [
        {
            title: "Atomic Habits",
            author: "James Clear",
            description: "The ultimate guide to building good habits and breaking bad ones. Clear provides practical strategies for making small changes that lead to remarkable results.",
            genre: "Self-Help",
            image: "images/books/atomic-habits.jpg"
        },
        {
            title: "The 7 Habits of Highly Effective People",
            author: "Stephen Covey",
            description: "A principle-centered approach to solving personal and professional problems. Covey's timeless wisdom helps readers develop character and achieve lasting success.",
            genre: "Self-Help",
            image: "images/books/7-habits.jpg"
        },
        {
            title: "Mindset",
            author: "Carol Dweck",
            description: "The power of believing you can improve. Dweck explores how our beliefs about our abilities affect our success and provides strategies for developing a growth mindset.",
            genre: "Self-Help",
            image: "images/books/mindset.jpg"
        },
        {
            title: "The Power of Now",
            author: "Eckhart Tolle",
            description: "A guide to spiritual enlightenment through present-moment awareness. Tolle's teachings help readers escape the trap of constant thinking and find inner peace.",
            genre: "Self-Help",
            image: "images/books/power-of-now.jpg"
        },
        {
            title: "How to Win Friends and Influence People",
            author: "Dale Carnegie",
            description: "The classic guide to improving interpersonal relationships and communication skills. Carnegie's principles remain as relevant today as when first published in 1936.",
            genre: "Self-Help",
            image: "images/books/win-friends.jpg"
        },
        {
            title: "The Subtle Art of Not Giving a F*ck",
            author: "Mark Manson",
            description: "A counterintuitive approach to living a good life. Manson argues that the key to happiness is not avoiding problems but learning which problems are worth solving.",
            genre: "Self-Help",
            image: "images/books/subtle-art.jpg"
        }
    ]
};

// Sample book recommendations for the chatbot
const bookRecommendations = {
    motivational: [
        "Atomic Habits by James Clear - Perfect for building better habits",
        "Mindset by Carol Dweck - Develop a growth mindset for success",
        "The 7 Habits of Highly Effective People by Stephen Covey - Timeless principles for effectiveness"
    ],
    technology: [
        "Clean Code by Robert Martin - Essential for any programmer",
        "The Pragmatic Programmer by David Thomas - From journeyman to master",
        "You Don't Know JS by Kyle Simpson - Master JavaScript fundamentals"
    ],
    fiction: [
        "1984 by George Orwell - A dystopian masterpiece",
        "To Kill a Mockingbird by Harper Lee - Timeless themes of justice and morality",
        "The Great Gatsby by F. Scott Fitzgerald - The American Dream examined"
    ],
    biography: [
        "Steve Jobs by Walter Isaacson - The story of Apple's visionary founder",
        "Becoming by Michelle Obama - An inspiring journey of resilience",
        "Einstein by Walter Isaacson - The life of history's greatest scientist"
    ],
    "non-fiction": [
        "Sapiens by Yuval Noah Harari - A brief history of humankind",
        "Educated by Tara Westover - The transformative power of education",
        "Thinking, Fast and Slow by Daniel Kahneman - Understanding how we think"
    ],
    productivity: [
        "Atomic Habits by James Clear - Small changes, remarkable results",
        "The Power of Now by Eckhart Tolle - Find peace through present-moment awareness",
        "Deep Work by Cal Newport - Focus in a distracted world"
    ],
    leadership: [
        "The 7 Habits of Highly Effective People by Stephen Covey",
        "Good to Great by Jim Collins - What makes companies excel",
        "Leaders Eat Last by Simon Sinek - Why some teams pull together"
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { booksData, bookRecommendations };
}
