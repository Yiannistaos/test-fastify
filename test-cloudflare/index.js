import homePage from './index.html';
import aboutPage from './about.html';
const { getItems } = require('../controllers/items');

addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const url = new URL(request.url);

    switch (url.pathname) {
        case '/about':
            return new Response(aboutPage, {
                headers: { 'content-type': 'text/html;charset=UTF-8' },
            });
        case '/':
        default:
            return new Response(homePage, {
                headers: { 'content-type': 'text/html;charset=UTF-8' },
            });
    }
}
