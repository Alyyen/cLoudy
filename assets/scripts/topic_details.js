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
            $results_number = Object.keys(result['datas']).length;
            switch ($results_number) {
                case 1:
                    $('#topic-comment-list').append('<hr><h5>' + $results_number + '&nbsp;comment</h5>');
                    break;
                default :
                    $('#topic-comment-list').append('<hr><h5>' + $results_number + '&nbsp;comments</h5>');
                    break;
            }
            result['datas'].forEach(data => {
                // ADD TOPIC DATAS TO TOPIC HEADER
                $('#topic-comment-list').append('<hr><div class="topic-comment">\n' +
                    '    <span class="topic-comment-content">' + data['content'] + '</span></br>\n' +
                    '    <span class="card-release_date">' + data['release_date'] + '</span>\n' +
                    '  </div>');
            })
        },
        error: function (jqxhr) {
            // IF NO RESULTS ARE FOUND
            $('#topic-comment-list').append('\n' +
                '        <div class="col-1 d-none d-md-block"></div>\n' +
                '        <div class="col margin-bottom" id="list-comment"><hr>\n' +
                '            <h5>No comment found</h5><br>' +
                '        </div>\n' +
                '        <div class="col-1 d-none d-md-block"></div>\n');
        },
    })

    // ---------------------------------------------------------------------------------------------------------------------
    // GET AS JSON FILE THE DATAS
    function getFormData($form) {
        let unindexed_array = $form.serializeArray();
        let indexed_array = {};

        $.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });

        return indexed_array;
    }

    // SEND NEW COMMENT DATAS TO DATABASE
    $("#new-comment-form").submit(function (event) {

        // ERROR IF NO TITLE OR CONTENT WRITTEN
        $("#error_new_comment_content").empty();
        event.preventDefault();

        if ($("#new-comment-content-id").val() == "") {
            $("#error_new_comment_content").append("<span class='text-danger'>Please enter a content for your comment.</span>");
        } else {
            // POST DATAS WHEN NO EMPTY INPUTS
            let form = $(this);

            // POST A COMMENT
            $.ajax({
                type: 'post',
                url: "../controller/topic.php",
                dataType: 'json',
                data: {
                    action: 'topic-new-comment',
                    id_topic: id_topic,
                    data: getFormData(form)
                },
                error: function (jqxhr) {
                    // IF COMMENT CANNOT BE SENT
                    console.log(jqxhr.responseText);
                },
            })
        }
    });
})
;
