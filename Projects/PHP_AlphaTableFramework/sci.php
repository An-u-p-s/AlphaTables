<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script type="text/javascript">
          //  var json={"row1":"row1",null, "row3":"row1", "row4":"row1"};
          //  document.write("JSON : "+json);
          
     
            /* JSON Data */  
                var jsonData={};                    
                document.write("JSON : "+JSON.stringify(jsonData)+"<br/>");
            
            /* Adding DataMenu */   
                jsonData.jsonMenu=[];       
                document.write("JSON : "+JSON.stringify(jsonData)+"<br/>");
            
            /* Adding Data into 'jsonMenu' */
                var menuData1={"data1":"data1", "data2":"data2"};
                jsonData.jsonMenu.push(menuData1);                   
                document.write("JSON : "+JSON.stringify(jsonData)+"<br/>");
            
                 var menuData2={"data1":"data1", "data2":"data2"};
                jsonData.jsonMenu.push(menuData2);                   
                document.write("JSON : "+JSON.stringify(jsonData)+"<br/>");
                
            /* Adding Item of Data in 'jsonMenu' */
                 jsonData.jsonMenu[0].data3="ASDF";
                document.write("JSON : "+JSON.stringify(jsonData)+"<br/>");
            
            /* Editing Item of Data in 'jsonMenu' */
                jsonData.jsonMenu[0].data1='QWERT';
                document.write("JSON : "+JSON.stringify(jsonData)+"<br/>");
               
            /* Deleting Item of Data in 'jsonMenu' */
                 delete jsonData.jsonMenu[0].data1;
                 document.write("JSON : "+JSON.stringify(jsonData)+"<br/>");
                
            /* Deleting Data in 'jsonMenu' */
                jsonData.jsonMenu.splice(0,1);  // From At position 0, remove 1
                document.write("JSON : "+JSON.stringify(jsonData)+"<br/>");
                
            /* Deleting 'jsonMenu' */
                delete jsonData.jsonMenu;
                document.write("JSON : "+JSON.stringify(jsonData)+"<br/>");
        
        </script>
    </head>
    <body>
        <?php
        // put your code here
        ?>
    </body>
</html>
