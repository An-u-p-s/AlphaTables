<!DOCTYPE html>
<!--
Alpha-Tables Framework : 
-->
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!--link rel="stylesheet" href="styles/bootstrap.min.css"-->
        <script src="javascript/jquery.min.js"></script>
        <!--script src="javascript/bootstrap.min.js"></script-->
        <title></title>
        <script type="text/javascript" src="atable.js"></script>
        
        <link rel="stylesheet" href="alphatable.css"/>
        <script type="text/javascript">
            function pageOnload()
            {  
               var tablepropJSON={"View":{"ColumnHeader":[{ "ColumnName":"Column1",
                                                             "ColumnView":"Column1" },
                                                           { "ColumnName": "Column2",
                                                             "ColumnView":"Column2" },
                                                           { "ColumnName":"Column3",
                                                             "ColumnView":"Column3"},
                                                           { "ColumnName":"Column4",
                                                             "ColumnView":"Column4"},
                                                           { "ColumnName":"Column5",
                                                             "ColumnView":"Column5"},
                                                           { "ColumnName":"Column6",
                                                             "ColumnView":"Column6"}],
                                           "ColumnData":  [{"Column1":"1",
                                                            "Column2":"Natural Resources Management",
                                                            "Column3":"Pre Test",
                                                            "Column4":"00:10:59",
                                                            "Column5":"6",
                                                            "Column6":"6"},
                                                           {"Column1":"6",
                                                            "Column2":"Natural Resources Management",
                                                            "Column3":"Assessment",
                                                            "Column4":"00:11:59",
                                                            "Column5":"8",
                                                            "Column6":"6"},
                                                           {"Column1":"11",
                                                            "Column2":"Natural Resources Management",
                                                            "Column3":"Post Test",
                                                            "Column4":"00:10:59",
                                                            "Column5":"8",
                                                            "Column6":"6"}]
                                          },
                                      
                                  "Add" : {"popupHeading":"Add Table Data in Popup",
                                           "popupSubmitBttn":"Table Data Submit",
                                           "SubmitURL":"sci.php"}, 
                                    
                                  "Edit" :{"popupHeading":"Edit Table Data in popup",
                                           "popupSubmitBttn":"Edit Data Submit",
                                           "SubmitURL":""}, 
                                     
                                  "Delete":[]};
                              
                //    tableDataDivision(tablepropJSON);          
                      initializetable('tableDisplay', 'JSON',tablepropJSON);  // initialization, creates a table         
            }
            
        </script>
        <style>
            
            .form-control
            {
                display: block;
                width: 100%;
                height: 34px;
                padding: 6px 12px;
                font-size: 14px;
                line-height: 1.42857143;
                color: #555;
                background-color: #fff;
                background-image: none;
                border: 1px solid #ccc;
                border-radius: 4px;
                -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
                box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
                -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
                -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
                transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
            }
            .btn{
                display: inline-block;
                padding: 6px 12px;
                margin-bottom: 0;
                font-size: 14px;
                font-weight: 400;
                line-height: 1.42857143;
                text-align: center;
                white-space: nowrap;
                vertical-align: middle;
                -ms-touch-action: manipulation;
                touch-action: manipulation;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                background-image: none;
                border: 1px solid transparent;
                border-radius: 4px;
            }
            .btn-warning {
                color: #fff;
                background-color: #000;
                border-color: #000;
              }
        </style>
        <script type="text/javascript">
        
        </script>
    </head>
    <body onload="pageOnload()">
        
        <div class="col-xs-12" style="width:100%;margin-bottom:1%;float:left;">
            <div id="tableDisplay"></div>
        </div>
        <div class="col-xs-12" style="width:100%;margin-bottom:3%;float:left;">
            <input type="button" onclick="addFilter()" value="Column Filter" class="btn btn-warning"/>
            <input type="button" onclick="addAlphaTableData()" value="Add Table Data" class="btn btn-warning"/>
            <input type="button" onclick="refreshData()" value="Table Refresh" class="btn btn-warning"/>
        </div>
    </body>
</html>
