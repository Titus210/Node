document.querySelectorAll('.image-card').forEach((card) => {
    const imageList = card.querySelector('.image-list');
    const leftBtn = card.querySelector('.scroll-btn.left');
    const rightBtn = card.querySelector('.scroll-btn.right');

    leftBtn.addEventListener('click', () => {
        imageList.scrollBy({ left: -100, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
        imageList.scrollBy({ left: 100, behavior: 'smooth' });
    });
});
