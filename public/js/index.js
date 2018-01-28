$(function(){
    //删除功能
    $('.del').on('click', function () {
        let id = $('.del').attr('data-id');
        $.ajax({
           type: 'post',
           url: '/admin/movie/delete',
           data: {
               id: id
           },
           success: function (result) {
                if(!result.code){
                    window.location.reload();
                }
           }
        });
    });

    //豆瓣同步
    $('#douban').blur(function () {
        const douban = $(this);
        const id = douban.val();

       $.ajax({
           url: 'https://api.douban.com/v2/movie/subject/' + id,
           cache: true,
           type: 'get',
           dataType: 'jsonp',
           crossDomain: true,
           jsonp: 'callback',
           success: function (data) {
               $('#inputTitle').val(data.title);
               $('#inputDoctor').val(data.directors[0].name);
               $('#inputCountry').val(data.countries[0]);
               $('#inputPoster').val(data.images.small);
               $('#inputYear').val(data.year);
               $('#inputSummary').val(data.summary);
           }
       })
    });

    //注册功能
    $('#signup').on('click', function () {
        const name = $('#signupModal').find('[name="name"]').val();
        const password = $('#signupModal').find('[name="password"]').val();
        const role = $('#signupModal').find('[name="role"]').val() || '';
        $.ajax({
            type: 'post',
            url: '/user/signup',
            data: {
                name: name,
                password: password,
                role: role
            },
            success: function (data) {
                $('#signupDanger').html(data.message).css('color', '#e38d13');
                if(!data.code){
                    window.location.reload();
                }
            }
        })
    });

    //登录功能
    $('#signin').on('click', function () {
        const name = $('#signinModal').find('[name="name"]').val();
        const password = $('#signinModal').find('[name="password"]').val();
        $.ajax({
            type: 'post',
            url: '/user/signin',
            data: {
                name: name,
                password: password
            },
            success: function (data) {
                $('#danger').html(data.message).css('color', '#e38d13');
                if(!data.code){
                    window.location.reload();
                }
            }
        })
    });

    //退出功能
    $('#logout').on('click', function () {
       $.ajax({
           url: '/user/logout',
           success: function (data) {
               if(!data.code){
                   window.location.reload();
               }
           }
       })
    });
});