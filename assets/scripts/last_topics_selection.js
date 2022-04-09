$(function () {

    $.ajax({
        type: 'post',
        url: "../controller/topic.php",
        dataType: 'json',
        data: {
            action: 'last-four-posts',
        },
        success: function (result) {
            // ADD THE FOUR LAST POSTS TO CARDS IN HOMEPAGE
            result['datas'].forEach(topic => {

                $full_content = topic['content']
                if ($full_content.length > 50) {
                    $content = $full_content.substr(0, 50);
                    $content += '...';
                } else {
                    $content = $full_content;
                }

                // ADD TOPICS DATAS TO CARDS
                $('#home-last-posts-selection').append('<div class="padding10 col-xs-12 col-sm-6 col-md-4 col-xl-3"><div class="card card-topic">\n' +
                    '  <div class="card-body">\n' +
                    '    <h5 class="card-title">' + topic['title'] + '</h5>\n' +
                    '    <span class="card-category">' + topic['name'].toUpperCase() + '</span></br>\n' +
                    '    <span class="card-release_date">' + topic['release_date'] + '</span>\n' +
                    '    <p class="card-text">' + $content + '</p>\n' +
                    '    <a href="topic_details.html?id=' + topic['id'] + '" class="btn btn-primary">Read more</a>\n' +
                    '  </div></div>');
            })
        },
        error: function (jqxhr) {
            // IF NO RESULTS ARE FOUND
            $('.container').append('<div class="topic_not_found"><h4>No topic found</h4><br><a href="../view/topic_new.html">Post a new topic</a></div>');
        },
    })
});
