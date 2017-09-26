layui.use(['form', 'element', 'table', 'layer', 'vip_table'], function () {
        var $ = layui.jquery;
        var table = layui.table;
        var layer = layui.layer;
        var v_table = layui.vip_table;

        var device = layui.device

        console.log(v_table)

        var tableIns = table.render({
            elem: '#content-table',
            // data: ''
            //----------------http请求数据
            url: '../asset/js/data.json',
            method: 'get',
            where: {
                id: '要传的参数'
            },
            request: {
                pageName: 'page',
                limitName: 'limit'
            }
            , response: {
                statusName: 'status' //数据状态的字段名称，默认：code
                ,statusCode: 200 //成功的状态码，默认：0
                ,msgName: 'hint' //状态信息的字段名称，默认：msg
                ,countName: 'total' //数据总数的字段名称，默认：count
                ,dataName: 'data' //数据列表的字段名称，默认：data
              }
            , done: function(res, curr, count){
                $('#loadDataCount').text(count)
            }           
                  
            //------------------------
            , height: 'auto'
            , cols: [[ //标题栏
                { checkbox: true, LAY_CHECKED: false } //默认全选
                , { field: 'username', title: '机构名称', width: 120 }
                , { field: 'email', title: '上级机构', width: 150 }
                , { field: 'sign', title: '是否授权', width: 150 }
                , { field: 'sex', title: '管理员', width: 80 }
                , { field: 'city', title: '类型', width: 100 }
                , { field: 'experience', title: '修改人', width: 120 }
                , { field: 'a1', title: '修改时间', width: 110, sort: true }
                , { field: 'a2', title: '审核状态', width: 110 }
                , { field: 'a3', title: '审核人', width: 100 }
                , { field: 'a4', title: '审核时间', width: 100 }
                , { field: 'a5', title: '创建人', width: 100 }
                , { field: 'a6', title: '创建时间', width: 120, sort: true }
            ]]
            , skin: 'row' //表格风格
            , even: true
            , page: true //是否显示分页
            , limits: [5, 7, 10]
            , limit: 5 //每页默认显示的数量
        })



    //     var delArr = []
    //     table.on('checkbox(test1)', function(obj){
    //         console.log(obj.checked); //当前是否选中状态
    //         console.log(obj.data); //选中行的相关数据
    //         delArr.push(obj.data.id.substr(2))
    //     });
    //    $("#delItem").click(function(){
    //        console.log(1)
    //        delArr.forEach(function(item){
    //             $("tbody").find('tr[data-index='+ item +']').remove()
    //        })        
    //    })

    $("#delItem").click(function(){
        var $table = $('.layui-table').eq(1);
        var ids = v_table.getIds($table,'data-index')   //返回选中行的主键  参数:表格元素，主键属性
        v_table.deleteAll(ids,'./data.json','','')
        // $('tbody input:checkbox:checked').parents('tr').remove()        
    })

    $('#addData').on('click',function(){
        

        tableIns.reload({
            done: function(){
                console.log('又加载了一次')
            }
        })
    })
    

// 面包屑导航
    function getBreadTitle(){
        var tabTitle = window.top.document.getElementById('tabTitle')
        var title = $(tabTitle).find('.layui-this label').text()
        var parentTitle = $(tabTitle).find('.layui-this label').parents('.layui-nav-item')
    
        $('.layui-breadcrumb').find('a:last cite').text(title)


       

    }

    getBreadTitle();
    
    

    });
