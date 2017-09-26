layui.use(['element', 'layer'], function() {
	var $ = layui.jquery,
		element = layui.element;
	//iframe自适应
	$(window).on('resize', function() {
		var $obj = $('#tabContainers');
		
		$obj.height($(this).height() - 245);
		$obj.find('iframe').each(function() {
			$(this).height($obj.height());
		});
	}).resize();


	//顶部箭头收缩-------------------------------------------------------------------------------
	$('#rightArrow').on('click',function(){
		var i = $(this).find('i');
		if( $(this).parents('.layui-layout-right').css('right') == '0px' ){
			$(this).parents('.layui-layout-right').animate({
				right: '-320px'
			})
			i.html('&#xe603;')
		}else{
			$(this).parents('.layui-layout-right').animate({
				right: '0'
			})
			i.html('&#xe602;')
		}
	})
	//顶部导航切换
	$('.layui-layout-left .layui-nav-item a').on('click',function(){
        var index = $(this).data('index')
        $('.layui-side .layui-side-scroll ul').eq(index).removeClass('hide').addClass('show').siblings().removeClass('show').addClass('hide');
	})
	//--------------------------------------------------------------------------------------------------------

	//添加tab
	var $tabs = $('#tabTitle'); //tab标题
	var $tabContainers = $('#tabContainers'); //tab 内容块
	var $sideNav = $('#sideNav'); //侧边导航
	//给nav绑定事件
	$('.layui-nav .layui-nav-item .layui-nav-child dd> a, .layui-nav .layui-nav-item> .site-active').each(function() {
		var $obj = $(this);
		var url = $obj.data('url'); //tab内容的地址

		
		//获取设定的url
		if(url !== undefined) {
			$obj.on('click', function() {
				var tabTitle = $obj.html();

				var count = 0;
				var tabId = $tabs.find('li:last-child').attr('lay-id');
				$tabs.find('li').each(function(i, e) {
					if($(this).find('label').text() === $obj.text()) {
						count++;
						tabId = $(this).attr('lay-id');
					};
				});
				if(count === 0) {
					//添加删除样式
					tabTitle += '<i class="layui-icon layui-unselect layui-tab-close">&#x1006;</i>';
					//添加tab
					element.tabAdd('page-tab', {
						title: tabTitle,
						content: '<iframe src="' + url + '"></iframe>',
						id: +tabId + 1
					});
					tabId = $tabs.find('li:last-child').attr('lay-id');
					$tabs.find('li:last-child').addClass('tab-item')
					//iframe 自适应
					var $content = $('.layui-tab-content');
					$content.find('iframe').each(function() {
						$(this).height($content.height());
					});
					//点击tab li切换导航，切换侧边导航的layui-this
					var $li = $tabs.find('li');
					$li.find('label').on('click', function() {
						var thisPage = $(this).text(); //当前显示页的标题
						var sidePage = $sideNav.find('dd.layui-this').find('a').text(); //当前侧面导航显示的标题
						if(thisPage != sidePage) {
							$sideNav.find('dd').each(function() {
								if($(this).find('label').text() == thisPage) {
									$sideNav.find('.layui-nav-child >dd').removeClass('layui-this');
									$(this).addClass('layui-this');
								}
							})
							if(thisPage == '首页') { //始终留置一个tab
								$sideNav.find('.layui-nav-child >dd').removeClass('layui-this');
							}
						}
					})
					//给tab-nav绑定关闭事件
					$li.eq($li.length - 1).children('i.layui-tab-close').on('click', function() {
						element.tabDelete('page-tab', tabId);
						var thisPage = $tabs.find('li.layui-this').find('label').text(); //当前显示页的标题
						var sidePage = $sideNav.find('dd.layui-this').find('a').text(); //当前侧面导航显示的标题
						if(thisPage != sidePage) {
							$sideNav.find('dd').each(function() {
								if($(this).find('label').text() == thisPage) {
									$sideNav.find('.layui-nav-child >dd').removeClass('layui-this');
									$(this).addClass('layui-this');
								}
							})
							if(thisPage == '首页') { //始终留置一个tab
								$sideNav.find('.layui-nav-child >dd').removeClass('layui-this');
							}
						}
					});
					//获取焦点
					element.tabChange('page-tab', tabId);
				} else {
					//切换tab
					element.tabChange('page-tab', tabId);
				}
			});
		}
	});
})