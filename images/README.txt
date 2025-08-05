/* Images directory structure */

/* This directory should contain the following image files: */

/* Hero and About Images */
/*
- hero-books.jpg (400x300px) - Stack of books for hero section
- about-reading.jpg (400x300px) - Person reading for about section
*/

/* Book Cover Images (280x250px each) */
/*
Fiction:
- to-kill-mockingbird.jpg
- 1984.jpg
- pride-prejudice.jpg
- great-gatsby.jpg
- hundred-years.jpg
- catcher-rye.jpg

Non-Fiction:
- sapiens.jpg
- educated.jpg
- henrietta-lacks.jpg
- thinking-fast-slow.jpg
- anne-frank.jpg
- into-wild.jpg

Technology:
- clean-code.jpg
- pragmatic-programmer.jpg
- you-dont-know-js.jpg
- design-patterns.jpg
- innovators-dilemma.jpg
- algorithms-live-by.jpg

Biography:
- steve-jobs.jpg
- einstein.jpg
- long-walk-freedom.jpg
- malcolm-x.jpg
- becoming.jpg
- leonardo.jpg

Self-Help:
- atomic-habits.jpg
- 7-habits.jpg
- mindset.jpg
- power-of-now.jpg
- win-friends.jpg
- subtle-art.jpg
*/

/* Note: Since we can't create actual image files, the application */
/* uses placeholder icons and gradients when images are not found */

/* Placeholder SVG for missing images */
.image-placeholder {
    background: linear-gradient(45deg, #f3f4f6, #e5e7eb);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
    font-size: 3rem;
    border-radius: 8px;
}

/* Book placeholder styling */
.book-image {
    width: 100%;
    height: 250px;
    background: linear-gradient(45deg, #f3f4f6, #e5e7eb);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
    font-size: 3rem;
    border-radius: 8px 8px 0 0;
}
