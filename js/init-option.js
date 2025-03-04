$(function () {
    //刷新localStorage 数据
    const oUrl        = window.location.origin                              //当前域名
    // let newUrl = decodeURIComponent(window.location.href)
    // console.log(newUrl)
    let query_data    = parseURL(oUrl)                      //url数据
    let page          = $('#list-count-page-limit').data('page')            //当前页
    let nums          = $('#list-count-page-limit').data('count')           //总页数
    let limit         = $('#list-count-page-limit').data('limit')           //每页数据
    let first_cate_id = $('#list-first-cate-id').data('id')                 //一级分类id
    let _local        = window.localStorage;

    _local.setItem("page", page ? page : 1);
    _local.setItem("limit", limit ? limit : 15);
    _local.setItem("nums", nums ? nums : 0);
    _local.setItem("query_data", JSON.stringify(query_data));
    _local.setItem("first_cate_id", first_cate_id ? first_cate_id : '');

    //点击底部回到顶部
    $('.mk-css-icon-menu').click(function () {
        $(this).toggleClass('is-active')
        $('.h5MenuList').toggle()
    })
    //点击回到顶部的元素
    $(".toTopBtn").click(function (e) {
        //以1秒的间隔返回顶部
        $('body,html').animate({scrollTop: 0}, 1000);
    });

    $(window).scroll(function () {

        if ($(window).scrollTop() > 100) {
            //滚动条离顶部大于100元素,渐显
            $(".toTopBtn").fadeIn(1000);
        } else {
            //滚动条离顶部大于100元素,隐藏
            $(".toTopBtn").fadeOut(1000);
        }

        if ($(window).width() >= 864) {
            $('#header_h5').hide();
            $(".header_h52").hide()
            if ($(window).scrollTop() >= 1) {
                $("#header").addClass('active');
                $('.header2').show();
            } else {
                $("#header").removeClass('active');
                $('.header2').hide();
            }
        } else {
            $('.header2').hide();
            $("#header").hide()
            if ($(window).scrollTop() >= 1) {
                $("#header_h5").addClass('active');
                $('.header_h52').show();
            } else {
                $("#header_h5").removeClass('active');
                $('.header_h52').hide();
            }
        }
    })

    //搜索
    $('#searchBtn').click(function () {
        let keywords         = $('#keywords').val();
        let bigClass         = $('#bigClass').val();
        let smallClass       = $('#smallClass').val();
        let cate_id          = bigClass ? (smallClass ? smallClass : bigClass) : ''
        let query            = ''
        let data             = window.localStorage.getItem('query_data')
        query += cate_id ? 'cate_id=' + cate_id : (data.cate_id ? 'cate_id=' + data.cate_id : '')
        query += keywords ? (query !== '' ? '&' : '') + 'keywords=' + keywords : ''
        query += data.tag_id ? (query !== '' ? '&' : '') + 'tag_id=' + data.tag_id : ''
        window.location.href = `/productsList.html` + encodeURI((query !== '' ? '?' + query : ''));
    })

});
