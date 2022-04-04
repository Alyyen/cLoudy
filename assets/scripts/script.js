// GET AS JSON FILE THE DATAS

function getFormData($form) {
    let unindexed_array = $form.serializeArray();
    let indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

// SEND NEW POST DATAS TO DATABASE
$(function () {
    $("#new-post-form").submit(function (event) {

        event.preventDefault();
        let form = $(this);

        console.log({
            action: "new-post",
            data: getFormData(form),
        });

        
        $.ajax({
            url: "../controller/topic.php",
            type: "post",
            dataType: 'json',
            data: {
                action: "new-post",
                data: getFormData(form),
            },
            success: function (result) {
                console.log('===== SUCCESS =====');
            },
            error: function (jqxhr) {
                console.log('===== ERROR =====');
                console.log(jqxhr.responseText);
            },
        });
        
    });
});