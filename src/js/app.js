document.addEventListener('DOMContentLoaded', e => {

    let elements =
        Array.from(document.querySelectorAll('#table-of-content li a'))
        .map(x => ({content_element: x, id: x.getAttribute('data-id')}))
        .map(({content_element, id}) => ({content_element, article_element: document.getElementById(id)}));

    let lastKnownScrollPosition = 0;
    let ticking = false;
    window.elements = elements
    function update(pos){
        elements.forEach(({content_element, article_element}) => {
            let position = article_element.getBoundingClientRect().top + pos;
            content_element.classList.remove('link-secondary');
            content_element.classList.remove('link-dark');
            content_element.classList.add(position < pos ? 'link-dark' : 'link-secondary');
        });
    }

    // throttling the scroll event based on the following reference:
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
    document.addEventListener('scroll', e => {
    lastKnownScrollPosition = window.pageYOffset;

    if (!ticking) {
        window.requestAnimationFrame(function() {
        update(lastKnownScrollPosition);
        ticking = false;
        });

        ticking = true;
    }
    })
    
});

