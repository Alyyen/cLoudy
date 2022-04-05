$(function () {
    // GET TOPICS DATAS BY ID CATEGORY FROM DATABASE
    let url = window.location.href;
    let id_category = url.substring(url.lastIndexOf('?id=') + 4);

    // CATEGORIES HEAD
    switch(id_category){
        case '1' :
            $('.container-fluid').append('<img class="category_banner" src=\'https://images.unsplash.com/photo-1585282263861-f55e341878f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\' alt=\'Mobile category banner\'/>');
            $('.container').append('<div class="topic_category"><h2>Mobile</h2></div>');
            break;
        case '2' :
            $('.container-fluid').append('<img class="category_banner" src=\'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80\' alt=\'Web category banner\'/>');
            $('.container').append('<div class="topic_category"><h2>Web</h2></div>');
            break;
        case '3' :
            $('.container-fluid').append('<img class="category_banner" src=\'https://images.unsplash.com/photo-1586296835409-fe3fe6b35b56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80\' alt=\'Web category banner\'/>');
            $('.container').append('<div class="topic_category"><h2>UX/UI Design</h2></div>');
            break;
        case '4' :
            $('.container-fluid').append('<img class="category_banner" src=\'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80\' alt=\'Web category banner\'/>');
            $('.container').append('<div class="topic_category"><h2>Security</h2></div>');
            break;
        case '5' :
            $('.container-fluid').append('<img class="category_banner" src=\'https://images.unsplash.com/photo-1503551723145-6c040742065b-v2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\' alt=\'Web category banner\'/>');
            $('.container').append('<div class="topic_category"><h2>Other</h2></div>');
            break;
        default :
            break;
    }

    $.ajax({
        type: 'post',
        url: "../controller/topic_list.php",
        dataType: 'json',
        data: {
            data: id_category,
        },
        success: function (result) {
            result['datas'].forEach(topic => {
                console.log(topic);
                $('.container').append('<div class="topic_item">' +
                   '<a href="topic_details.html?id=' + topic['id'] + '" class="">' + topic['title'] + '</a>' + '<span>&nbsp;' + topic['release_date'] + '</span>' + '</div>');
            })
        },
        error: function (jqxhr) {
            $('.container').append('<div class="topic_category"><h4>Oops... There is no topic in this category yet...</h4><br><a href="../view/index.html">Back to home</a></div>');
        },
    })
});
