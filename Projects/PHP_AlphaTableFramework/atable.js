/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global Variable Declarations */
var g_divId;       // Division Id where Table is going to be inserted
var g_dataType;    // Type of Input where user is providing
var g_tableId;     // tableId

/* Table-Input- JSON */
var g_tablepropJSON;  // JSON Input From the User
var g_view_columnheader;  // user input - column header JSON
var g_view_columndata;    // user input - column data JSON

/* Adding Rows Functionality */
var g_add_pophead;
var g_add_popsubmitBtn;
var g_add_submitURL;

/* Editing Rows Functionality */
var g_edit_index;   // index of column data JSON
var g_edit_pophead;
var g_edit_popsubmitBtn;
var g_edit_submitURL;
var g_edit_json={};  // Non-Edited Row Data 
var g_edited_json={};   // Edited Row Data

/* Other Neccessary Functionality */
var g_columnNames=[];  // list of columns
var g_edit_columnValues=[];
var g_distinct_columnValues=[];    // list of column values in Each Distinct Column Value get as columnValues[columnNames.length]
 
var g_addfilter;  // If false, Filter doesn't exist, if true, filter exists


function UUIDGenerator()
/* FUNCTION : It generates an UUID Code */
{ 
    var ascii=[48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122];  // [ASCILL:48-57] Numbers : [0-9]      [ASCILL:65-90] CapitalAlpha : A-Z    [ASCILL: 97-122] SmallAlpha : a-z
    var uuid_part='';
          for(var index=0;index<8;index++) { uuid_part+=String.fromCharCode(ascii[Math.floor(Math.random() * ascii.length)]); }  uuid_part+='-';
          for(var index=0;index<4;index++) { uuid_part+=String.fromCharCode(ascii[Math.floor(Math.random() * ascii.length)]); }  uuid_part+='-';
          for(var index=0;index<12;index++) { uuid_part+=String.fromCharCode(ascii[Math.floor(Math.random() * ascii.length)]); }
    return uuid_part;
}


function alphaPopupOpen()
{
    document.getElementById("alphatable-popupfront").style.display='block';
    document.getElementById("alphatable-popbackground").style.display='block';
}


function alphaPopupClose()
{
    document.getElementById("alphatable-popupfront").style.display='none';
    document.getElementById("alphatable-popbackground").style.display='none';
}


function loadAlphatable(divId)
/* FUNCTION : It creates a dynamic table */
{
   g_tableId="table-"+UUIDGenerator();
   var divElement=document.getElementById(divId);
   var popElement=document.createElement("div");
       popElement.setAttribute("id","tablePopup");
   var tabElement=document.createElement("table");
      tabElement.setAttribute("id",g_tableId);
   divElement.appendChild(popElement); 
   divElement.appendChild(tabElement); 

   /* Hidden Popup-Content */
   var popcontent='<div id="alphatable-popbackground"></div>';
       popcontent+='<div id="alphatable-popupfront">';
       popcontent+='<a href="#" onclick="javascript:alphaPopupClose();">';
       popcontent+='<img id="alphatable-popclose" src="images/button.png"/>';
       popcontent+='</a>';
       popcontent+='<div id="alphatable-popupcontent">';
       popcontent+='</div>';
       popcontent+='</div>';
       popcontent+='</div>';
   document.getElementById("tablePopup").innerHTML=popcontent;
}

