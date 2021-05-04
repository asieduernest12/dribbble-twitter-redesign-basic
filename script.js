var feeds;
async function fetchFeed(){
 feeds =  await new Promise((res,rej)=>{
        let response = new Array(10).fill(null).map(()=>generateTweet())
        console.table(response);
        res(response);
    })

    makeTimelineCard(feeds)
    
}

function makeTimelineCard(feeds){
    let cards = feeds.map(makeFeedHtml);
    populateTimeline(cards);    
    
}

function populateTimeline(cards){
    document.querySelector('.feed--list').innerHTML = '';
     cards.forEach(card => {
        let card_element = document.createElement('div');
        card_element.innerHTML = card;
        document.querySelector('.feed--list').appendChild(card_element);
        setTimeout(()=>{},100)
    });;
}


function submitFeed(event){
    event.preventDefault();
    console.log(event.target);
    postFeed();
}

function postFeed(){
    if (!document.querySelector('input').value.length)
        return ;

    let new_feed = generateTweet();
    new_feed._delete = true;
    new_feed.time = Date.now();
    new_feed.account_handle = 'myself';
    new_feed.account_name = 'fancy';
    new_feed.text = document.querySelector('input').value;
    document.querySelector('input').value = '';
    feeds.unshift(new_feed);
    makeTimelineCard(feeds);
    
}

function deleteFeed(id){
    console.log('deleting');
    feeds = feeds.filter(_feed => _feed.id != id);
    makeTimelineCard(feeds);

}

function putFeed(feed){

}

async function fetchQuote(){
    return await fetch('https://zenquotes.io/api/random').then(res=>res.json()).then(res => res.q); 
}

function generateTweet(){
    let _random_int = Math.floor(Math.random() *60+1);
    let info_likes = Math.floor(Math.random() *60+1);
    let info_replies = Math.floor(Math.random() *60+1);
    let info_retweets = Math.floor(Math.random() *60+1);
    return {
        id:  Date.now(),
        account_name: 'account' + _random_int ,
        account_handle: 'handle'+ _random_int,
        time: `10:${_random_int}am`,
        text: 'lorLorem ipsum dolor sit amet consectetur adipisicing elit. Earum nam rem deleniti natus veritatis velit in dolore esse iste em',
        info_replies,
        info_retweets,
        info_likes
    }
}

function makeFeedHtml(feed){
    let {account_name,account_handle,time,text,info_likes,info_replies,info_retweets,_delete,id} = feed;
    return `<li class="feed--item">
    <div class="feed--card shadow-lg p-3 d-flex flex-column position-relative mb-5" style="background-image: url(https://source.unsplash.com/random/700x40${Math.floor(Math.random()*20+1)});">
        <div class="card--header d-flex">
            <img src="https://loremflickr.com/60/6${Math.floor(Math.random()*9+1)}" alt="" class="avatar rounded-circle me-3">
            <div class="account pe-3">
                <div class="account--name">${account_name}</div>
                <div class="account--handle">@${account_handle}</div>
            </div>
            <div class="feed--time">${time}</div>
            <button class="ms-auto me-3 btn btn-link btn-lg btn-close-white rounded-circle ${_delete?? 'd-none'}" onclick="deleteFeed(${id})"><i class="fas fa-trash"></i></button>
        </div>
        <div class="card--body mt-auto bg-gradient bg-transparent px-3 py-1">
            <p class="feed--message">${text}</p>
        </div>
        <div class="card--footer d-flex ms-3">
            <div class="footer--info--pill me-5">
            <i class="fas fa-comments"></i>
                <info--text>${info_replies}</info--text>
            </div>
            <div class="footer--info--pill me-5">
                <i class="fas fa-sync"></i>
                <info--text>${info_retweets}</info--text>
            </div>
            <div class="footer--info--pill me-3">
            <i class="fas fa-heart"></i>
            <info--text>${info_likes}</info--text>
            </div>
        </div>
    </div>
</li>`
}

fetchFeed();