$(function() {
    // GET/READ
    $('#get-button').on('click', function() {
        $.ajax({
            url: '/notes',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.notes.forEach(function(note) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + note.id + '</td>\
                            <td><input type="text" class="name" value="' + note.note + '"></td>\
                            <td>\
                                <button class="update-button">UPDATE/PUT</button>\
                                <button class="delete-button">DELETE</button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
        });
    });
    $.ajax({
        url: '/notes',
        contentType: 'application/json',
        success: function(response) {
            var tbodyEl = $('tbody');

            tbodyEl.html('');

            response.notes.forEach(function(note) {
                tbodyEl.append('\
                    <tr>\
                        <td class="id">' + note.id + '</td>\
                        <td><input type="text" class="name" value="' + note.note + '"></td>\
                        <td>\
                            <button class="update-button">UPDATE/PUT</button>\
                            <button class="delete-button">DELETE</button>\
                        </td>\
                    </tr>\
                ');
            });
        }
    });

    // CREATE/POST
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        var createInput = $('#create-input');

        $.ajax({
            url: '/notes',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: createInput.val() }),
            success: function(response) {
                console.log(response);
                createInput.val('');
                $('#get-button').click();

            }
        });
    });

    // UPDATE/PUT
    $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var note1 = rowEl.find('.name').val();

        $.ajax({
            url: '/notes/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ note:note1  }),
            success: function(response) {
                console.log(response);
                $('#get-button').click();

            }
        });
    });

    // DELETE
    $('table').on('click', '.delete-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();

        $.ajax({
            url: '/notes/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });
});
