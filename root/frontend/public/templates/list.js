function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(script);
    });
}

function loadStyleSheet(href) {
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = () => resolve();
        link.onerror = () => reject
        (new Error(`Failed to load ${href}`));
        document.head.appendChild(link);
    });
}

function renderSubredditWidget(subreddit, limit, containerId) {
    fetch(`http://localhost:5000/reddit?subreddit=${subreddit}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById(containerId);
            const postList = document.createElement('div');
            postList.classList.add('list-group');

            data.data.forEach(post => {
                const postItem = document.createElement('a');
                postItem.href = `https://www.reddit.com${post.url}`;
                postItem.target = '_blank';
                postItem.classList.add('list-group-item', 'list-group-item-action', 'flex-column', 'align-items-start');
                postItem.innerHTML = `
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${post.title}</h5>
            <small>${new Date(post.date).toLocaleString()}</small>
          </div>
          <p class="mb-1">${post.content.slice(0, 200)}...</p>
          <small>Author: ${post.author} | Likes: ${post.likes} | Comments: ${post.comments}</small>
        `;
                postList.appendChild(postItem);
            });

            container.appendChild(postList);
        })
        .catch(error => {
            console.error('Error fetching subreddit data:', error);
        });
}

async function initializeWidget() {
    const smediaWidget = document.querySelector('smedia-widget');

    if (smediaWidget) {
        const subreddit = smediaWidget.getAttribute('data-subreddit') || 'BattleStations';
        const limit = parseInt(smediaWidget.getAttribute('data-limit')) || 10;
        const containerId = smediaWidget.id;

        // Load Bootstrap resources
        try {
            await Promise.all([
                loadStyleSheet('https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'),
                loadScript('https://code.jquery.com/jquery-3.6.0.min.js'),
                loadScript('https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js'),
                loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js')
            ]);

            renderSubredditWidget(subreddit, limit, containerId);
        } catch (error) {
            console.error('Error loading Bootstrap resources:', error);
        }
    }
}

initializeWidget().catch(error => {
    console.error('Error initializing widget:', error);
});