function initializetable(divId, datatype, tablepropJSON)
/* FUNCTION : The First Function that creates the table */
{
    g_addfilter=false;
    if(datatype==='JSON'){
        g_divId=divId;
        g_tablepropJSON=tablepropJSON;
        g_dataType=datatype;
        tableDataDivision();
    }
    
    
    /* columns */    console.log("ColumnNames : ");  for(var columnInd=0;columnInd<g_view_columnheader.length;columnInd++) { console.log(g_view_columnheader[columnInd]); }
    /* columnData */ console.log("ColumnData : ");   for(var columnDataInd=0;columnDataInd<g_view_columndata.length;columnDataInd++) { console.log(g_view_columndata[columnDataInd]); }

    var colwidth=100/g_view_columnheader.length;
    
    loadAlphatable(divId); // creates an id for table
    
    var table = document.getElementById(g_tableId); // get the table by its Identity
    table.setAttribute("class","alphatable");       // setting css from the class

    /* Create an header to the table*/
    var header = table.createTHead();
    var top_row = header.insertRow(0); 
        top_row.setAttribute("class","alphatable-row-header");
        top_row.setAttribute("align","center");

    for(var colIndex=0;colIndex<g_view_columnheader.length;colIndex++) {
        g_columnNames[colIndex]=g_view_columnheader[colIndex].ColumnName;
        g_distinct_columnValues[colIndex]=[];
        
       top_row.insertCell(colIndex).innerHTML=g_view_columnheader[colIndex].ColumnView;
    
    }
  
  // Last Row - Edit and Delete
  top_row.insertCell(g_view_columnheader.length).innerHTML="";
  
  
   /* Set Distinct Column Values */
   setInitialDistinctFilterColValues();

   /* Adding and viewing Column-Data */
   loadAllTableData();
  
}

function setInitialDistinctFilterColValues()
{
    console.log("setInitialDistinctFilterColValues : "+JSON.stringify(g_view_columndata));
     for(var colheaderInd=0;colheaderInd<g_columnNames.length;colheaderInd++) {
        for(var coldataInd=0;coldataInd<g_view_columndata.length;coldataInd++) {
            var arrValRecognizer=false;
            for(var colArray=0;colArray<g_distinct_columnValues[colheaderInd].length;colArray++) {
                if(g_view_columndata[coldataInd][g_columnNames[colheaderInd]]===g_distinct_columnValues[colheaderInd][colArray]) {
                    arrValRecognizer=true;
                }
            }
            
            if(!arrValRecognizer) {
                g_distinct_columnValues[colheaderInd][g_distinct_columnValues[colheaderInd].length]=g_view_columndata[coldataInd][g_columnNames[colheaderInd]];
            }  
        }
    }
}

var filter_json=[]; /* Format : filter_json=[{"columnIndex":"", "columnval":""}];*/
var filter_data=[];
 
 function EditclickOnIcon(coldata, rowData)
 {
     g_edit_index=coldata;
     /* var table_sno;
            console.log("g_addfilter : "+g_addfilter);
            if(g_addfilter===undefined || g_addfilter===false) {
                table_sno=coldata+1;
            }
            else
            {
                table_sno=coldata+2;
            }
     console.log("Edit-Column Index : "+table_sno); */
     g_edit_columnValues=rowData.split(",");
     tablepopup('Edit');
 }
 
function loadAllTableData()
{
    var table = document.getElementById(g_tableId); // get the table by its Identity
     var rowIndex=initialRowIndex();
  
    for(var coldata=0;coldata<g_view_columndata.length;coldata++)
    {
        var rowData=[];
         var data_row = table.insertRow(rowIndex); 
            data_row.setAttribute("id","alphatable-col");
            if(coldata%2==0) {
                 data_row.setAttribute("class","alphatable-row-col alphatable-row-even");
            }
           else {  data_row.setAttribute("class","alphatable-row-col alphatable-row-odd");}
            data_row.setAttribute("align","center");
           
          for(var cellIndex=0;cellIndex<g_columnNames.length;cellIndex++) {
                var columnData=g_view_columndata[coldata][g_columnNames[cellIndex]];
                data_row.insertCell(cellIndex).innerHTML=columnData;
                rowData[cellIndex]=columnData;
                g_edit_json[g_columnNames[cellIndex]]=columnData;
            }
            
           
            
             var action_row=data_row.insertCell(g_columnNames.length);
        
             var actionContent='<img id="alphatable-delete" src="images/edit.png" onclick="EditclickOnIcon('+coldata+',\''+rowData+'\');"/>';
                 actionContent+='<img id="alphatable-delete" src="images/delete.png" onclick="deleteTableSubmit('+coldata+')"/>';
             action_row.innerHTML=actionContent;
             
            // g_edit_json=rowData;
          
        rowIndex++;    
    }
}



