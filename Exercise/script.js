window.addEventListener('scroll', () => {
    const container = document.querySelector('.content-container');
    const navbar = document.querySelector('.navbar');
    const navItems = navbar.querySelectorAll('li');
    const containerRect = container.getBoundingClientRect();
    const headerHeight = window.innerHeight;
    
    // Calculate how far the container is from reaching the top of the viewport
    const distanceFromTop = containerRect.top;
    
    // Calculate scale factors for container
    const scaleX = distanceFromTop >= headerHeight ? 0.8 : Math.min(1.25, 0.8 + (0.6 * (1 - (distanceFromTop / headerHeight))));
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const scaleY = window.scrollY === 0 ? 1 : Math.min(1 + (scrollPercent * 0.8), 1.8);
    
    // Apply background scaling
    container.style.transform = `scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)})`;
    
    // Scale the gaps between work items
    const worksGrid = container.querySelector('.works-grid');
    if (worksGrid) {
        const gapScale = Math.max(1, scaleX);  // Scale gaps proportionally
        worksGrid.style.gap = `${2 * gapScale}rem`;
    }
    
    // Calculate navbar items translation
    const scrollRatio = Math.max(0, Math.min(1, window.scrollY / (headerHeight * 0.4)));
    const translateY = scrollRatio * -150;
    
    // Apply translation to each nav item with a stagger effect
    navItems.forEach((item, index) => {
        const delay = index * 0.1;
        const itemTranslateY = translateY * (1 - delay);
        item.style.transform = `translateY(${itemTranslateY}px)`;
    });
    
    // Handle navbar visibility
    if (distanceFromTop <= 0) {
        navbar.style.opacity = '0';
        navbar.style.pointerEvents = 'none';
    } else {
        navbar.style.opacity = '1';
        navbar.style.pointerEvents = 'auto';
    }
});

// Add transitions
document.querySelector('.navbar').style.transition = 'opacity 0.3s ease-out';
document.querySelectorAll('.navbar li').forEach(item => {
    item.style.transition = 'transform 0.3s ease-out';
}); 