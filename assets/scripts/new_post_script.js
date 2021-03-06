// GET AS JSON FILE THE DATAS
function getFormData($form) {
    let unindexed_array = $form.serializeArray();
    let indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

$(function () {

    // SEND NEW POST DATAS TO DATABASE
    $("#new-post-form").submit(function (event) {
        // ERROR IF NO TITLE OR CONTENT WRITTEN
        $("#error_new_post_title").empty();
        $("#error_new_post_content").empty();
        event.preventDefault();
        if ($("#new-post-content-id").val() == "" || $("#new-post-title-id").val() == "") {
            if ($("#new-post-content-id").val() == "") {
                $("#error_new_post_content").append("<span class='text-danger'>Please enter a content for your post.</span>");
            }
            if ($("#new-post-title-id").val() == "") {
                $("#error_new_post_title").append("<span class='text-danger'>Please enter a title for your post.</span>");
            }
        } else if ($("#new-post-content-id").val().length > 2500 || $("#new-post-title-id").val().length > 100) {
            if ($("#new-post-content-id").val().length > 2500) {
                $("#error_new_post_content").append("<span class='text-danger'>Your content contains " + $("#new-post-content-id").val().length + " caracters, it must contain under 2500 caracters.</span>");
            }
            if ($("#new-post-title-id").val().length > 100) {
                $("#error_new_post_title").append("<span class='text-danger'>Your title contains " + $("#new-post-title-id").val().length + " caracters, it must contain under 100 caracters.</span>");
            }
        }
        else {
            // POST DATAS WHEN NO EMPTY INPUTS
            let form = $(this);

            $.ajax({
                url: "../controller/topic.php",
                type: "post",
                dataType: 'json',
                data: {
                    action: "new-post",
                    data: getFormData(form),
                },
                error: function (jqxhr) {
                    console.log(jqxhr.responseText);
                },
            });
        }
    });
});