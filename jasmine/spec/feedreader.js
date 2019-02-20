/* feedreader.js
 *
  This is the spec file that Jasmine will read and contains
 all of the tests that will be run against your application.

 这是Jasmine将读取和包含的spec文件
  将对您的应用程序运行的所有测试
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 
 我们将所有测试都放在$（）函数中，
  因为其中一些测试可能需要DOM元素。 我们想要
  确保在DOM准备好之前它们不会运行。
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    
    这是我们的第一个测试套件 - 测试套件只包含
     一组相关的测试。 这个套件都是关于RSS的
      feed定义，我们的应用程序中的allFeeds变量。
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         
         这是我们的第一次测试 - 它测试以确保
           allFeeds变量已定义，而不是
          空。 在开始之前试验一下
          这个项目的其余部分。 当你改变时会发生什么
           app.js中的allFeeds是一个空数组并刷新
          *页面？
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

  
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         
         TODO：编写一个循环遍历每个Feed的测试
          在allFeeds对象中，并确保它定义了一个URL
          并且该URL不为空。
         */
         it(' url defined and not empty.',function(){
             for(var i=0;i<allFeeds.length;i++){
               expect(allFeeds[i]["url"]).toBeDefined();
               expect(allFeeds[i]["url"].length).not.toBe(0);
            }
            });
        
  
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         
         TODO：编写一个循环遍历每个Feed的测试
          在allFeeds对象中，并确保它已定义名称
          并且该名称不为空。
         */
       
            it('name are defindand not empty',function(){
                for(var j=0;j<allFeeds.length;j++){
                    expect(allFeeds[j]["name"]).toBeDefined();
                    expect(allFeeds[j]["name"].length).not.toBe(0);
                }
            });    

        });

    /* TODO: Write a new test suite named "The menu"
    TODO：写一个名为“菜单”的新测试套件
    */
    describe('The menu',function(){

    
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         
         TODO：编写一个确保菜单元素的测试
          默认隐藏。 你将不得不分析HTML和
           CSS确定我们如何执行
          隐藏/显示菜单元素。
         */
        var $menuIcon,$body;
        beforeEach(function(){
            $menuIcon=$('.menu-icon-link');
            $body=$('body');
        });
        afterEach(function(){
            $menuIcon=null;
            $body=null;
        });
        it(' is hidden by default',function(){
            expect($body.hasClass('menu-hidden')).toBeTruthy();
        })
        //hasClass() 方法检查被选元素是否包含指定的 class

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          
          TODO：编写一个确保菜单更改的测试
           单击菜单图标时的可见性。 这个测试
           应该有两个期望：菜单显示时间
           点击并再次点击时隐藏。
          */
            it('changes  visibility when the menu icon is clicked.',function(){
                $menuIcon.trigger('click');//用代码模拟点击；trigger（）触发被选元素的指定事件
                expect($body.hasClass('menu-hidden')).toBeFalsy();
                $menuIcon.trigger('click');
                expect($body.hasClass('menu-hidden')).toBeTruthy();
            });
    });
    /* TODO: Write a new test suite named "Initial Entries" 
    编写一个名为“Initial Entries”的新测试套件
    */
    describe('Initial Entries',function(){

 
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         
         编写一个确保loadFeed时间的测试
          函数被调用并完成其工作，至少有
           .feed容器中的单个.entry元素。
          请记住，loadFeed（）是异步的，因此需要进行此测试
          使用Jasmine的beforeEach和异步done（）函数。
             */
            beforeEach(function(done) {
                loadFeed(0, done);
            }, 10000);// 超时设置
            
            it('should have at least a single .entry element within the .feed container', function() {
                expect($('.feed .entry').length).toBeGreaterThan(0);
            });

        })
    /* TODO: Write a new test suite named "New Feed Selection" 
    编写一个名为“New Feed Selection”的新测试套件*/
    describe('New Feed Selection',function(){
        /* TODO: Write a test that ensures c
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         编写测试以确保何时加载新的Feed
          *通过loadFeed函数实际更改内容。
          *请记住，loadFeed（）是异步的。 
        
         */ 
        beforeEach(function(done){
                loadFeed(1,function(){
                    content1=$('.feed').html();
                    loadFeed(2,done);
                    done()
                    });
                 
                });
             
            })
        it('New Feed Selection',function(){
            var content1;
             expect(content1).not.toBe($('.feed').html());
            });

        });
               
            
         
    
    
