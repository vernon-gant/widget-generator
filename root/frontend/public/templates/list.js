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
        <a class="text-decoration-none" style="color: black" href="https://www.reddit.com${postData.url}" target="_blank">
            <div class="card-header">
                <h5 class="card-title mb-0 text-center">${postData.title}</h5>
            </div>
        </a>
        ${imagesHtml}
        ${postData.content ? `<div class="card-body"><p class="card-text">${postData.content.slice(0, 200)}</p></div>` : ''}
        <div class="card-footer">
            <div class="d-flex justify-content-around align-items-center w-75 m-auto flex-wrap">
            <div class="d-flex align-items-center">
                    <i class="fas fa-thumbs-up me-2"></i>
                    <small class="text-muted">${postData.likes}</small>
                </div>
                <div class="d-flex align-items-center">
                    <i class="fas fa-user me-2"></i>
                    <small class="text-muted">${postData.author}</small>
                </div>
                <div class="d-flex align-items-center">
                    <i class="fas fa-comment me-2"></i>
                    <small class="text-muted">${postData.comments}</small>
                </div>
            </div>
            <div class="d-flex justify-content-center align-items-center mt-2">
                <i class="fas fa-calendar-alt me-1"></i>
                <small class="text-muted">${formatDate(postData.date)}</small>
            </div>
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

