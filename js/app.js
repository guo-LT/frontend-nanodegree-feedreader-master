/* app.js
 *
 * This is our RSS feed reader application. It uses the Google
 * Feed Reader API to grab RSS feeds as JSON object we can make
 * use of. It also uses the Handlebars templating library and
 * jQuery.
 */

// The names and URLs to all of the feeds we'd like available.
/* app.js
 *
  *这是我们的RSS提要阅读器应用程序。 它使用谷歌
  * Feed Reader API将RSS提要作为我们可以制作的JSON对象
  * 用于。 它还使用Handlebars模板库和
  * jQuery。
 */

//我们想要的所有Feed的名称和URL。
var allFeeds = [
    {
        name: 'Udacity Blog',
        url: 'http://blog.udacity.com/feed'
    }, {
        name: 'CSS Tricks',
        url: 'http://feeds.feedburner.com/CssTricks'
    }, {
        name: 'HTML5 Rocks',
        url: 'http://feeds.feedburner.com/html5rocks'
    }, {
        name: 'Linear Digressions',
        url: 'http://feeds.feedburner.com/udacity-linear-digressions'
    }
];

/* This function starts up our application. The Google Feed
 * Reader API is loaded asynchonously and will then call this
 * function when the API is loaded.
 */
/*此函数启动我们的应用程序。 Google Feed
  * Reader API是异步加载的，然后调用它
  *加载API时的功能。
 */
function init() {
    // Load the first feed we've defined (index of 0).
    //加载我们定义的第一个Feed（索引为0）。
    loadFeed(0);
}

/* This function performs everything necessary to load a
 * feed using the Google Feed Reader API. It will then
 * perform all of the DOM operations required to display
 * feed entries on the page. Feeds are referenced by their
 * index position within the allFeeds array.
 * This function all supports a callback as the second parameter
 * which will be called after everything has run successfully.
 */
/*此功能执行使用Google Feed Reader API加载afeed所需的所有内容。 
然后，它将执行在页面上显示提要条目所需的所有DOM操作。 
Feed由allFeeds数组中的索引位置引用。 这个函数都支持回调作为第二个参数，
它将在一切运行成功后调用。
 */
 function loadFeed(id, cb) {
     var feedUrl = allFeeds[id].url,
         feedName = allFeeds[id].name;

     $.ajax({
       type: "POST",
       url: 'https://rsstojson.udacity.com/parseFeed',
       data: JSON.stringify({url: feedUrl}),
       contentType:"application/json",
       success: function (result, status){

                 var container = $('.feed'),
                     title = $('.header-title'),
                     entries = result.feed.entries,
                     entriesLen = entries.length,
                     entryTemplate = Handlebars.compile($('.tpl-entry').html());

                 title.html(feedName);   // Set the header text 设置标题文本
                 container.empty();      // Empty out all previous entries
                 //清空所有先前的条目

                 /* Loop through the entries we just loaded via the Google
                  * Feed Reader API. We'll then parse that entry against the
                  * entryTemplate (created above using Handlebars) and append
                  * the resulting HTML to the list of entries on the page.
                  *循环浏览我们刚刚通过Google加载的条目
                   * Feed Reader API。 然后我们将解析该条目
                   * entryTemplate（使用Handlebars创建）并追加
                   *生成的HTML到页面上的条目列表。
                  */
                 entries.forEach(function(entry) {
                     container.append(entryTemplate(entry));
                 });

                 if (cb) {
                     cb();
                 }
               },
       error: function (result, status, err){
                 //run only the callback without attempting to parse result due to error
                 //仅运行回调而不尝试解析由于错误导致的结果
                 if (cb) {
                     cb();
                 }
               },
       dataType: "json"
     });
 }

/* Google API: Loads the Feed Reader API and defines what function
 * to call when the Feed Reader API is done loading.
 
  Google API：加载Feed阅读器API并定义哪些功能
  在Feed Reader API加载完成后调用
 */
google.setOnLoadCallback(init);
/*当载入文档时，google.setOnLoadCallback 被用作 window.onload 的帮助程序，
这种情况只发生一次。因此，对于 API 的动态载入（例如进行了用户交互后），
应当使用带有回调选项的 google.load
*/
/* All of this functionality is heavily reliant upon the DOM, so we
 * place our code in the $() function to ensure it doesn't execute
 * until the DOM is ready.
 
 所有这些功能都严重依赖于DOM，所以我们
  将我们的代码放在$（）函数中以确保它不会执行
  直到DOM准备好。
 */
$(function() {
    var container = $('.feed'),
        feedList = $('.feed-list'),
        feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html()),
        feedId = 0,
        menuIcon = $('.menu-icon-link');

    /* Loop through all of our feeds, assigning an id property to
     * each of the feeds based upon its index within the array.
     * Then parse that feed against the feedItemTemplate (created
     * above using Handlebars) and append it to the list of all
     * available feeds within the menu.
     
     循环遍历所有Feed，为其分配id属性
      *每个Feed都基于其在数组中的索引。
      *然后针对feedItemTemplate解析该Feed（已创建
      *上面使用Handlebars）并将其附加到所有列表中
      *菜单中的可用Feed。
     */
    allFeeds.forEach(function(feed) {
        feed.id = feedId;
        feedList.append(feedItemTemplate(feed));

        feedId++;
    });

    /* When a link in our feedList is clicked on, we want to hide
     * the menu, load the feed, and prevent the default action
     * (following the link) from occurring.
     
    
      当我们点击feedList中的链接时，我们想要隐藏
      菜单，加载Feed，并阻止默认操作
      （在链接之后）发生。
     */
    feedList.on('click', 'a', function() {
        var item = $(this);

        $('body').addClass('menu-hidden');
        loadFeed(item.data('id'));
        return false;
    });

    /* When the menu icon is clicked on, we need to toggle a class
     * on the body to perform the hiding/showing of our menu.
     
     单击菜单图标时，我们需要切换一个类
      *在身体上执行隐藏/显示我们的菜单。
     */
    menuIcon.on('click', function() {
        $('body').toggleClass('menu-hidden');
    });
}());
