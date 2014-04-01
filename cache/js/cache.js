

$(document).ready(function(e){
    console.log("Lecture de la base depuis le Cache");
    var data = localStorage.getItem("test");
    var parsedData = JSON.parse(data);

    $("#grid").kendoListView({
        dataSource: [{"id":1,"value":"Note 1"},{"id":2,"value":"Note 2"},{"id":3,"value":"Note 3"}],
        template: kendo.template($("#template").html())
    });

    //On passe par le Cross Document Messaging pour mettre à jour les données
    window.onmessage = function(event){
        console.log(event.origin+" - "+event.data);
    };

});
