var pff= {"origin":"http://192.168.0.12:8080"};

pff.initStorage = function(){
    window.localStorage.setItem("test", '[{"id":1,"value":"Note 1"},{"id":2,"value":"Note 2"},{"id":3,"value":"Note 3"}]');
    $(document).trigger("dbIsReadyEvent");
}

pff.initModel = function(){
    var data = localStorage.getItem("test");
    var parsedData = JSON.parse(data);

    $("#list").kendoGrid({
        dataSource: parsedData,
        filterable:true,
        sortable:true,
        pageable:true,
        editable:'popup',
        toolbar: ['create','save']
    });



    console.log("Model is initialize");
    $(document).trigger("modelIsReadyEvent");
};
/*
pff.initStorage = function(){
    var Note = $data.define("Note",{
        id : { type: "int", key: true, computed: true  },
        value : String
    });


    var SolisDB = $data.EntityContext.extend("SolisDB", {
        Notes      : { type: $data.EntitySet, elementType: Note }
    });

    pff.solisDB = new SolisDB({name : 'webSql', databaseName : 'SolisPOC', dbCreation: $data.storageProviders.DbCreationType.DropAllExistingTables});


    //Quelques données de test
    pff.solisDB.onReady(function(){

        var notes = [{'id':1,'value':'Note 1'},{'id':2,'value':'Note 2'},{'id':3,'value':'Note 3'}];
        for(var i=0;i<notes.length;i++){
            pff.solisDB.Notes.add(notes[i]);
        }
        pff.solisDB.saveChanges(function(){
            console.log("Données initialisées dans le LocalStorage")
            $(document).trigger("dbIsReadyEvent");
        })
    });
};
*/

pff.displayDetails = function(e){
    console.log("Display Details");
    //$("#detailsContent")[0].src=pff.origin+"/forms/form.html";
    $("#detailsContent")[0].src="http://localhost:63342/CrossDomainMobileApp/cache/form.html";
    pff.app.navigate("#detailsView")
};


pff.cacheLoader = function(e){
    $("#detailsContent")[0].src=pff.origin+"/forms/form.html";
}

pff.postMessage = function(e){
    $("#detailsContent")[0].contentWindow.postMessage('{"msg":"Hello World"}',"http://localhost:63342");
}


$(document).ready(function(e){
    $(document).bind('dbIsReadyEvent', function(e){
        pff.initModel();
    });

    $(document).bind('modelIsReadyEvent', function(e){
        kendo.culture('fr');
        pff.app = new kendo.mobile.Application($(document.body),
            {transition: "zoom", initial: "#mainView" , skin: "flat"});
    });

    pff.initStorage();

});