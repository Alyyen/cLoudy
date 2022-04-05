$(function () {
// GET TOPICS DATAS BY ID CATEGORY FROM DATABASE
    let url = window.location.href;
    let id_category = url.substring(url.lastIndexOf('?id=') + 4);

    switch(id_category){
        case '1' :
            $('.container').append('<div class="topic_category"><h2>Mobile</h2></div>');
            break;
        case '2' :
            $('.container').append('<div class="topic_category"><h2>Web</h2></div>');
            break;
        case '3' :
            $('.container').append('<div class="topic_category"><h2>UX/UI Design</h2></div>');
            break;
        case '4' :
            $('.container').append('<div class="topic_category"><h2>Security</h2></div>');
            break;
        case '5' :
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
            $('.container').append('<div class="topic_category"><h4>Oops... There is no topic in this category yet...</h4></div>');
            console.log('===== ERROR =====');
            console.log(jqxhr.responseText);
        },
    })
});