const renderPosts = (subreddit, posts, customTag) => {
    // Create header with subreddit name and make it as link to subreddit
    const header = document.createElement('h2');
    header.classList.add('text-center', 'my-5','text-decoration-underline','fw-normal');
    header.innerHTML = `<a style="color: black" href="https://www.reddit.com/r/${subreddit}" target="_blank">r/${subreddit}</a>`;


    const container = document.createElement('div');
    container.classList.add('container', 'w-100');

    const postList = document.createElement('div');
    postList.classList.add('row', 'justify-content-center');

    posts.forEach(post => {
        renderPost(post, postList);
    });

    container.appendChild(postList);
    // Add header and container after custom tag
    customTag.insertAdjacentElement('afterend', header);
    header.insertAdjacentElement('afterend', container);
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
    // const posts = await fetchPosts(subreddit, limit);
    const posts = {
        "data": [
            {
                "author": "zerogravity_levus",
                "comments": 1,
                "content": "A place for members of r/LevusWorkstation to chat with each other",
                "date": "Sat, 16 Jul 2022 15:53:04 GMT",
                "id": "w0h71o",
                "images": [],
                "likes": 1,
                "title": "r/LevusWorkstation Lounge",
                "url": "/r/LevusWorkstation/comments/w0h71o/rlevusworkstation_lounge/"
            },
            {
                "author": "druunavt",
                "comments": 0,
                "content": "Hi, wondering how much space this takes up on the ground - the footprint needed to fit the entire workstation? I have a rather small office area.  \n\n\nAlso, I saw a keyboard mounted on the pipes in one of the videos - a piano keyboard, not a typing one, I mean. What accessories would be used to mount this? To be able to create music and record in the workstation would be ideal. Thanks!",
                "date": "Thu, 23 Feb 2023 19:00:06 GMT",
                "id": "11a45a1",
                "images": [],
                "likes": 1,
                "title": "Footprint of Levus Workstation?",
                "url": "/r/LevusWorkstation/comments/11a45a1/footprint_of_levus_workstation/"
            },
            {
                "author": "zerogravity_levus",
                "comments": 0,
                "content": "[https://www.youtube.com/watch?v=NyugCJ40IIw&t=110s](https://www.youtube.com/watch?v=NyugCJ40IIw&t=110s)",
                "date": "Sun, 12 Feb 2023 09:49:46 GMT",
                "id": "110b57y",
                "images": [],
                "likes": 1,
                "title": "The Evolution of Back Pain",
                "url": "/r/LevusWorkstation/comments/110b57y/the_evolution_of_back_pain/"
            },
            {
                "author": "zerogravity_levus",
                "comments": 0,
                "content": "",
                "date": "Tue, 17 Jan 2023 21:39:19 GMT",
                "id": "10emtsa",
                "images": [
                    "https://preview.redd.it/dc0tn3i30oca1.jpg?auto=webp&v=enabled&s=91ac0dd06ce4fc40c8391714c608edf4f2f42c64"
                ],
                "likes": 1,
                "title": "Todays Torture",
                "url": "/r/LevusWorkstation/comments/10emtsa/todays_torture/"
            },
            {
                "author": "Scrap_Mechanic_Lab",
                "comments": 1,
                "content": "&#x200B;\n\n[Peg & Arm mounts](https://preview.redd.it/b1xm7mhfpzfa1.jpg?width=3154&format=pjpg&auto=webp&v=enabled&s=9c914446b3575d0481405ae0aa61a20609fef1db)\n\nThis is for two types of mounts \\~ Arm Mounts and Peg Mounts\n\nPeg mounts are great as headphones hangers and attaching smaller pipe clamping accessories like microphones and pop filters.\n\nArm mounts are great for Phones Tablets and Webcams.\n\nYou can make all of them with the links to the hardware I am Providing have fun and keep levitating Amigos\\~\n\nGet the pegs here: Amazon [https://www.amazon.com/dp/B0B4K5WBWS/?coliid=I3OGYLWUNNG1QL&colid=VRJWBPB27QII&psc=1&ref\\_=lv\\_ov\\_lig\\_dp\\_it](https://www.amazon.com/dp/B0B4K5WBWS/?coliid=I3OGYLWUNNG1QL&colid=VRJWBPB27QII&psc=1&ref_=lv_ov_lig_dp_it)\n\nGoogle:  **10Pack 1.57 Inch Single Buckle Quick Lock Stage Lighting Clamp for KTV Par Light**\n\nAmazon [https://www.amazon.com/dp/B07QW5BQGY/?coliid=I3TLFXSKPCNF2W&colid=VRJWBPB27QII&psc=1&ref\\_=lv\\_ov\\_lig\\_dp\\_it](https://www.amazon.com/dp/B07QW5BQGY/?coliid=I3TLFXSKPCNF2W&colid=VRJWBPB27QII&psc=1&ref_=lv_ov_lig_dp_it)\n\nEbay  [https://www.ebay.com/itm/393315976430?hash=item5b937584ee:g:c6QAAOSw14tgne6D&amdata=enc%3AAQAHAAAA8AR7HTZDqB7mAuc43BYenH5rBV5i8xxnUKY4Tk9K0gz8NFMqOms51VUv3F6wdZO0kufo%2FIvZZ889jDWtFCtwPmKbEzqfIlzeyu9iKhUYk0U5beefpfBJEwQFWJOOFo5klFKHxdNSZPmWZQfH35M3GCDNUIWob2HSdLoNFiulQfF8Xe3VlFFjiscDVN1XImt%2FvZyXUzObD3H2fFAAnxzMhKtuRVuaradmH5JNID1BzjCbmkcWKKafLajyH0tD3%2BNp8vor0rJ8FXiIoHJZgLMWZJQcLL5CeJeSRKFVRVeowA08WXuMOujSZe3cgboOyc9wvA%3D%3D%7Ctkp%3ABk9SR7bWqI3iYA](https://www.ebay.com/itm/393315976430?hash=item5b937584ee:g:c6QAAOSw14tgne6D&amdata=enc%3AAQAHAAAA8AR7HTZDqB7mAuc43BYenH5rBV5i8xxnUKY4Tk9K0gz8NFMqOms51VUv3F6wdZO0kufo%2FIvZZ889jDWtFCtwPmKbEzqfIlzeyu9iKhUYk0U5beefpfBJEwQFWJOOFo5klFKHxdNSZPmWZQfH35M3GCDNUIWob2HSdLoNFiulQfF8Xe3VlFFjiscDVN1XImt%2FvZyXUzObD3H2fFAAnxzMhKtuRVuaradmH5JNID1BzjCbmkcWKKafLajyH0tD3%2BNp8vor0rJ8FXiIoHJZgLMWZJQcLL5CeJeSRKFVRVeowA08WXuMOujSZe3cgboOyc9wvA%3D%3D%7Ctkp%3ABk9SR7bWqI3iYA)\n\nAbove are the pipe clamps you will need you can attach them to the Pegs using these kinds of screws:  **CEI BOLT 3/8″ X 26 TPI X 1″ BSA**\n\nEbay Link [https://www.ebay.com/itm/275177538469?hash=item4011dc03a5:g:I0UAAOSwNg1iE8EF&amdata=enc%3AAQAHAAAAsEY%2FuIx7iEebmCTTj89NM%2FORi9d7ihX0YL%2FFdOplzPvd6fL%2BMzwq6CnBCTe2UnywAYrzEifBAyhdUmZJfdZlDPFCv5BKfTq4gpVgTLY4gm%2Bhcw%2FBEYHEPncAKy6YbR6qsCvTm6sHskhG9aFmDQLUE%2F90X3fivvFTDLup%2Bqi9BKRziW77AWU0gsDXg8pmN53MRQMv9ALYC6ohk9uygiaOfzQCXsgFiM6WCh4bXgBnwc63%7Ctkp%3ABk9SR\\_TW9YziYA](https://www.ebay.com/itm/275177538469?hash=item4011dc03a5:g:I0UAAOSwNg1iE8EF&amdata=enc%3AAQAHAAAAsEY%2FuIx7iEebmCTTj89NM%2FORi9d7ihX0YL%2FFdOplzPvd6fL%2BMzwq6CnBCTe2UnywAYrzEifBAyhdUmZJfdZlDPFCv5BKfTq4gpVgTLY4gm%2Bhcw%2FBEYHEPncAKy6YbR6qsCvTm6sHskhG9aFmDQLUE%2F90X3fivvFTDLup%2Bqi9BKRziW77AWU0gsDXg8pmN53MRQMv9ALYC6ohk9uygiaOfzQCXsgFiM6WCh4bXgBnwc63%7Ctkp%3ABk9SR_TW9YziYA)\n\nIf you are only interested in arm mounts for lighter terminals like tablets and phones then all you will need is the pipe clamps above and these arm mounts: [https://www.amazon.com/gp/product/B01IMN58US/ref=ppx\\_yo\\_dt\\_b\\_search\\_asin\\_title?ie=UTF8&psc=1](https://www.amazon.com/gp/product/B01IMN58US/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1)\n\nAnd lastly, if you're wondering what I'm using to hold my phone its this mount: [https://www.amazon.com/gp/product/B085C4S8XF/ref=ppx\\_yo\\_dt\\_b\\_search\\_asin\\_title?ie=UTF8&psc=1](https://www.amazon.com/gp/product/B085C4S8XF/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1)\n\nhttps://preview.redd.it/m8n967yf06m91.jpg?width=2448&format=pjpg&auto=webp&v=enabled&s=d1c7490852d07b2d34081f16b760f9c30b7d1551\n\nhttps://preview.redd.it/g5jmlhyf06m91.jpg?width=2448&format=pjpg&auto=webp&v=enabled&s=caedb92ed9bc4fff042531b82f04b27033b2c868\n\nhttps://preview.redd.it/bkeiqcyf06m91.jpg?width=2448&format=pjpg&auto=webp&v=enabled&s=144cb833bfc3082717d88b7d4501abff2a8211c6\n\nhttps://preview.redd.it/snhao7yf06m91.jpg?width=2448&format=pjpg&auto=webp&v=enabled&s=281e0fe0c782faf7a4f20ab65163813a5e7c9c2f",
                "date": "Tue, 06 Sep 2022 06:08:31 GMT",
                "id": "x70m6q",
                "images": [
                    "https://preview.redd.it/g5jmlhyf06m91.jpg?width=2448&format=pjpg&auto=webp&v=enabled&s=caedb92ed9bc4fff042531b82f04b27033b2c868",
                    "https://preview.redd.it/snhao7yf06m91.jpg?width=2448&format=pjpg&auto=webp&v=enabled&s=281e0fe0c782faf7a4f20ab65163813a5e7c9c2f",
                    "https://preview.redd.it/m8n967yf06m91.jpg?width=2448&format=pjpg&auto=webp&v=enabled&s=d1c7490852d07b2d34081f16b760f9c30b7d1551",
                    "https://preview.redd.it/bkeiqcyf06m91.jpg?width=2448&format=pjpg&auto=webp&v=enabled&s=144cb833bfc3082717d88b7d4501abff2a8211c6",
                    "https://preview.redd.it/b1xm7mhfpzfa1.jpg?width=3154&format=pjpg&auto=webp&v=enabled&s=9c914446b3575d0481405ae0aa61a20609fef1db"
                ],
                "likes": 5,
                "title": "Accessory mounts for your Levus Workstation",
                "url": "/r/LevusWorkstation/comments/x70m6q/accessory_mounts_for_your_levus_workstation/"
            },
            {
                "author": "zerogravity_levus",
                "comments": 0,
                "content": "",
                "date": "Tue, 30 Aug 2022 13:10:16 GMT",
                "id": "x1g90d",
                "images": [
                    "https://preview.redd.it/dahtmiow2uk91.jpg?auto=webp&v=enabled&s=7e6543b38d226de69a303624d0032e2b1c7bf652"
                ],
                "likes": 6,
                "title": "Cat Approved",
                "url": "/r/LevusWorkstation/comments/x1g90d/cat_approved/"
            },
            {
                "author": "zerogravity_levus",
                "comments": 1,
                "content": "",
                "date": "Sun, 31 Jul 2022 23:55:00 GMT",
                "id": "wd02rz",
                "images": [
                    "https://preview.redd.it/mxvwkchn6ze91.jpg?width=3000&format=pjpg&auto=webp&v=enabled&s=0a97174ed9b037c30aa150b9d2150f66052c273b",
                    "https://preview.redd.it/v847tc6k6ze91.jpg?width=3000&format=pjpg&auto=webp&v=enabled&s=f1cc4590fa39458a9f425ec2fe1ca1327733cce3",
                    "https://preview.redd.it/eycdu93i6ze91.jpg?width=4000&format=pjpg&auto=webp&v=enabled&s=f0ce330f7b3040c55ea276d628cc5db84b42cfe7",
                    "https://preview.redd.it/snu8xvci6ze91.jpg?width=4000&format=pjpg&auto=webp&v=enabled&s=fb7944c5875fe14912605348bf307c747d7a167a",
                    "https://preview.redd.it/kxmq4hpl6ze91.jpg?width=4000&format=pjpg&auto=webp&v=enabled&s=c5a2aa2b2dc638965ac300883917f0b462b20f45",
                    "https://preview.redd.it/5jruq3oi6ze91.jpg?width=6000&format=pjpg&auto=webp&v=enabled&s=df57e8723997385e2efd86eadb334b4635c4dec2",
                    "https://preview.redd.it/chghu9rm6ze91.jpg?width=3000&format=pjpg&auto=webp&v=enabled&s=a263fcda9933808a256d218e21ef58de7c5bdb8c",
                    "https://preview.redd.it/46fd5dqh6ze91.jpg?width=4000&format=pjpg&auto=webp&v=enabled&s=87ddb6aa6d1bbde7398b9ccec8cec149a7de1441"
                ],
                "likes": 7,
                "title": "New Levus Model - LEVUS NARROW",
                "url": "/r/LevusWorkstation/comments/wd02rz/new_levus_model_levus_narrow/"
            },
            {
                "author": "zerogravity_levus",
                "comments": 0,
                "content": "[https://www.reddit.com/r/AskBattlestations/comments/jkkzau/levus\\_zero\\_gravity\\_workstation/](https://www.reddit.com/r/AskBattlestations/comments/jkkzau/levus_zero_gravity_workstation/)",
                "date": "Sat, 16 Jul 2022 16:13:17 GMT",
                "id": "w0hm54",
                "images": [],
                "likes": 2,
                "title": "Here is a link to some discussions on the matter",
                "url": "/r/LevusWorkstation/comments/w0hm54/here_is_a_link_to_some_discussions_on_the_matter/"
            },
            {
                "author": "zerogravity_levus",
                "comments": 0,
                "content": "",
                "date": "Sat, 16 Jul 2022 16:03:57 GMT",
                "id": "w0hf4q",
                "images": [
                    "https://preview.redd.it/1sfyv39isxb91.jpg?width=6000&format=pjpg&auto=webp&v=enabled&s=0c3ae6f39daf3f98c83f143af511426188b3a49a",
                    "https://preview.redd.it/wpdl2ligsxb91.jpg?width=6000&format=pjpg&auto=webp&v=enabled&s=dc3ba9169c97ef0a4bf27adbac95030bc7ef6e0a",
                    "https://preview.redd.it/788whpvesxb91.jpg?width=6000&format=pjpg&auto=webp&v=enabled&s=e942beeca22eeba821d7c2019e525f5bbbb6da04"
                ],
                "likes": 2,
                "title": "Technology evolves yet we still hunch over a desk like in the middle ages. Time for something different. Time for the Levus Workstation.",
                "url": "/r/LevusWorkstation/comments/w0hf4q/technology_evolves_yet_we_still_hunch_over_a_desk/"
            }
        ]
    }
    if (posts) {
        renderPosts(subreddit, posts.data, customTag);
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
        loadStyleSheet('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'),
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