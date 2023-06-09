import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faComments, faThumbsUp, faUser} from '@fortawesome/free-solid-svg-icons';
import {MagnifyingGlass} from "react-loader-spinner";

function Posts({subreddit = null, numPosts = 2}) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(numPosts);

    const formatDate = date => {
        return new Date(date).toLocaleString('de-DE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    useEffect(() => {
        if (subreddit) {
            setLoading(true);
            fetch(`http://127.0.0.1:5000/reddit?subreddit=${subreddit}&limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    setPosts(data.posts)
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error)
                    setLoading(false)
                });
        }
        // setPosts([
        //     {
        //         "author": "zerogravity_levus",
        //         "comments": 1,
        //         "content": "A place for members of r/LevusWorkstation to chat with each other",
        //         "date": "Sat, 16 Jul 2022 15:53:04 GMT",
        //         "id": "w0h71o",
        //         "images": [],
        //         "likes": 1,
        //         "title": "r/LevusWorkstation Lounge",
        //         "url": "/r/LevusWorkstation/comments/w0h71o/rlevusworkstation_lounge/"
        //     },
        //     {
        //         "author": "No-Comparison-9307",
        //         "comments": 80,
        //         "content": "",
        //         "date": "Thu, 30 Mar 2023 17:00:12 GMT",
        //         "id": "126pkdq",
        //         "images": [],
        //         "likes": 1041,
        //         "title": "Proof of Work comes in many forms",
        //         "url": "/r/Bitcoin/comments/126pkdq/proof_of_work_comes_in_many_forms/",
        //         "video": [
        //             "https://v.redd.it/gdjaogb65wqa1/DASH_1080.mp4?source=fallback"
        //         ]
        //     },
        //     {
        //         "author": "s_detta",
        //         "comments": 16,
        //         "content": "",
        //         "date": "Fri, 31 Mar 2023 05:28:25 GMT",
        //         "id": "1278oxy",
        //         "images": [],
        //         "likes": 233,
        //         "title": "Felt inspired last night and ended up making this Bitcoin compilation video.. hope you guys like it!",
        //         "url": "/r/Bitcoin/comments/1278oxy/felt_inspired_last_night_and_ended_up_making_this/",
        //         "video": [
        //             "https://v.redd.it/lao1cmy6c1ra1/DASH_1080.mp4?source=fallback"
        //         ]
        //     },
        //     {
        //         "author": "druunavt",
        //         "comments": 0,
        //         "content": "Hi, wondering how much space this takes up on the ground - the footprint needed to fit the entire workstation? I have a rather small office area.  \n\n\nAlso, I saw a keyboard mounted on the pipes in one of the videos - a piano keyboard, not a typing one, I mean. What accessories would be used to mount this? To be able to create music and record in the workstation would be ideal. Thanks!",
        //         "date": "Thu, 23 Feb 2023 19:00:06 GMT",
        //         "id": "11a45a1",
        //         "images": [],
        //         "likes": 1,
        //         "title": "Footprint of Levus Workstation?",
        //         "url": "/r/LevusWorkstation/comments/11a45a1/footprint_of_levus_workstation/"
        //     },
        //     {
        //         "author": "zerogravity_levus",
        //         "comments": 0,
        //         "content": "[https://www.youtube.com/watch?v=NyugCJ40IIw&t=110s](https://www.youtube.com/watch?v=NyugCJ40IIw&t=110s)",
        //         "date": "Sun, 12 Feb 2023 09:49:46 GMT",
        //         "id": "110b57y",
        //         "images": [],
        //         "likes": 1,
        //         "title": "The Evolution of Back Pain",
        //         "url": "/r/LevusWorkstation/comments/110b57y/the_evolution_of_back_pain/"
        //     },
        //     {
        //         "author": "zerogravity_levus",
        //         "comments": 0,
        //         "content": "",
        //         "date": "Tue, 17 Jan 2023 21:39:19 GMT",
        //         "id": "10emtsa",
        //         "images": [
        //             "https://preview.redd.it/dc0tn3i30oca1.jpg?auto=webp&v=enabled&s=91ac0dd06ce4fc40c8391714c608edf4f2f42c64"
        //         ],
        //         "likes": 1,
        //         "title": "Todays Torture",
        //         "url": "/r/LevusWorkstation/comments/10emtsa/todays_torture/"
        //     },
        //     {
        //         "author": "Scrap_Mechanic_Lab",
        //         "comments": 1,
        //         "content": "&#x200B;\n\n[Peg & Arm mounts](https://preview.redd.it/b1xm7mhfpzfa1.jpg?width=3154&format=pjpg&auto=webp&v=enabled&s=9c914446b3575d0481405ae0aa61a20609fef1db)\n\nThis is for two types of mounts \\~ Arm Mounts and Peg Mounts\n\nPeg mounts are great as headphones hangers and attaching smaller pipe clamping accessories like microphones and pop filters.\n\nArm mounts are great for Phones Tablets and Webcams.\n\nYou can make all of them with the links to the hardware I am Providing have fun and keep levitating Amigos\\~\n\nGet the pegs here: Amazon [https://www.amazon.com/dp/B0B4K5WBWS/?coliid=I3OGYLWUNNG1QL&colid=VRJWBPB27QII&psc=1&ref\\_=lv\\_ov\\_lig\\_dp\\_it](https://www.amazon.com/dp/B0B4K5WBWS/?coliid=I3OGYLWUNNG1QL&colid=VRJWBPB27QII&psc=1&ref_=lv_ov_lig_dp_it)\n\nGoogle:  **10Pack 1.57 Inch Single Buckle Quick Lock Stage Lighting Clamp for KTV Par Light**\n\nAmazon [https://www.amazon.com/dp/B07QW5BQGY/?coliid=I3TLFXSKPCNF2W&colid=VRJWBPB27QII&psc=1&ref\\_=lv\\_ov\\_lig\\_dp\\_it](https://www.amazon.com/dp/B07QW5BQGY/?coliid=I3TLFXSKPCNF2W&colid=VRJWBPB27QII&psc=1&ref_=lv_ov_lig_dp_it)\n\nEbay  [https://www.ebay.com/itm/393315976430?hash=item5b937584ee:g:c6QAAOSw14tgne6D&amdata=enc%3AAQAHAAAA8AR7HTZDqB7mAuc43BYenH5rBV5i8xxnUKY4Tk9K0gz8NFMqOms51VUv3F6wdZO0kufo%2FIvZZ889jDWtFCtwPmKbEzqfIlzeyu9iKhUYk0U5beefpfBJEwQFWJOOFo5klFKHxdNSZPmWZQfH35M3GCDNUIWob2HSdLoNFiulQfF8Xe3VlFFjiscDVN1XImt%2FvZyXUzObD3H2fFAAnxzMhKtuRVuaradmH5JNID1BzjCbmkcWKKafLajyH0tD3%2BNp8vor0rJ8FXiIoHJZgLMWZJQcLL5CeJeSRKFVRVeowA08WXuMOujSZe3cgboOyc9wvA%3D%3D%7Ctkp%3ABk9SR7bWqI3iYA](https://www.ebay.com/itm/393315976430?hash=item5b937584ee:g:c6QAAOSw14tgne6D&amdata=enc%3AAQAHAAAA8AR7HTZDqB7mAuc43BYenH5rBV5i8xxnUKY4Tk9K0gz8NFMqOms51VUv3F6wdZO0kufo%2FIvZZ889jDWtFCtwPmKbEzqfIlzeyu9iKhUYk0U5beefpfBJEwQFWJOOFo5klFKHxdNSZPmWZQfH35M3GCDNUIWob2HSdLoNFiulQfF8Xe3VlFFjiscDVN1XImt%2FvZyXUzObD3H2fFAAnxzMhKtuRVuaradmH5JNID1BzjCbmkcWKKafLajyH0tD3%2BNp8vor0rJ8FXiIoHJZgLMWZJQcLL5CeJeSRKFVRVeowA08WXuMOujSZe3cgboOyc9wvA%3D%3D%7Ctkp%3ABk9SR7bWqI3iYA)\n\nAbove are the pipe clamps you will need you can attach them to the Pegs using these kinds of screws:  **CEI BOLT 3/8″ X 26 TPI X 1″ BSA**\n\nEbay Link [https://www.ebay.com/itm/275177538469?hash=item4011dc03a5:g:I0UAAOSwNg1iE8EF&amdata=enc%3AAQAHAAAAsEY%2FuIx7iEebmCTTj89NM%2FORi9d7ihX0YL%2FFdOplzPvd6fL%2BMzwq6CnBCTe2UnywAYrzEifBAyhdUmZJfdZlDPFCv5BKfTq4gpVgTLY4gm%2Bhcw%2FBEYHEPncAKy6YbR6qsCvTm6sHskhG9aFmDQLUE%2F90X3fivvFTDLup%2Bqi9BKRziW77AWU0gsDXg8pmN53MRQMv9ALYC6ohk9uygiaOfzQCXsgFiM6WCh4bXgBnwc63%7Ctkp%3ABk9SR\\_TW9YziYA](https://www.ebay.com/itm/275177538469?hash=item4011dc03a5:g:I0UAAOSwNg1iE8EF&amdata=enc%3AAQAHAAAAsEY%2FuIx7iEebmCTTj89NM%2FORi9d7ihX0YL%2FFdOplzPvd6fL%2BMzwq6CnBCTe2UnywAYrzEifBAyhdUmZJfdZlDPFCv5BKfTq4gpVgTLY4gm%2Bhcw%2FBEYHEPncAKy6YbR6qsCvTm6sHskhG9aFmDQLUE%2F90X3fivvFTDLup%2Bqi9BKRziW77AWU0gsDXg8pmN53MRQMv9ALYC6ohk9uygiaOfzQCXsgFiM6WCh4bXgBnwc63%7Ctkp%3ABk9SR_TW9YziYA)\n\nIf you are only interested in arm mounts for lighter terminals like tablets and phones then all you will need is the pipe clamps above and these arm mounts: [https://www.amazon.com/gp/product/B01IMN58US/ref=ppx\\_yo\\_dt\\_b\\_search\\_asin\\_title?ie=UTF8&psc=1](https://www.amazon.com/gp/product/B01IMN58US/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1)\n\nAnd lastly, if you're wondering what I'm using to hold my phone its this mount: [https://www.amazon.com/gp/product/B085C4S8XF/ref=ppx\\_yo\\_dt\\_b\\_search\\_asin\\_title?ie=UTF8&psc=1](https://www.amazon.com/gp/product/B085C4S8XF/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1)\n\nhttps://preview.redd.it/m8n967yf06m91.jpg?width=2448&format=pjpg&auto=webp&v=enabled&s=d1c7490852d07b2d34081f16b760f9c30b7d1551\n\nhttps://preview.redd.it/g5jmlhyf06m91.jpg?width=2448&format=pjpg&auto=webp&v=enabled&s=caedb92ed9bc4fff042531b82f04b27033b2c868\n\nhttps://preview.redd.it/bkeiqcyf06m91.jpg?width=2448&format=pjpg&auto=webp&v=enabled&s=144cb833bfc3082717d88b7d4501abff2a8211c6\n\nhttps://preview.redd.it/snhao7yf06m91.jpg?width=2448&format=pjpg&auto=webp&v=enabled&s=281e0fe0c782faf7a4f20ab65163813a5e7c9c2f",
        //         "date": "Tue, 06 Sep 2022 06:08:31 GMT",
        //         "id": "x70m6q",
        //         "images": [
        //             "https://preview.redd.it/g5jmlhyf06m91.jpg?width=2448&format=pjpg&auto=webp&v=enabled&s=caedb92ed9bc4fff042531b82f04b27033b2c868",
        //             "https://preview.redd.it/snhao7yf06m91.jpg?width=2448&format=pjpg&auto=webp&v=enabled&s=281e0fe0c782faf7a4f20ab65163813a5e7c9c2f",
        //             "https://preview.redd.it/m8n967yf06m91.jpg?width=2448&format=pjpg&auto=webp&v=enabled&s=d1c7490852d07b2d34081f16b760f9c30b7d1551",
        //             "https://preview.redd.it/bkeiqcyf06m91.jpg?width=2448&format=pjpg&auto=webp&v=enabled&s=144cb833bfc3082717d88b7d4501abff2a8211c6",
        //             "https://preview.redd.it/b1xm7mhfpzfa1.jpg?width=3154&format=pjpg&auto=webp&v=enabled&s=9c914446b3575d0481405ae0aa61a20609fef1db"
        //         ],
        //         "likes": 5,
        //         "title": "Accessory mounts for your Levus Workstation",
        //         "url": "/r/LevusWorkstation/comments/x70m6q/accessory_mounts_for_your_levus_workstation/"
        //     },
        //     {
        //         "author": "zerogravity_levus",
        //         "comments": 0,
        //         "content": "",
        //         "date": "Tue, 30 Aug 2022 13:10:16 GMT",
        //         "id": "x1g90d",
        //         "images": [
        //             "https://preview.redd.it/dahtmiow2uk91.jpg?auto=webp&v=enabled&s=7e6543b38d226de69a303624d0032e2b1c7bf652"
        //         ],
        //         "likes": 6,
        //         "title": "Cat Approved",
        //         "url": "/r/LevusWorkstation/comments/x1g90d/cat_approved/"
        //     },
        //     {
        //         "author": "zerogravity_levus",
        //         "comments": 1,
        //         "content": "",
        //         "date": "Sun, 31 Jul 2022 23:55:00 GMT",
        //         "id": "wd02rz",
        //         "images": [
        //             "https://preview.redd.it/mxvwkchn6ze91.jpg?width=3000&format=pjpg&auto=webp&v=enabled&s=0a97174ed9b037c30aa150b9d2150f66052c273b",
        //             "https://preview.redd.it/v847tc6k6ze91.jpg?width=3000&format=pjpg&auto=webp&v=enabled&s=f1cc4590fa39458a9f425ec2fe1ca1327733cce3",
        //             "https://preview.redd.it/eycdu93i6ze91.jpg?width=4000&format=pjpg&auto=webp&v=enabled&s=f0ce330f7b3040c55ea276d628cc5db84b42cfe7",
        //             "https://preview.redd.it/snu8xvci6ze91.jpg?width=4000&format=pjpg&auto=webp&v=enabled&s=fb7944c5875fe14912605348bf307c747d7a167a",
        //             "https://preview.redd.it/kxmq4hpl6ze91.jpg?width=4000&format=pjpg&auto=webp&v=enabled&s=c5a2aa2b2dc638965ac300883917f0b462b20f45",
        //             "https://preview.redd.it/5jruq3oi6ze91.jpg?width=6000&format=pjpg&auto=webp&v=enabled&s=df57e8723997385e2efd86eadb334b4635c4dec2",
        //             "https://preview.redd.it/chghu9rm6ze91.jpg?width=3000&format=pjpg&auto=webp&v=enabled&s=a263fcda9933808a256d218e21ef58de7c5bdb8c",
        //             "https://preview.redd.it/46fd5dqh6ze91.jpg?width=4000&format=pjpg&auto=webp&v=enabled&s=87ddb6aa6d1bbde7398b9ccec8cec149a7de1441"
        //         ],
        //         "likes": 7,
        //         "title": "New Levus Model - LEVUS NARROW",
        //         "url": "/r/LevusWorkstation/comments/wd02rz/new_levus_model_levus_narrow/"
        //     },
        //     {
        //         "author": "zerogravity_levus",
        //         "comments": 0,
        //         "content": "[https://www.reddit.com/r/AskBattlestations/comments/jkkzau/levus\\_zero\\_gravity\\_workstation/](https://www.reddit.com/r/AskBattlestations/comments/jkkzau/levus_zero_gravity_workstation/)",
        //         "date": "Sat, 16 Jul 2022 16:13:17 GMT",
        //         "id": "w0hm54",
        //         "images": [],
        //         "likes": 2,
        //         "title": "Here is a link to some discussions on the matter",
        //         "url": "/r/LevusWorkstation/comments/w0hm54/here_is_a_link_to_some_discussions_on_the_matter/"
        //     },
        //     {
        //         "author": "zerogravity_levus",
        //         "comments": 0,
        //         "content": "",
        //         "date": "Sat, 16 Jul 2022 16:03:57 GMT",
        //         "id": "w0hf4q",
        //         "images": [
        //             "https://preview.redd.it/1sfyv39isxb91.jpg?width=6000&format=pjpg&auto=webp&v=enabled&s=0c3ae6f39daf3f98c83f143af511426188b3a49a",
        //             "https://preview.redd.it/wpdl2ligsxb91.jpg?width=6000&format=pjpg&auto=webp&v=enabled&s=dc3ba9169c97ef0a4bf27adbac95030bc7ef6e0a",
        //             "https://preview.redd.it/788whpvesxb91.jpg?width=6000&format=pjpg&auto=webp&v=enabled&s=e942beeca22eeba821d7c2019e525f5bbbb6da04"
        //         ],
        //         "likes": 2,
        //         "title": "Technology evolves yet we still hunch over a desk like in the middle ages. Time for something different. Time for the Levus Workstation.",
        //         "url": "/r/LevusWorkstation/comments/w0hf4q/technology_evolves_yet_we_still_hunch_over_a_desk/"
        //     }
        // ])
    }, [subreddit, limit]);

    //Return a loader if loading state is true
    if (loading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperStyle={{}}
                    wrapperClass="MagnifyingGlass-wrapper"
                    glassColor='#c0efff'
                    color='#e15b64'
                />
            </div>
        );
    }


    return (
        <div className="container">
            <div className="row">
                {posts.map(post => (
                    <div key={post.id} className="col-md-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <a
                                        href={`https://www.reddit.com${post.url}`}
                                        style={{
                                            color: 'black',
                                            textDecoration: 'underline',
                                            backgroundImage: 'linear-gradient(to right, #20478a, #9325cf)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            fontWeight: 'extra bold',
                                        }}
                                    >
                                        <b>{post.title}</b>
                                    </a>
                                </h5>
                                <br/>
                                {post.images && post.images.length > 0 && (
                                    <div className="mb-3 text-center">
                                        <img
                                            src={post.images[0]}
                                            alt="Post Image"
                                            className="img-fluid mx-auto d-block"
                                            style={{maxHeight: '350px', objectFit: 'cover'}}
                                        />
                                    </div>
                                )}

                                {(!post.images || post.images.length === 0) && !post.video && (
                                    <p className="card-text">{post.content}</p>
                                )}

                                <div className="card-subtitle small">
                                    <b>
                                        <FontAwesomeIcon icon={faUser} style={{color: '#6a208a'}}/>{' '}
                                    </b>
                                    {post.author}
                                </div>
                                <div className="card-comments small">
                                    <b>
                                        <FontAwesomeIcon icon={faComments}/>
                                    </b>{' '}
                                    {post.comments}
                                </div>
                                <div className="card-likes btn-success small">
                                    <b>
                                        <FontAwesomeIcon icon={faThumbsUp} style={{color: '#20478a'}}/>
                                    </b>{' '}
                                    {post.likes}
                                </div>
                                <div className="card-date small">
                                    <FontAwesomeIcon icon={faCalendarAlt}/> {formatDate(post.date)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;
