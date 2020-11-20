var number = 0;
          function text001(){
            //とりあえず<div id="create_js">の中にHelloのテキストが入った<div>を生成するやつ
            number++;
            if(number >= 2){
              //document.getElementById("num_div").parentNode.removeChild(document.getElementById("num_div"));
              document.getElementById("create_js").removeChild(document.getElementById("num_div"));
            }
            
            var cre = document.createElement("div");
            cre.id = "num_div";
            var str = document.createTextNode(number);
            cre.appendChild(str);
            document.getElementById("create_js").appendChild(cre);
            //ここまで

            //これは<div id="create_js">の中にhelloというテキストを挟み込むだけ
            //document.getElementById("create_js").append(document.createTextNode("hello"));
            //ここまで
          }
          function ajax_db(){
                var db_json = JSON.stringify({"select_db":$('#select_db_id').val()});
                $.ajax({
                  type: 'POST',
                    url: '/ajax_db',
                    data: db_json,
                    contentType: 'application/json',
                    success:
                        function (data){
                            console.log(data);
                            $('#select_table_id').children().remove();
                            var arr = data;
                            if(arr.length<1){
                                let op0 = document.createElement("option");
                                op0.value = ("#");//←.tablesはjsonのキーでこれによりそのvalueが召喚。
                                op0.text = ("テーブルなし");
                                op0.hidden = 1;
                                document.getElementById("select_table_id").append(op0);
                            }else{
                                let op1 = document.createElement("option");
                                op1.value = arr[0].tables;//←.tablesはjsonのキーでこれによりそのvalueが召喚。
                                op1.text = ("テーブルを選択");
                                op1.hidden = 1;
                                document.getElementById("select_table_id").append(op1);
                            }
                            for(var i=0;i<arr.length;i++){
                                let op = document.createElement("option");
                                op.value = arr[i].tables;//←.tablesはjsonのキーでこれによりそのvalueが召喚。
                                op.text = arr[i].tables;
                                document.getElementById("select_table_id").append(op);
                            }
                        }
                })
            }
          function ajax_table(){
            var table_json = JSON.stringify({"select_db":$('#select_db_id').val(),"select_table":$('#select_table_id').val()});
            $.ajax({
                  type: 'POST',
                    url: '/ajax_table',
                    data: table_json,
                    contentType: 'application/json',
                    success:
                    function (data){
                          console.log(data);
                            $('#check_column_id').children().remove();
                            var arr1 = data;

                            var AllCheckLabel = document.createElement("label");
                            /*全選択option*/
                            AllCheckLabel.className = 'label_ui';
                            AllCheckLabel.setAttribute("for", "check_id_0");
                            document.getElementById("check_column_id").appendChild(AllCheckLabel);
                            let inp000 = document.createElement("input");
                            inp000.type = 'checkbox';
                            inp000.name = 'allchecked_box';
                            inp000.id = 'check_id_0';
                            inp000.className = 'checks';
                            inp000.value = '*';
                            inp000.setAttribute('onclick', 'AllChecked()');//←イベントハンドラ追加できたよ！[2020/09/17]
                            AllCheckLabel.appendChild(inp000);
                            AllCheckLabel.innerHTML = AllCheckLabel.innerHTML + "全選択" + "<br>";

                            for(var i=0;i<arr1.length;i++){
                                var labelNode = document.createElement("label");
                                labelNode.className  = 'label_ui';
                                labelNode.setAttribute("for", "check_id_" + (i + 1));
                                document.getElementById("check_column_id").appendChild(labelNode);

                                let inp001 = document.createElement("input");
                                inp001.type = 'checkbox';
                                inp001.name = 'check_001';
                                inp001.id = 'check_id_' + (i + 1);
                                inp001.className = 'checks';
                                inp001.value = arr1[i].columns;
                                labelNode.appendChild(inp001);
                                labelNode.innerHTML = labelNode.innerHTML + arr1[i].columns;
                            }
                            /*labelNode.innerHTML = labelNode.innerHTML + "<br>";*///[2020/09/17]
                            labelNode.innerHTML = labelNode.innerHTML;  
                        }
                })
            }
          function AllChecked(){
            var all = document.getElementById('form_001').allchecked_box.checked;
            for (var i=0; i<document.getElementById('form_001').check_001.length; i++){
                document.getElementById('form_001').check_001[i].checked = all;
            }
          }
          function CheckedCounter(){
            const el = document.getElementsByClassName("checks");
              var count = 0;
              for(var i=0; i<el.length; i++){
                if(el[i].checked　== true){
                  count++;
                }
              }
              if(document.getElementById("checked_count").hasChildNodes()){
                document.getElementById("checked_count").removeChild(document.getElementById("count_div"));
              }else{
                console.log("not_checked")
              }
              var cre = document.createElement("div");
              cre.id = "count_div";
              var str = document.createTextNode(count);
              cre.appendChild(str);
              document.getElementById("checked_count").appendChild(cre);
          }
          function table_gen(){
            const el_table = document.getElementsByClassName("checks");
            var count_table = 0;
            var checked_values = [];
            for(var i=0; i<el_table.length; i++){
              if(el_table[i].checked == true){
                console.log(el_table[i].value);//チェックされたcheckboxのvalueを表示(2020-11-18)
                checked_values.push(el_table[i].value);
                count_table++;
              }
            }
            if(count_table == 0){
              console.log("ここでは空の<table>を生成")
            }else{
              console.log("ここでAjaxでデータベースにデータ要求、受け取ったjsonから<table>を生成");
              //ここにcheckが入ってる値の配列を用意しておくfor文を記述
              console.log("これがchecksリスト"+checked_values);
              var json_value = JSON.stringify({"select_db":$('#select_db_id').val(),"select_table":$('#select_table_id').val(),"check_001":checked_values});
              console.log(json_value);
            }
          }