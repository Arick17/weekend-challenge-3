console.log('client.js is sources');

$(document).ready(function () {
    console.log('jQuery has been loaded');

    getList();
    $('#viewToDo').on('click', addButton)
    $('#viewToDo').on('click', '.deleteButton', removeListItem);
    $('#viewToDo').on('click', '.deleteButton', removeListItem);
    $(".completeButton").click(function(){
        $(this).css("background-color", "green");
    });

    $( '#addButton' ).on( 'click', function(){
        console.log( 'in addButton on click' );
        // get user input and put in an object
        // NOT WORKING YET :(
        // using a test object
        var objectToSend = {
          task: $('toDoIn').val(),
          notes: $('notesIn').val(),
        };
        // call saveKoala with the new obejct
        addNewShoe( objectToSend );//------------------------------needs to change??
      }); //end addButton on click
    }); // end doc ready

    //////------------------------------------------------------------------

    function addNewShoe() {
        // get the values for the new shoes from the DOM using jQuery
        var newTask = $('#toDoIn').val();
        var newNotes = $('#notesIn').val();
    
        // Send the new shoe to the server
        // will be caught by .get('/shoes', function(req, res){ ... });
        $.ajax({
            method: 'POST',
            url: '/list',
            data: {
                task: newTask,
                notes: newNotes
            },
            success: function (response) {
                console.log('response', response);
                getList();
            }
        });
    }/////-----------------------------------------------------------
    
    function getList(){
        console.log( 'in getList' );
        // ajax call to server to get List
        $.ajax({
          url: '/list',
          type: 'GET',
          success: function( response ){
            $('#viewToDo').empty();
            console.log( 'got some todos: ', response );
            for(var i=0; i < response.length; i++){
            var list = response[i]
            var $newListItem = $('<tr><td>' + list.task + '</td>' + '<td>' + list.notes + '</td></tr>');

            var $taskCompleteButton = $('<button class="completeButton">Complete</button>')
            $taskCompleteButton.data('id', list.id);
            $newListItem.append($taskCompleteButton);

            var $deleteListItemButton = $('<button class="deleteButton">Delete</button>')
            $deleteListItemButton.data('id', list.id);
            $newListItem.append($deleteListItemButton);
            $('#viewToDo').append($newListItem);
            }
          } // end success
        }); //end ajax
        // display on DOM with buttons that allow edit of each
      } // end getList

    //   function saveList( newListItem ){
    //     console.log( 'in saveList', newListItem );
    //     // ajax call to server to get koalas
    //     $.ajax({
    //       url: '/list',
    //       type: 'POST',
    //       data: newListItem,
    //       success: function( response ){
    //         console.log( 'got some listItems: ', response );
    //         getList();
    //       } // end success
    //     }); //end ajax
    //   }

      function removeListItem(){
        var listItemIdToRemove = $(this).data().id;
        $.ajax({
        method: 'DELETE',
        url: '/list/' + listItemIdToRemove,
        sucess: function(response){
            getList();
        }
      });
      }