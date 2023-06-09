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
        //         "author": "theripeorange",
        //         "comments": 64,
        //         "content": "https://streamable.com/81n4ul",
        //         "date": "Fri, 09 Jun 2023 06:42:02 GMT",
        //         "id": "144vfkp",
        //         "images": [],
        //         "likes": 339,
        //         "title": "Commissioner Adam Silver makes a joke about the meaning of \"anti-carrying\"",
        //         "url": "/r/nba/comments/144vfkp/commissioner_adam_silver_makes_a_joke_about_the/",
        //         "video": []
        //     },
        //     {
        //         "author": "Kimber80",
        //         "comments": 30,
        //         "content": "https://twitter.com/HarrisonWind/status/1666983739157512193?s=19",
        //         "date": "Fri, 09 Jun 2023 03:49:12 GMT",
        //         "id": "144rw9z",
        //         "images": [],
        //         "likes": 562,
        //         "title": "[Wind] Nikola Jokic today on Christian Braun's off-ball movement in Game 3: \"Aggressive movement. When he cuts, he's aggressive...Yesterday he was amazing, but usually, he does the same things. Sometimes he makes, sometimes he misses, but generally, he's playing really aggressive.\"",
        //         "url": "/r/nba/comments/144rw9z/wind_nikola_jokic_today_on_christian_brauns/",
        //         "video": []
        //     },
        //     {
        //         "author": "UnexpectedSoggyBread",
        //         "comments": 272,
        //         "content": "https://youtu.be/DGndt_RmA4U?t=285",
        //         "date": "Fri, 09 Jun 2023 03:48:12 GMT",
        //         "id": "144rvjn",
        //         "images": [],
        //         "likes": 2098,
        //         "title": "Nikola Jokic on American sports media's obsession on stats: \"People are always trying to tell me my stats and I'm trying to say it's team basketball.\"",
        //         "url": "/r/nba/comments/144rvjn/nikola_jokic_on_american_sports_medias_obsession/",
        //         "video": []
        //     },
        //     {
        //         "author": "TheRealDevDev",
        //         "comments": 129,
        //         "content": "https://twitter.com/highkin/status/1666979494094307328\n\nDamian Lillard on Instagram Live seconds ago: \"In that same [Showtime] interview, he asked me if I think I'll still be in a Trail Blazers uniform, and I said I do. Because I do.\"\n\n\"I felt like I had to say something, so it doesn't look like I'm in the background setting shit up.\"",
        //         "date": "Fri, 09 Jun 2023 03:35:24 GMT",
        //         "id": "144rlty",
        //         "images": [],
        //         "likes": 712,
        //         "title": "[Highkin]: Lillard on Instagram Live: \"In that same [Showtime] interview, he asked me if I think I'll still be in a Trail Blazers uniform, and I said I do. Because I do.\"",
        //         "url": "/r/nba/comments/144rlty/highkin_lillard_on_instagram_live_in_that_same/",
        //         "video": []
        //     },
        //     {
        //         "author": "Kimber80",
        //         "comments": 81,
        //         "content": "https://twitter.com/ShamsCharania/status/1666980891548168198?t=Y-ZEK0U8XOw1JqqJYsYWYg&s=19",
        //         "date": "Fri, 09 Jun 2023 03:31:42 GMT",
        //         "id": "144rj0r",
        //         "images": [],
        //         "likes": 617,
        //         "title": "[Charania] Sources: Kentucky’s Chris Livingston has cancelled all seven of his remaining workouts for the 2023 NBA Draft, fueling belief that he’s received a draft promise from a team.",
        //         "url": "/r/nba/comments/144rj0r/charania_sources_kentuckys_chris_livingston_has/",
        //         "video": []
        //     },
        //     {
        //         "author": "EarthWarping",
        //         "comments": 426,
        //         "content": "https://twitter.com/DuaneRankin/status/1666901473261912066",
        //         "date": "Thu, 08 Jun 2023 23:56:49 GMT",
        //         "id": "144mgs1",
        //         "images": [],
        //         "likes": 2054,
        //         "title": "[Rankin] \"Everything I've heard and seen, Deandre Ayton is gone.\" Richard Jefferson on Ayton when talking about Chris Paul's future in Phoenix and how #Suns can orchestrate roster if they trade Ayton and Paul.",
        //         "url": "/r/nba/comments/144mgs1/rankin_everything_ive_heard_and_seen_deandre/",
        //         "video": []
        //     },
        //     {
        //         "author": "Repulsive-Shoe-1869",
        //         "comments": 883,
        //         "content": "https://streamable.com/8u9z5i",
        //         "date": "Thu, 08 Jun 2023 23:49:12 GMT",
        //         "id": "144m9mm",
        //         "images": [],
        //         "likes": 8469,
        //         "title": "Last night, Paul Pierce showed up crazy drunk to a YouTube livestream of the game with Kevin Garnett, and KG tried to keep it all together. Here were some of the best moments.",
        //         "url": "/r/nba/comments/144m9mm/last_night_paul_pierce_showed_up_crazy_drunk_to_a/",
        //         "video": []
        //     },
        //     {
        //         "author": "Michaelmuk16",
        //         "comments": 885,
        //         "content": "https://twitter.com/malika_andrews/status/1666896499274309646?t=slkpH4pcYDL-p66U5cml8Q&s=19",
        //         "date": "Thu, 08 Jun 2023 23:10:51 GMT",
        //         "id": "144l9c1",
        //         "images": [],
        //         "likes": 5011,
        //         "title": "[Andrews] Jamal Murray sustained a bad floor burn in Game 3. When he was younger, his dad would have him do pain tolerance drills — including balancing cups of hot tea on his quads while holding a squat — to prepare for moments like this. From NBA Today:",
        //         "url": "/r/nba/comments/144l9c1/andrews_jamal_murray_sustained_a_bad_floor_burn/",
        //         "video": []
        //     },
        //     {
        //         "author": "NBA_MOD",
        //         "comments": 27,
        //         "content": "# Game Threads Index (June 08, 2023):\n\n|Tip-off|GDT|Away|Score|Home|PGT|\n|:--|:--:|:--|:-:|:--|:--:|",
        //         "date": "Thu, 08 Jun 2023 21:00:03 GMT",
        //         "id": "144hsv7",
        //         "images": [],
        //         "likes": 19,
        //         "title": "Daily Discussion Thread + Game Thread Index",
        //         "url": "/r/nba/comments/144hsv7/daily_discussion_thread_game_thread_index/",
        //         "video": []
        //     },
        //     {
        //         "author": "valiidiix",
        //         "comments": 320,
        //         "content": "https://twitter.com/mgiannotto/status/1666605383773835271?s=20",
        //         "date": "Thu, 08 Jun 2023 20:57:37 GMT",
        //         "id": "144hqlb",
        //         "images": [],
        //         "likes": 6039,
        //         "title": "[Mark Giannotto] It appears Adam Silver is going to make sure Ja Morant doesn’t distract from the NBA Finals by talking about Ja Morant before every game of the NBA Finals. Bold strategy.",
        //         "url": "/r/nba/comments/144hqlb/mark_giannotto_it_appears_adam_silver_is_going_to/",
        //         "video": []
        //     },
        //     {
        //         "author": "Kimber80",
        //         "comments": 198,
        //         "content": "https://twitter.com/NotoriousOHM/status/1666874639161741312",
        //         "date": "Thu, 08 Jun 2023 20:34:25 GMT",
        //         "id": "144h519",
        //         "images": [],
        //         "likes": 2279,
        //         "title": "[Youngmisuk] Asked about Michael Porter Jr., Michael Malone said, “We believe in Michael. He’s our starting small forward.”",
        //         "url": "/r/nba/comments/144h519/youngmisuk_asked_about_michael_porter_jr_michael/",
        //         "video": []
        //     },
        //     {
        //         "author": "-AsapRocky-",
        //         "comments": 108,
        //         "content": "https://twitter.com/espn_macmahon/status/1666865266465046528?s=46&t=3MN91oJhL7tCeLgkvFUZ_g",
        //         "date": "Thu, 08 Jun 2023 19:50:49 GMT",
        //         "id": "144g0qo",
        //         "images": [],
        //         "likes": 1010,
        //         "title": "[McMahon] Jimmy Butler: “I will be better, because when I’m better, we’re better as a whole.”",
        //         "url": "/r/nba/comments/144g0qo/mcmahon_jimmy_butler_i_will_be_better_because/",
        //         "video": []
        //     },
        //     {
        //         "author": "greenwhitehell",
        //         "comments": 1336,
        //         "content": "https://streamable.com/3cfmj4",
        //         "date": "Thu, 08 Jun 2023 19:49:05 GMT",
        //         "id": "144fz0l",
        //         "images": [],
        //         "likes": 17404,
        //         "title": "Stephen A. Smith: \"Jokic isn't known for having some kind of dominant post game. It's not his game\". JJ Redick responds: \"Stephen A., we have got 10 years of tracking data. You know what the most efficient half court play is? In 10 years? A Nikola Jokic post-up.\"",
        //         "url": "/r/nba/comments/144fz0l/stephen_a_smith_jokic_isnt_known_for_having_some/",
        //         "video": []
        //     },
        //     {
        //         "author": "porkusdingus",
        //         "comments": 179,
        //         "content": "Jokic had 53 on May 7, 2023 against Phoenix. \n\nLeBron had 51 on May 31, 2018 against Golden State. \n\n\nChris Paul had 17 assists on April 22, 2006 against Dallas. \n\nJokic had 17 assists on May 5, 2023 against Phoenix (CP3 did not play that game) \n\nEmbiid had 21 rebounds on June 14, 2021 against Atlanta. \n\nJokic had 21 rebounds on May 16, 2023 against Las Angeles Lakers AND had 21 rebounds against Miami on June 7, 2023. \n\nSources below but pretty incredible that he’s matching the career highs of generational talents in the 3 major stats categories all within on playoff run. \n\nJokic stats:\n[https://www.basketball-reference.com/players/j/jokicni01/gamelog-playoffs/](https://www.basketball-reference.com/players/j/jokicni01/gamelog-playoffs/)\n\nLeBron stats:\n[https://www.basketball-reference.com/players/j/jamesle01/gamelog-playoffs/](https://www.basketball-reference.com/players/j/jamesle01/gamelog-playoffs/)\n\nChris Paul stats:\n[https://www.basketball-reference.com/players/p/paulch01/gamelog-playoffs/](https://www.basketball-reference.com/players/p/paulch01/gamelog-playoffs/)\n\nEmbiid stats:\n[https://www.basketball-reference.com/players/e/embiijo01/gamelog-playoffs/](https://www.basketball-reference.com/players/e/embiijo01/gamelog-playoffs/)",
        //         "date": "Thu, 08 Jun 2023 18:27:26 GMT",
        //         "id": "144du8q",
        //         "images": [],
        //         "likes": 1143,
        //         "title": "In his 2023 playoff run Nikola Jokic has tied or beaten the career playoff highs of LeBron James in points, Chris Paul in assists, and Joel Embiid in rebounds.",
        //         "url": "/r/nba/comments/144du8q/in_his_2023_playoff_run_nikola_jokic_has_tied_or/",
        //         "video": []
        //     },
        //     {
        //         "author": "iksnet",
        //         "comments": 1159,
        //         "content": "Starting 11 minutes into [Locked On Pelicans](https://youtu.be/QHzHK8fRJjc) with Pelicans insider, credentialed member of the media Jake Madison.\n\n> Based on my conversations with people with the team, there are times when they feel very fed up with Zion. Not enough to necessarily want to trade Zion Williamson away or actively start to do that. Again, they’re really trying to appease him with a big deal shake up or the training staff, but it’s in their minds in some capacity. And you know, they’ve worked through some trade scenarios or what the return for him would be.\n\n> We’ve heard some rumors of does he want to be here or not. He said all of the right things. Actions have been a little bit different at times. He doesn’t really spend a lot of time around the team in the offseason doing offseason workouts. He doesn’t necessarily need to, but you’d certainly like it.\n\n> I think the Pelicans absolutely love Scoot Henderson, really think Scoot is going to be a star and would also like to be in the Scoot business.",
        //         "date": "Thu, 08 Jun 2023 17:32:48 GMT",
        //         "id": "144ces2",
        //         "images": [],
        //         "likes": 4124,
        //         "title": "[Madison] Based on my conversations with people with the team, there are times when they feel very fed up with Zion. Not enough to necessarily want to trade him away, but it’s in their minds in some capacity. They’ve worked through some trade scenarios or what the return for him would be.",
        //         "url": "/r/nba/comments/144ces2/madison_based_on_my_conversations_with_people/",
        //         "video": []
        //     },
        //     {
        //         "author": "lopea182",
        //         "comments": 86,
        //         "content": "https://twitter.com/shamscharania/status/1666824887002886146?s=46&t=hdMYR5VNI3D4hupTVErxeg",
        //         "date": "Thu, 08 Jun 2023 17:10:43 GMT",
        //         "id": "144buzl",
        //         "images": [],
        //         "likes": 1649,
        //         "title": "[Charania] Sources: Bucks star Khris Middleton underwent a successful surgery on his right knee shortly after the playoffs to address an issue that plagued him this past season.",
        //         "url": "/r/nba/comments/144buzl/charania_sources_bucks_star_khris_middleton/",
        //         "video": []
        //     },
        //     {
        //         "author": "InsaneZang",
        //         "comments": 668,
        //         "content": "He's scoring [38.5 pts/100 possessions](https://www.nba.com/stats/players/advanced?CF=PLAYER_NAME*E*jokic&Season=2022-23). Steph's playoff high is [38.2 pts/100 possessions](https://www.nba.com/stats/players/advanced?CF=PLAYER_NAME*E*steph&Season=2021-22), which happened last year as he led the Warriors to another title.\n\nI think Jokić is challenging peak Steph as the best offensive player of the century, which I didn't really think was possible a few years ago. After seeing his ridiculous efficiency numbers for the finals, I wanted to compare their stats. I was pretty surprised to see his raw scoring rate was higher than Steph's best ever when Steph has so many memorable scoring explosions, while I think of Jokić's game as more about efficiency and playmaking than volume scoring.\n\nSome caveats:\n\n* It would be pretty easy to argue that Steph still has the overall best scoring postseason, since in 2017 he had 37.0 pts/100 possessions on **65.9 ts%**. Jokić is \"only\" at 62.9 ts% for these playoffs. On the other hand, while the Nuggets are a great team, Jokić doesn't have prime KD and Klay to play off of (holy shit imagine that team though).\n\n* I bet Steph would have had some even more insane statistical runs if KD never joined them, but I'm sure he's happy with the rings he got instead.\n\nAnother tidbit: the Nuggets have a higher offensive rating for these playoffs (119.3) than any of the Warriors teams during their dynasty run (highest was 118.2 in 2017). The league has been changing since then, but just considering the talent that was on that team, it's still pretty crazy.\n(Even crazier: 2017 Cavs OFFRTG: 119.9!!)",
        //         "date": "Thu, 08 Jun 2023 16:25:30 GMT",
        //         "id": "144aq3w",
        //         "images": [],
        //         "likes": 2818,
        //         "title": "Nikola Jokić is scoring at a higher rate in the playoffs than Steph Curry ever has",
        //         "url": "/r/nba/comments/144aq3w/nikola_jokić_is_scoring_at_a_higher_rate_in_the/",
        //         "video": []
        //     },
        //     {
        //         "author": "_eviehalboro",
        //         "comments": 1011,
        //         "content": "https://www.si.com/nba/2023/06/08/stephen-a-smith-breaks-down-zion-williamson-alleged-affair",
        //         "date": "Thu, 08 Jun 2023 15:08:30 GMT",
        //         "id": "1448uqc",
        //         "images": [],
        //         "likes": 8437,
        //         "title": "SAS on Zion's romantic...entanglements: “Man, you only played 29 games last year! And you missed the season before that! What the hell is taking you so long to get healthy? Well, now I know!”",
        //         "url": "/r/nba/comments/1448uqc/sas_on_zions_romanticentanglements_man_you_only/",
        //         "video": []
        //     },
        //     {
        //         "author": "dkp1998",
        //         "comments": 584,
        //         "content": "Butler is basically the only player that can catch him in any category. Jokic has 3 more points in 2 fewer games. If this stat holds as far as I can tell it'll be the first time anyone had EVER lead the playoffs in all three categories.\n\n[https://www.basketball-reference.com/playoffs/NBA\\_2023\\_leaders.html](https://www.basketball-reference.com/playoffs/NBA_2023_leaders.html)",
        //         "date": "Thu, 08 Jun 2023 14:28:35 GMT",
        //         "id": "1447x9o",
        //         "images": [],
        //         "likes": 3959,
        //         "title": "After last night's game Jokic is now leading the playoffs in total points, rebounds, and assists.",
        //         "url": "/r/nba/comments/1447x9o/after_last_nights_game_jokic_is_now_leading_the/",
        //         "video": []
        //     },
        //     {
        //         "author": "NBA_MOD",
        //         "comments": 102,
        //         "content": "Here is a place to have in depth, x's and o's, discussions on yesterday's games. Post-game discussions are linked in the table, keep your memes and reactions there.\n\nPlease keep your discussion of a particular game in the respective comment thread. **All direct replies to this post will be removed.**\n\n\n|Away|Home|Score|GT|PGT|\n|:--|:--|:-:|:-:|:-:|\n|[](/DEN) Denver Nuggets |[](/MIA) Miami Heat | 109 - 94 | [Link](https://www.reddit.com/r/nba/comments/143snh1/game_thread_denver_nuggets_11_miami_heat_11_june/) | [Link](https://www.reddit.com/r/nba/comments/143xgjn/post_game_thread_the_denver_nuggets_take_a/) |",
        //         "date": "Thu, 08 Jun 2023 14:00:02 GMT",
        //         "id": "1447b23",
        //         "images": [],
        //         "likes": 76,
        //         "title": "[SERIOUS NEXT DAY THREAD] Post-Game Discussion (June 07, 2023)",
        //         "url": "/r/nba/comments/1447b23/serious_next_day_thread_postgame_discussion_june/",
        //         "video": []
        //     }
        // ])
    }, [subreddit, limit]);

    // Return a loader if loading state is true
    if (loading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
                <MagnifyingGlass
                    visible={true}
                    height="90"
                    width="90"
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
                                        <FontAwesomeIcon icon={faUser} style={{color: '#5b4db7'}}/>{' '}
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
