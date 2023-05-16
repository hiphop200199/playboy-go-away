const staticCacheName = "site-static";
const dynamicCache="site-dynamic";
const assets =[
    '/','/index.html','/style.css','/script.js','/oh-no.mp3','/police.mp3','/wow.mp3','/manifest.json','/images/favicon.ico','/images/alarm-144x144.png',
]


//self表示service worker本身
//等到快取完成後才結束install event
self.addEventListener("install",event =>{
    event.waitUntil(caches.open(staticCacheName).then(cache =>{
        console.log("caching");
        cache.addAll(assets);
    }))
    
});

//activate事件要等快取更新完
//先找出所有快取的key，之後確認是舊的key就刪掉
//把promise回報給promise.all，全部都完成後回報完成，才結束事件
self.addEventListener("activate",event =>{
   event.waitUntil(
    caches.keys().then(keys =>{
        return Promise.all(
            keys.filter(key => key !==staticCacheName).map(key => caches.delete(key))
            )
    })
   )
});

//如果快取有了，就拿快取來用，如果沒有，才發請求給伺服器
//有其他請求後打開動態快取，把請求url和請求回應的複本放到動態快取，然後回應新fetch到的資料到網頁
self.addEventListener("fetch",event =>{
   
    event.respondWith(
    caches.match(event.request).then(cacheRes =>{
        return cacheRes || fetch(event.request).then(fetchRes =>{
            return caches.open(dynamicCache).then(cache =>{
                cache.put(event.request.url,fetchRes.clone());
                return fetchRes;
            })
        });
    })
   )
});