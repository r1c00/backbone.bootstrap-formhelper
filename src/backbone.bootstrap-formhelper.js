/* Define Form 
 *
 * Input:   {tag: "input",  label:"Zonename",   name:"zonename",    type:"text"},
 * Select:  {tag: "select", label:"Type",       name:"type",        options:{MASTER:MASTER, SLAVE: SLAVE}},
 */

(function($, _, Backbone) {


    var FormView = Backbone.View.extend({
  		tagName: "div",
  		events:{
  			"click span":"clickIcon"
  		},
        initialize: function (data) {
            _.bindAll(this, 'render', "getItemId", "getFormData", "setFormData", "validateForm", "setFormItemStatus",
                            "renderForm_Input", "renderForm_FormGroup", "renderForm_Select");
           
           this.formDesc = data.formDesc;
           $(this.el).addClass("row")
           this.formName = this.makeRandomId();

        },

        makeRandomId: function(){
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < 10; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        },

        getItemId: function(itemName){
            return "form_"+this.formName+'_'+itemName;
        },


        getFormDescItem: function(key){
            for(var i=0; i<this.formDesc.length; i++){
                if(key == this.formDesc[i].name){
                    return this.formDesc[i];
                }
            }

            console.log("nicht gefunden: "+key)
            return null;
        },

        
        render: function(){  	
        	$(this.el).html('<form class="form-horizontal" role="form" id="form_'+this.formName+'">')
            
        

            for(var i=0;i<this.formDesc.length;i++){
                var inputHtml = "";
                if(this.formDesc[i].tag=="input"){
                 
                    inputHtml = this.renderForm_Input(this.formDesc[i]);
   
                }
                else if(this.formDesc[i].tag=="select"){
    
                    //inputHtml = this.renderForm_Select(this.formDesc[i].name, this.formDesc[i].label, this.formDesc[i].options);
                    inputHtml = this.renderForm_Select(this.formDesc[i]);

                }
                $("form", this.el).append(inputHtml);
            }
        	
        	return this;
        	
        },

        renderForm_FormGroup: function(itemId, itemOptions, content){
            
            var formGroup = "<div class='form-group' data-child='"+itemId+"'>"+
                                "<label for='"+itemId+"' class='col-sm-2 control-label'>"+itemOptions.label+"</label>"+
                                "<div class='col-sm-9'>"+content+"</div>"+
                                "<div class='col-sm-1'></div>"+
                            "</div>";
            return formGroup;          
        },

        renderForm_Input: function(itemOptions){
            
            var inputTag = "<input type='"+itemOptions.type+"' class='form-control' id='"+this.getItemId(itemOptions.name)+"' ";

            if(itemOptions.type == "hidden"){
                return inputTag+">";
            }

            if(itemOptions.placeholder){
                inputTag+=" placeholder='"+itemOptions.placeholder+"' ";
            }

            if(itemOptions.value){
                inputTag+=" value='"+itemOptions.value+"' ";
            }

            if(itemOptions.readOnly){
                inputTag+=" readonly ";
            }

            inputTag+=">";

            return this.renderForm_FormGroup(this.getItemId(itemOptions.name), itemOptions, inputTag);
        },

        renderForm_Select:  function(itemOptions){
            
            var select = '<select id="'+this.getItemId(itemOptions.name)+'" class="form-control">';

            console.log(itemOptions)
            
           /* for(var selectOptCount=0;selectOptCount<itemOptions.options.length;selectOptCount++){
                select+="<option value='"+itemOptions.options[selectOptCount]+"'>"+itemOptions.options[selectOptCount]+"</option>";
            }*/
             for(key in itemOptions.options){
                console.log(key)
                console.log(itemOptions.options[key])
                select+="<option value='"+key+"'>"+itemOptions.options[key]+"</option>";
             }

            return this.renderForm_FormGroup(this.getItemId(itemOptions.name), itemOptions, select);
        },



        getFormData: function(){

            var formData = new Object();

            for(var i=0;i<this.formDesc.length;i++){
                if(this.formDesc[i].name.length > 0){
                    //formData[this.formDesc[i].name] = $("#form_"+this.formName+'_'+this.formDesc[i].name).val();
                    if(this.formDesc[i].tag == "input" && this.formDesc[i].type == "checkbox"){
                        if($("#"+this.getItemId(this.formDesc[i].name)).is(':checked')){
                            formData[this.formDesc[i].name] = 1;
                        }else{
                            formData[this.formDesc[i].name] = 0;
                        }
                        
                    }else{
                        formData[this.formDesc[i].name] = $("#"+this.getItemId(this.formDesc[i].name)).val();
                    }

                    
                }

            }
            return formData;
        },

        setFormData: function(data){
           
            for(key in data){
                
                 var descItem = this.getFormDescItem(key);

                 if(descItem == null){
                    continue;
                 }

                 var myItemId = this.getItemId(key); //"form_"+this.formName+'_'+key;

                 if(descItem.tag == "input"){
                    $("#"+myItemId).val(data[key]);
                 }else if(descItem.tag == "select"){
                    $("#"+myItemId+' option[value='+data[key]+']').attr('selected', 'selected');
                 }
                
            }
        },

        validateForm: function(success, error){
            
            var errorFound = false;
            var errorMessages = new Array();

            for(var i=0;i<this.formDesc.length;i++){
                if(this.formDesc[i].validate && this.formDesc[i].name.length > 0){
                    
                    var currentValue = $("#"+this.getItemId(this.formDesc[i].name)).val();

                    if(this.formDesc[i].validate.required && currentValue.length == 0){
                        errorFound = true;
                        this.setFormItemStatus(this.getItemId(this.formDesc[i].name), "has-error")

                        if(this.formDesc[i].validate.message){
                            errorMessages.push(this.formDesc[i].validate.message);
                        }
                    }  
                }
            }

            if(errorFound){
                this.setFormMessage(errorMessages);
                error("Validation error!")

            }else{
                success();
            }
        },

        setFormItemStatus: function(itemName, status){
            $("div[data-child='"+itemName+"']").addClass(status)
        },

        setFormMessage: function(messages){

            if(messages.length == 0){
                return;
            }

            var html  = '<div class="alert alert-danger"><ul>';

            for(var i=0;i<messages.length;i++){
                html+="<li>"+messages[i]+"</li>";
            }

            html+= "</ul></div>";

            $(this.el).prepend(html);
        }
    });

  
    Backbone.BootstrapFormhelper = FormView;


})(jQuery, _, Backbone);