function addFilter()
/* FUNCTION : It hides and displays Filter on alternative click respectively */
{
    if(g_addfilter===undefined || g_addfilter===false) {
     
     filter_json=[];  // Making filter requests Empty
     
    var filter_row = document.getElementById(g_tableId).createTHead().insertRow(1); 
        filter_row.setAttribute("id","alphatable-filter");
        filter_row.setAttribute("class","alphatable-row-filter");
        
    // Filtering     
     for(var colIndex=0;colIndex<g_view_columnheader.length;colIndex++) {
        var filterContent='<select id="table-col-label-filter-'+colIndex+'" class="form-control" onchange="viewColfilter(this.value,'+colIndex+');">';
            filterContent+='</select>';
            filter_row.insertCell(colIndex).innerHTML=filterContent;
            } 
    
     // Create Options to Filter Select Option
     for(var colheaderInd=0;colheaderInd<g_columnNames.length;colheaderInd++) {
   // console.log("column["+colheaderInd+"] : "+g_distinct_columnValues[colheaderInd]);

     var selcolumn=document.getElementById("table-col-label-filter-"+colheaderInd);
     var p_option = document.createElement("option");
	 p_option.id = "";
         p_option.text = "Select a "+g_columnNames[colheaderInd];
         p_option.value = "";
	selcolumn.add(p_option);
        
        for(var colValueIndex=0;colValueIndex<g_distinct_columnValues[colheaderInd].length;colValueIndex++) {
             var p_option = document.createElement("option");
                p_option.id = "";
                p_option.text = g_distinct_columnValues[colheaderInd][colValueIndex];
                p_option.value = g_distinct_columnValues[colheaderInd][colValueIndex];
               selcolumn.add(p_option);
        }
     }
     
      var final_row=filter_row.insertCell(g_columnNames.length);
            final_row.setAttribute("style","background-color:#000;");
             var actionContent='';
             final_row.innerHTML=actionContent;
       g_addfilter=true;
    }
    else
    {
        document.getElementById(g_tableId).deleteRow(1);
        g_addfilter=false;
    }
}

