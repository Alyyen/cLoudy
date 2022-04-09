$(function () {
    // GET TOPICS DATAS BY ID CATEGORY FROM DATABASE
    let url = window.location.href;
    let id_category = url.substring(url.lastIndexOf('?id=') + 4);

    // CATEGORIES HEAD
    switch(id_category){
        case '1' :
            $('#banner_header').append('<img class="category_banner" src=\'https://images.unsplash.com/photo-1585282263861-f55e341878f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\' alt=\'Mobile category banner\'/>');
            $('.category_header').append('<div class="topic_category"><h2>Mobile</h2></div>');
            break;
        case '2' :
            $('#banner_header').append('<img class="category_banner" src=\'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80\' alt=\'Web category banner\'/>');
            $('.category_header').append('<div class="topic_category"><h2>Web</h2></div>');
            break;
        case '3' :
            $('#banner_header').append('<img class="category_banner" src=\'https://images.unsplash.com/photo-1586296835409-fe3fe6b35b56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80\' alt=\'Web category banner\'/>');
            $('.category_header').append('<div class="topic_category"><h2>UX/UI Design</h2></div>');
            break;
        case '4' :
            $('#banner_header').append('<img class="category_banner" src=\'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80\' alt=\'Web category banner\'/>');
            $('.category_header').append('<div class="topic_category"><h2>Security</h2></div>');
            break;
        case '5' :
            $('#banner_header').append('<img class="category_banner" src=\'https://images.unsplash.com/photo-1503551723145-6c040742065b-v2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\' alt=\'Web category banner\'/>');
            $('.category_header').append('<div class="topic_category"><h2>Other</h2></div>');
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
            // ADD RESULTS NUMBER IN THE CATEGORY HEADER
            $results_number = Object.keys(result['datas']).length;
            switch ($results_number){
                case 1:
                    $('.category_header').append('<div class="topic_category_results_number"><span>'+ $results_number +'&nbsp;result</span></div><br>');
                    break;
                default :
                    $('.category_header').append('<div class="topic_category_results_number"><span>'+ $results_number +'&nbsp;results</span></div><br>');
                    break;
            }

            result['datas'].forEach(topic => {
                // DISPLAY ONLY THE FIRST 100 CHARACTERS OF A TOPIC CONTENT
                $full_content = topic['content']
                if ($full_content.length > 100) {
                    $content = $full_content.substr(0, 100);
                    $content += '...';
                } else {
                    $content = $full_content;
                }

                // ADD TOPICS DATAS TO CARDS
                $('#category_list_div').append('<div class="padding10 col-xs-12 col-sm-6 col-md-4 col-xl-3"><div class="card card-topic">\n' +
                    '  <div class="card-body">\n' +
                    '    <h5 class="card-title">' + topic['title'] + '</h5>\n' +
                    '    <span class="card-release_date">' + topic['release_date'] + '</span>\n' +
                    '    <p class="card-text">' + $content + '</p>\n' +
                    '    <a href="topic_details.html?id=' + topic['id'] + '" class="btn btn-primary">Read more</a>\n' +
                    '  </div>\n');
            })
        },
        error: function (jqxhr) {
            // IF NO RESULTS ARE FOUND
            $('.container').append('<div class="topic_category"><h4>Oops... There is no topic in this category yet...</h4><br><a href="../view/index.html">Back to home</a></div>');
        },
    })
});
