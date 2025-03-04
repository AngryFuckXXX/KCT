
//读取分类,并且根据大类自动生成小类数据
function getCategory(firstOption,url,id){
    let step = 0
    let first_cate_id = window.localStorage.getItem('first_cate_id').toString()
    let data  = JSON.parse(window.localStorage.getItem('query_data'))
    let cate_id     = data.cate_id ? data.cate_id.split(",") : '0'
    if(first_cate_id > 0){
        cate_id.push(first_cate_id)
    }
    $.ajax({
        url     : url,
        data    : {},
        type    : "POST",
        dataType: "json",
        success : function (reset) {
            let select_id
            for (i in reset.data) {
                let id = reset.data[i].id
                let selected = cate_id.includes(id.toString()) ? 'selected' : ''
                if(cate_id.includes(id.toString())){
                    select_id = id
                }
                firstOption += `<option ${selected} value="${reset.data[i].id}">${reset.data[i].name}</option>`
            }
            $('#'+id).html(firstOption)
            //判断大类是否有选中
            if(id === 'bigClass' && select_id && step === 0){
                step++
                let firstOption = '<option value="">选择产品子类</option>'
                let url = window.location.origin+'/general/api/categories?type=1&pid='+select_id
                getCategory(firstOption,url,'smallClass')
            }
        }
    });
}


//解析链接参数
function parseURL() {
    let url = decodeURI(window.location.href)
    url  = url.split("?")[1] ? url.split("?")[1] : '';
    var res  = {};
    if(url !== '') {
        var para = url.split("&") ? url.split("&") : '';
        var len  = para.length;

        var arr  = [];
        for (var i = 0; i < len; i++) {
            arr         = para[i].split("=");
            res[arr[0]] = arr[1];
        }
    }
    return res;
}

//渲染分页
function renderPage(url) {
    let nums = window.localStorage.getItem('nums')
    if(nums <= 0) return
    var p = new Page({
        el           : '.van-pagination',
        nums         : window.localStorage.getItem('nums'),
        counts       : window.localStorage.getItem('limit'),
        defaultPage  : window.localStorage.getItem('page'),
        showHeadFoot : false, // 显示首页尾页
        jumpToOrder  : false, // 跳转到指定页
        showNowAndAll: false, // 当前页/共几页
        clickEvent   : function (currectPage, _this) {
            window.localStorage.setItem('page',currectPage)
            $('body,html').animate({scrollTop: 0}, 0);
            //刷新当前页面
            let data = JSON.parse(window.localStorage.getItem('query_data'))
            data['limit'] = window.localStorage.getItem('limit')
            data['page'] = currectPage
            let query = ''
            let i = 0
            for(let key  in data){
                i++
                if(Object.keys(data).length === i){
                    query += key+'='+data[key]
                }else {
                    query += key+'='+data[key]+'&'
                }
            }
            window.location.href = url+'?'+query;
        }
    });
}

//刷新本地数据,目前仅支持对象类型数据,数组暂未支持
function refreshLocal(item,value){
    let item_arr = item.split(".")
    let localKey = item_arr.length > 0 ? item_arr[0] : ''
    let local_data = ''
    if(localKey){
        local_data  = JSON.parse(window.localStorage.getItem(localKey))
        //查找更新数据
        let temp = local_data;
        for (let i =1;i < item_arr.length;i++){
            if(i+1 === item_arr.length){
                temp[item_arr[i]] = value
            }else {
                temp = local_data[item_arr[i]]
            }
        }
        window.localStorage.setItem(localKey, JSON.stringify(local_data));
    }

    return localKey ? local_data : false
}