function viewColfilter(columnval, colIndex) 
/* FUNCTION : It functions at Column Filter. It filters the data based on Selected Column and Column Data */
{
    filter_data=[];  // Refreshing Data
    
    deleteTableData();
      
  // If colIndex already exists, update columnval or else add new 
  // Adding New Filter Columns if colIndex doesn't exist
  var filterpara=false;
            for(var ind=0;ind<filter_json.length;ind++) {
               if(filter_json[ind].columnIndex===colIndex) {
                   filterpara=true; 
                   if(columnval==='') { // delete
                      // delete filter_json[ind];
                        filter_json.splice(ind,1); // At position ind in filter, Remove 1
                   }
                   else  {
                      filter_json[ind].columnval=columnval; // update existing value 
                   }
                   
               }
           }
  
           if(!filterpara){ // add new value
               var filterMenu={"columnIndex":colIndex, "columnval":columnval};
                filter_json.push(filterMenu); 
           }
           
              console.log("Filter : "+JSON.stringify(filter_json));
     
   
         
   // console.log("ColHeader : "+JSON.stringify(g_view_columnheader));
   // console.log("ColData : "+JSON.stringify(g_view_columndata));
  //  console.log("ColFiltering : "+JSON.stringify(filter_json));
    
  //  console.log("ColHeader : "+JSON.stringify(g_columnNames));
  //  console.log("ColHeader : "+JSON.stringify(g_distinct_columnValues));
      
      var filter_colName=[];
      var filter_colValue=[];
      
       for(var dataIndex=0;dataIndex<g_view_columndata.length;dataIndex++) {
           var match=[];
           var index=0;
          for(var filterIndex=0;filterIndex<filter_json.length;filterIndex++) {
          
             filter_colName[filterIndex]=g_columnNames[filter_json[filterIndex].columnIndex];
             filter_colValue[filterIndex]=filter_json[filterIndex].columnval;
         
                    if(g_view_columndata[dataIndex][filter_colName[filterIndex]]===filter_colValue[filterIndex]) {
                        match[index]=true;
                    }
                    else {
                        match[index]=false;
                    }
                     index++;     
                }
                
                console.log("match : "+match);
                var matchRecognizer=true;
                for(var matchIndex=0;matchIndex<match.length;matchIndex++)
                {
                    if(match[matchIndex]===false)  {
                        matchRecognizer=false;
                    }
                    
                }
               // console.log("Match : "+match);
                if(matchRecognizer)
                {
                    var rowBuilder={};
                   // for(var dataInd=0;dataInd<g_view_columndata.length;dataInd++) {
                        for(var headInd=0;headInd<g_view_columnheader.length;headInd++) {
                            
                            rowBuilder[g_columnNames[headInd]]=g_view_columndata[dataIndex][g_columnNames[headInd]];
                        
                 
                   }
                //    console.log("Col : "+JSON.stringify(rowBuilder));
                  filter_data.push(rowBuilder);
                }
              //  console.log(g_view_columndata[dataIndex][filter_colName[filterIndex]] +"  : "+match);
           }
          
            console.log("Filter : "+JSON.stringify(filter_data));
    
     
      
      // Insert Table Rows
      // filter_data
       var table = document.getElementById(g_tableId);
       var rowIndex; 
     console.log("g_addfilter : "+g_addfilter);
      if(g_addfilter===undefined || g_addfilter===false) { rowIndex=1; }
      else { rowIndex=2; }
   
    
      for(var filterIndex=0;filterIndex<filter_data.length;filterIndex++) {
          var filter_rowData=[];
          var tableRow = table.insertRow(rowIndex);
            tableRow.setAttribute("id","alphatable-col");
            if(filterIndex%2==0) {
                 tableRow.setAttribute("class","alphatable-row-col alphatable-row-even");
            }
           else {  tableRow.setAttribute("class","alphatable-row-col alphatable-row-odd");}
            tableRow.setAttribute("align","center");
            
          for(var colNameIndex=0;colNameIndex<g_columnNames.length;colNameIndex++) {
              var cell=tableRow.insertCell(colNameIndex);
              var filterData=filter_data[filterIndex][g_columnNames[colNameIndex]];
              cell.innerHTML=filterData;
              filter_rowData[colNameIndex]=filterData;
              g_edit_json[g_columnNames[colNameIndex]]=filterData;
          }
          rowIndex++;
          
           var filter_action_row=tableRow.insertCell(g_columnNames.length);
        
            var actionContent='<img id="alphatable-delete" src="images/edit.png" onclick="EditclickOnIcon('+filterIndex+',\''+filter_rowData+'\');"/>';
                 actionContent+='<img id="alphatable-delete" src="images/delete.png" onclick="deleteTableSubmit('+filterIndex+')"/>';
             filter_action_row.innerHTML=actionContent;
             
          //    g_edit_json=filter_rowData;
      }
      
      /* Adding last Action Column */
       
            
            
             
}

function initialRowIndex()
{
     var rowIndex; 
     console.log("g_addfilter : "+g_addfilter);
      if(g_addfilter===undefined || g_addfilter===false) { rowIndex=1; }
      else { rowIndex=2; }
    return rowIndex;
}

function deleteTableData()
{
     /* Deleting Columns : */
     var rowIndex=initialRowIndex();
   
      console.log("rowIndex : "+rowIndex);
   
      // Delete Table Rows 
      // Row-0 : Column Listing  Row-1 : Filter Listing
      // If Filter is open, delete from Row-2,  If filter not open, delete from Row-1
      var table = document.getElementById(g_tableId);
      console.log("Table SIZE : "+table.rows.length);
      for(var tabIndex=(table.rows.length-1);tabIndex>=rowIndex;tabIndex--) {
           console.log("DELETED ROWS : "+tabIndex);
          table.deleteRow(tabIndex);
      } 
}

function refreshData()
/* FUNCTION : It is used to refresh the table data */
{
   /* Delete */
   if(g_addfilter===true) {
   document.getElementById(g_tableId).deleteRow(1);
   g_addfilter=false;
   }
      deleteTableData();
      loadAllTableData();
}

function addAlphaTableData()
{
    operate='Add';
    tablepopup(operate);
}

