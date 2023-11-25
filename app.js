const btnname = () => {
    fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then(r => r.json())
    .then(d => {
        const navbar = document.getElementById("nav-bar");
        const navbtns = document.createElement("div");
        navbtns.classList.add("selecting-btns");
        navbtns.innerHTML = `
            <div><button onclick="videolist(${d.data[0].category_id})" id="btn-1" class="nav-btn">
            ${d.data[0].category}</button></div>
            <div><button onclick="videolist(${d.data[1].category_id})" id="btn-2" class="nav-btn">
            ${d.data[1].category}</button></div>
            <div><button onclick="videolist(${d.data[2].category_id})" id="btn-3" class="nav-btn">
            ${d.data[2].category}</button></div>
            <div><button onclick="videolist(${d.data[3].category_id})" id="btn-4" class="nav-btn">
            ${d.data[3].category}</button></div>
        `;
        navbar.appendChild(navbtns);
    })
}
btnname();

const videolist = (id) => {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then(r => r.json())
    .then(d => {
        const videoList = document.getElementById("video-list");
        videoList.innerHTML = "";
        const home = document.getElementById("home");
        home.innerHTML = "";
        
        if(d.status == false){
            const video = document.createElement("div");
            video.innerHTML = `
            <p class="err-text">Sorry! No Data found</p>
            <img class="err-img" src="PHero-Tube-main/Icon.png" alt="">`
            videoList.appendChild(video);
        }
        else{
            const sortbtn = document.createElement("div");
            sortbtn.innerHTML = `<button onclick="sortvideo(${id})" 
            class="sort-btn">Sort by view</button>`
            home.appendChild(sortbtn);
            d.data.forEach(element => {
                const video = document.createElement("div");
                video.classList.add("video");
                video.innerHTML = `
                <div class="image-time">
                    <img class="thumb-img" src="${element.thumbnail}" alt="">
                    <p id="video-time">${settime(element.others.posted_date)}</p>
                </div>
                <div class="profile-thumb">
                    <img class="profile-img" src="${element.authors[0].profile_picture}" alt="">
                    <h6 class="thumb-title">${element.title}</h6>
                </div>
                <div id="author-identity">
                    <p class="thumb-text">${element.authors[0].profile_name}</p>
                    <div id="verify">${verify(element.authors[0].verified)}</div>
                </div>
                <p class="thumb-text">${element.others.views} views</p>
                `;
                
                videoList.appendChild(video);
                
            });
            
        }
    })
}
videolist(1000);

const sortvideo = (id) => {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then(r => r.json())
    .then(d =>  
        {
        d.data.sort(function(a,b){
            return parseFloat(b.others.views) - parseFloat(a.others.views);
        });
        const videoList = document.getElementById("video-list");
        videoList.innerHTML = "";
        d.data.forEach(element => {
            const video = document.createElement("div");
            video.classList.add("video");
            video.innerHTML = `
            <div class="image-time">
            <img class="thumb-img" src="${element.thumbnail}" alt="">
            <p id="video-time">${settime(element.others.posted_date)}</p>
        </div>
        <div class="profile-thumb">
            <img class="profile-img" src="${element.authors[0].profile_picture}" alt="">
            <h6 class="thumb-title">${element.title}</h6>
        </div>
        <div id="author-identity">
            <p class="thumb-text">${element.authors[0].profile_name}</p>
            <div id="verify">${verify(element.authors[0].verified)}</div>
        </div>
        <p class="thumb-text">${element.others.views} views</p>
            `;
            videoList.appendChild(video);
        });
    });
}

const settime = (value) => {
    if(value!="")
    {
        const t = parseFloat(value);
        const min = t/60;
        const hr = min/60;
        const min2 = parseInt(min) - parseInt(hr)*60 ;
        const hr2 = parseInt(hr);
        return `${hr2} hr ${min2} min`
    }
    else{
        return ``;
    }
}

const verify = (val) =>{
    if (val == true)
    {
        return `<i class="fa fa-check-circle" style="font-size:20px;color:blue"></i>`;
    }
    else{
        return ``;
    }
}

