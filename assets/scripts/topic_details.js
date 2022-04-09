$(function () {
    let url = window.location.href;
    let id_topic = url.substring(url.lastIndexOf('?id=') + 4);

    // GET TOPIC DETAILS
    $.ajax({
        type: 'post',
        url: "../controller/topic.php",
        dataType: 'json',
        data: {
            action: 'topic-details',
            data: id_topic,
        },
        success: function (result) {
            result['datas'].forEach(data => {
                // ADD TOPIC DATAS TO TOPIC HEADER
                $('#topic_header').append('<div class="topic-details-header">\n' +
                    '    <h2 class="topic-details-title">' + data['title'] + '</h2>\n' +
                    '    <span class="card-category">' + data['name'].toUpperCase() + '</span></br>\n' +
                    '    <span class="card-release_date">' + data['release_date'] + '</span>\n' +
                    '  </div>');
                // ADD TOPIC CONTENT
                $('#topic_content_div').append('<div class="topic-details-body">\n' +
                    '    <p class="card-text">' + data['content'] + '</p>\n' +
                    '  </div>');
            })
        },
        error: function (jqxhr) {
            // IF NO RESULTS ARE FOUND
            $('.container').append('<div class="topic_not_found"><h4>No topic found</h4><br><a href="../view/topic_new.html">Post a new topic</a></div>');
        },
    })

    // GET TOPIC COMMENTS
    $.ajax({
        type: 'post',
        url: "../controller/topic.php",
        dataType: 'json',
        data: {
            action: 'topic-comments',
            data: id_topic,
        },
        success: function (result) {
            result['datas'].forEach(data => {
                // ADD TOPIC DATAS TO TOPIC HEADER
                $('#topic_header').append('<div class="topic-details-header">\n' +
                    '    <h2 class="topic-details-title">' + data['title'] + '</h2>\n' +
                    '    <span class="card-category">' + data['name'].toUpperCase() + '</span></br>\n' +
                    '    <span class="card-release_date">' + data['release_date'] + '</span>\n' +
                    '  </div>');
                // ADD TOPIC CONTENT
                $('#topic_content_div').append('<div class="topic-details-body">\n' +
                    '    <p class="card-text">' + data['content'] + '</p>\n' +
                    '  </div>');
            })
        },
        error: function (jqxhr) {
            // IF NO RESULTS ARE FOUND
            $('.container').append('\n' +
                '    <div class="row row-cols-auto">\n' +
                '        <div class="col-1 d-none d-md-block"></div>\n' +
                '        <div class="col margin-bottom" id="list-comment"><hr>\n' +
                '            <h5>No comment found</h5><br>' +
                '        </div>\n' +
                '        <div class="col-1 d-none d-md-block"></div>\n' +
                '    </div>');
        },
    })
});