function tablepopup(operate)
{
    alphaPopupOpen();
    console.log(g_columnNames.length);
    //
    var popupcontent=document.getElementById("alphatable-popupcontent");
    var content='';
       
       if(operate==='Add'){
           content+='<div align="center" id="alphatable-crudheader">'+g_add_pophead.toUpperCase()+'</div>';
       } else {
           content+='<div align="center" id="alphatable-crudheader">'+g_edit_pophead.toUpperCase()+'</div>'; 
       }
        
        content+='<hr/>';
        content+='<div class="alphatable-crudDiv">';
        
        for(var colIndex=0;colIndex<g_columnNames.length;colIndex++)
        {
            content+='<div class="alphatable-crudlabel">';
            content+=g_columnNames[colIndex];
            content+='</div>';
            content+='<div class="alphatable-crudInput">';
            if(operate==='Add'){
            content+='<input type="text" id="alphatable-col-'+g_columnNames[colIndex]+'" class="alphatable-inputform-control"/>';
        } else {
            content+='<input type="text" id="alphatable-col-'+g_columnNames[colIndex]+'" class="alphatable-inputform-control" value="'+g_edit_columnValues[colIndex]+'"/>';
        }
           // g_edit_columnValues
            
            content+='</div>';
        }
        
        content+='</div>';
        if(operate==='Add'){
             content+='<input type="button" class="btn btn-warning" value="'+g_add_popsubmitBtn+'" style="margin-left:46%;"  onclick="addTableSubmit()">';
          } else {
              content+='<input type="button" class="btn btn-warning" value="'+g_edit_popsubmitBtn+'" style="margin-left:46%;"  onclick="editTableSubmit()">';
          }
        content+='</div>';
        popupcontent.innerHTML=content;
    
}

function tableDataDivision()
/* FUNCTION : This */
{
    g_view_columnheader=g_tablepropJSON.View.ColumnHeader; 
    g_view_columndata=g_tablepropJSON.View.ColumnData;
    g_add_pophead=g_tablepropJSON.Add.popupHeading;
    g_add_popsubmitBtn=g_tablepropJSON.Add.popupSubmitBttn;
    g_add_submitURL=g_tablepropJSON.Add.SubmitURL;
    
    g_edit_pophead=g_tablepropJSON.Edit.popupHeading;
    g_edit_popsubmitBtn=g_tablepropJSON.Edit.popupSubmitBttn;
    g_edit_submitURL=g_tablepropJSON.Edit.SubmitURL;
            
}

function addTableSubmit()
{
    var addData={};
    for(var colIndex=0;colIndex<g_columnNames.length;colIndex++) {
            addData[g_columnNames[colIndex]]=document.getElementById("alphatable-col-"+g_columnNames[colIndex]).value;
        }

    g_view_columndata.push(addData);
   
    // Add into BackEnd
    var response;
    $.ajax({type: "GET", async: false, url: g_add_submitURL, data: addData,
            success: function(resp) { response=resp; }
           });
   // console.log(response);
    
   document.getElementById("tableDisplay").innerHTML='';
   initializetable(g_divId, g_dataType, g_tablepropJSON);
}

function editTableSubmit()
{
    var editData={};
    for(var colIndex=0;colIndex<g_columnNames.length;colIndex++) {
           var columnValue=document.getElementById("alphatable-col-"+g_columnNames[colIndex]).value
            editData[g_columnNames[colIndex]]=columnValue;   // Edit for Backend 
            g_view_columndata[g_edit_index][g_columnNames[colIndex]]=columnValue;  // Edit into Table
            g_edited_json[g_columnNames[colIndex]]=columnValue;   // Setting updated Table Row value
            // Check it already exist or else add it to Filter
            
        }
        console.log("g_tablepropJSON : "+JSON.stringify(g_tablepropJSON));
        console.log("g_edit_json : "+JSON.stringify(g_edit_json));
        console.log("g_edited_json : "+JSON.stringify(g_edited_json));
   
    // Add into BackEnd
    var response;
    $.ajax({type: "GET", async: false, url: g_edit_submitURL, data: editData,
            success: function(resp) { response=resp; }
           });
   // console.log(response);
   document.getElementById("tableDisplay").innerHTML='';
   initializetable(g_divId, g_dataType, g_tablepropJSON);
}


function deleteTableSubmit(coldata)
{
    console.log(coldata);
    g_view_columndata.splice(coldata,1);
    
    deleteTableData();
    loadAllTableData();
    
   document.getElementById("tableDisplay").innerHTML='';
   initializetable(g_divId, g_dataType, g_tablepropJSON);
}