var isLogin = false;

$(function () {
    var v_navHtml = "<nav class=\"navbar navbar-inverse\">\n" +
        "    <div class=\"container-fluid\">\n" +
        "        <!-- Brand and toggle get grouped for better mobile display -->\n" +
        "        <div class=\"navbar-header\">\n" +
        "           <ul> <li><a class=\"navbar-brand\" href='/'>飞狐电商前台666</a></li></ul>\n" +
        "        </div>\n" +
        "\n" +
        "        <!-- Collect the nav links, forms, and other content for toggling -->\n" +
        "        <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">" +
        "            <ul class=\"nav navbar-nav navbar-right\" id='nav_ul'>" +
        "                <li id=\"loginInfo\"><a href=\"/login.html\">登录</a></li>" +
        "                <li><a href=\"/register.html\">注册</a></li>" +
        "                <li><a href=\"/cart-student.html\">购物车</a></li>" +
        "                <li><a href=\"javascript:;\" onclick='loginOut()'>退出</a></li>" +
        "            </ul>\n" +
        "        </div><!-- /.navbar-collapse -->\n" +
        "    </div><!-- /.container-fluid -->\n" +
        "</nav>";

    $("#navDiv").html(v_navHtml);

    $.ajaxSetup({
        beforeSend: function(xhr) {
            var token = window.localStorage.getItem("token");
            xhr.setRequestHeader("x-auth", token);
        }
    })
    //查询用户是否登录
    $.ajax({
        url:"http://localhost:8003/member/getMember",
        type:"post",
        dataType:"json",
        async:false,
        success:function (data) {
            if (data.code == 200) {
                isLogin = true;
                $("#loginInfo").html('<a>欢迎'+data.data+'登录</a>');
            }
        }
    })
})

//加入购物车的方法
function buy(productId,count,flag) {
    //alert(productId+"----"+count);
    $.post(
        "http://localhost:8081/cart/buy.do",
        {"productId":productId,"count":count},
        function (data) {
            if (data.code == 200){
                if (flag == 1){
                    location.href = "/cart-student.html"
                }else {
                    initCart();
                }
            }else {
                alert(data.msg);
            }
        }
    )
}
//退出登录
function loginOut() {
    $.post(
        "http://localhost:8081/member/loginOut.do",
        function (data) {
            if (data.code == 200){
                location.href = "/login.html";
            }
        }
    )
}




