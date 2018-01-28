$(function () {
    //获取要回复该评论的节点和评论人的名字
    let li = '';
    let cname = '';

    $('.comment').on('click',function () {
       target = $(this);
       cname = target.data('cname');
       let toId = target.data('tid');
       let commentId = target.data('cid');
       let userId = $('#userId').val();

        $('textarea').focus();
        li = target.parents('li');

       //判断当前登录的用户是否是给自己回复, 如果是则不能回复
       if(userId == toId){
           return;
       }else {
           if($('#toId').length > 0){
               $('#toId').val(toId);
               $('#commentId').val(commentId);
           }else{
               $('<input>').attr({
                   type: 'hidden',
                   id: 'toId',
                   name: 'comment[tid]',
                   value: toId
               }).appendTo('#commentForm');

               $('<input>').attr({
                   type: 'hidden',
                   id: 'commentId',
                   name: 'comment[cid]',
                   value: commentId
               }).appendTo('#commentForm');
           }
       }
    });

    $('#commentSubmit').on('click', function () {
        let content = $('#commentForm') .find('[name="content"]').val();
        if(content == ''){
            return;
        }


        let movieId = $('#commentForm') .find('[name="movieId"]').val();
        let fromId = $('#commentForm') .find('[name="fromId"]').val();
        let name = $('#commentForm').find('[name="username"]').val();

        let comment = {
            movie: movieId,
            from: fromId,
            content: content,
            name: name
        };

        if($('#commentForm') .find('[id="toId"]')){
            let toId = $('#commentForm') .find('[id="toId"]').val();
            let cid = $('#commentForm') .find('[id="commentId"]').val();
            comment.cid = cid;
            comment.tid = toId;
        }

        $.ajax({
            type: 'post',
            url: '/comment',
            data: {
                comment: comment
            },
            success: function (data) {
                $('#commentForm') .find('[name="content"]').val('');
                if(!data.code){
                    comment._id = data._id;
                    renderComment(comment);
                }
                //提交回复评论后这两个hidden的input没有清除导致无法对电影进行评论只能回复评论，所以要每次评论完要清楚
                if($('#toId').length > 0){
                    $('#toId').remove();
                    $('#commentId').remove();
                }
            }

        })

    });

    $('textarea').on('click', function () {
        //防止这两个hidden出来后无法对电影进行评论而只能回复plunge
        if($('#toId').length > 0){
            $('#toId').remove();
            $('#commentId').remove();
        }
    });

    function renderComment(comment) {
        let commentHtml = `
           <div class="pull-left">
                <a class="comment" href="javascript:;" data-cid=` + comment._id + 'data-tid=' + comment.from +  '>' +
                    `<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBl
                    bmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly
                    93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMC
                    A2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIua
                    nMvNjR4NjQKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9
                    sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZW
                    ZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNjEzMjU4MjAyYyB0ZXh0IHsgZmlsbDoj
                    QUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zL
                    XNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE2MTMy
                    NTgyMDJjIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxMy40NTgz
                    MzM5NjkxMTYyMTEiIHk9IjM2LjgiPjY0eDY0PC90ZXh0PjwvZz48L2c+PC9zdmc+" style="width: 64px; height: 64px">
                </a>
            </div>
            <div class="media-body">
                <h4 class="media-heading">`;
        if(comment.cid){
            let html = '<div class="media">' + commentHtml + comment.name + '<span class="text-info">&nbsp;回复&nbsp;</span>' + cname + '</h4><p>' +
                comment.content + '</p></div></div>';
            li.find('[class="media-body"]').eq(0).append(html);
        }else{
            let html = '<li class="media" style="border-bottom:1px dashed  #000;">' + commentHtml + comment.name +  '</h4>' +
                '<p>' + comment.content + '</p></div></li>';
            $('.media-list').append(html);
        }


    }

});