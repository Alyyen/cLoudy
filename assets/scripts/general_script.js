$(function () {
    $(".btn-reset").click(function (event) {
        event.preventDefault();
        $("#new-comment-content-id").val('');
        $("#new-post-content-id").val('');
    })
})