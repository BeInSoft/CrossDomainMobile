$(document).ready(function(e){
    console.log("Lecture de la base depuis le Cache");
    var data = localStorage.getItem("test");
    var parsedData = JSON.parse(data);

    $("#grid").kendoListView({
        dataSource: parsedData,
        template: kendo.template($("#template").html())
    });
});
