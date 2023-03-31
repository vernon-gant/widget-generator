const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(script);
    });
}

const loadStyleSheet = (href) => {
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

const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const day = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(date);
    const monthDay = new Intl.DateTimeFormat('en-US', {day: 'numeric'}).format(date);
    const year = new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(date);

    const ordinal = (n) => {
        const s = ['th', 'st', 'nd', 'rd'];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return `${ordinal(monthDay)} ${day} ${year}`;
};

const renderPostContent = (postData, imagesHtml) => {
    return `
    <div class="card h-auto">
        <a href="https://www.reddit.com${postData.url}" target="_blank">
            <div class="card-header">
                <h5 class="card-title mb-0">${postData.title}</h5>
            </div>
        </a>
        ${imagesHtml}
        ${postData.content ? `<div class="card-body"><p class="card-text">${postData.content.slice(0, 200)}</p></div>` : ''}
        <div class="card-footer d-flex justify-content-around">
            <small class="text-muted text-center pe-2 me-3">Author: ${postData.author} | Likes: ${postData.likes} | Comments: ${postData.comments}</small>
            <small class="text-muted text-center float-end">${formatDate(postData.date)}</small>
        </div>
    </div>`;
}

const renderImages = (postData) => {
    let imagesHtml = '';

    if (postData.images.length === 1) {
        imagesHtml = `<img src="${postData.images[0]}" class="card-img-top image-fixed-height" alt="Image">`;
    } else if (postData.images.length > 1) {
        imagesHtml = `
        <div id="car${postData.id}" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">`;

        postData.images.forEach((image, index) => {
            imagesHtml += `
            <div class="carousel-item${index === 0 ? ' active' : ''}">
                <img src="${image}" class="d-block w-100 image-fixed-height" alt="Image">
            </div>`;
        });
        imagesHtml += `
            </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#car${postData.id}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#car${postData.id}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>`;
    }
    return imagesHtml;
}

const renderPost = (postData, postsList) => {
    const postItem = document.createElement('div');
    postItem.classList.add('col-10','col-md-6', 'col-lg-4', 'my-3', 'd-flex', 'align-items-center');

    let imagesHtml = renderImages(postData);

    postItem.innerHTML = renderPostContent(postData, imagesHtml);

    postsList.appendChild(postItem);
}

const renderPosts = (posts, customTag) => {
    const container = document.createElement('div');
    container.classList.add('container', 'w-100');

    const postList = document.createElement('div');
    postList.classList.add('row', 'justify-content-center');

    posts.forEach(post => {
        renderPost(post, postList);
    });

    container.appendChild(postList);
    // Add the container after the custom tag
    customTag.insertAdjacentElement('afterend', container);
}


const fetchPosts = async (subreddit, limit) => {
    try {
        const response = await fetch(`http://localhost:5000/reddit?subreddit=${subreddit}&limit=${limit}`);
        if (response.ok) {
            return await response.json();
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

const renderWidget = async (subreddit, limit, customTag) => {
    const posts = await fetchPosts(subreddit, limit);
    if (posts) {
        renderPosts(posts.data, customTag);
    }
}

const addCss = () => {
    const customImageStyle = document.createElement('style');
    customImageStyle.id = 'custom-image-style';
    customImageStyle.textContent = `
            .image-fixed-height {
                height: 300px;
                object-fit: cover;
            }
        `;
    document.head.appendChild(customImageStyle);
}

const loadResources = async () => {
    addCss();
    return Promise.all([
        loadStyleSheet('https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'),
        loadScript('https://code.jquery.com/jquery-3.6.0.min.js'),
        loadScript('https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js'),
        loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js')
    ]);
}

async function initializeWidget() {
    const customTag = document.querySelector('smedia-widget');

    if (customTag) {
        const subreddit = customTag.getAttribute('data-subreddit') || 'BattleStations';
        const limit = parseInt(customTag.getAttribute('data-limit')) || 10;
        // Load Bootstrap resources
        try {
            await loadResources();
            await renderWidget(subreddit, limit, customTag)
        } catch (error) {
            console.error('Error loading Bootstrap resources:', error);
        }
    }
}

initializeWidget().catch(error => {
    console.error('Error initializing widget:', error);
});