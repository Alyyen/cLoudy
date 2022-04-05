$(function () {
// GET TOPICS DATAS BY ID CATEGORY FROM DATABASE
    let url = window.location.href;
    let id_category = url.substring(url.lastIndexOf('?id=') + 4);

    $.ajax({
        type: 'post',
        url: "../controller/topic_list.php",
        dataType: 'json',
        data: {
            data: id_category,
        },
        success: function (result) {
            // TODO: SWITCH DES INTS POUR AFFICHER LE NOM OU FAIRE JOINTURE AVEC LA TABLE CATEGORY
            $('.container').append('<div class="topic_category">' + result['id_category'] + '</div>');

            result['datas'].forEach(topic => {
                console.log(topic);
                $('.container').append('<div class="topic_item">' +
                   '<a href="topic_details.html?id=' + topic['id'] + '" class="">' + topic['title'] + '</a>' + '<span>&nbsp;' + topic['release_date'] + '</span>' + '</div>');
            })
        },
        error: function (jqxhr) {
            console.log('===== ERROR =====');
            console.log(jqxhr.responseText);
        },
    })
});
