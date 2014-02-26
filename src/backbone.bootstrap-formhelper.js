(function($, _, Backbone) {



    var InputTag = Backbone.View.extend({
        tagName: "div",

        initialize: function (data) {
            _.bindAll(this, "render");
           
           this.$el.addClass("form-group");

           this.formItemData = data;

           this.formItem = new Backbone.View({tagName: "input"});
           this.formItem.$el.addClass("form-control");

           if(typeof this.formItemData.options.type === "undefined"){
                this.formItemData.options.type = "text"
           }
        },

        render: function(){
           
            if(typeof this.formItemData.options.value != "undefined"){
                this.formItem.$el.attr("value",this.formItemData.options.value)
            }

            if(typeof this.formItemData.options.placeholder != "undefined"){
                this.formItem.$el.attr("placeholder",this.formItemData.options.placeholder)
            }

            this.formItem.$el.attr("type",this.formItemData.options.type);

            // class for checkboxes 
            if(this.formItemData.options.type == "checkbox" || this.formItemData.options.type == "radio"){


                this.formItem.$el.removeClass("form-control")

                if(this.formItemData.options.label){
                    $(this.el).html('<label for="'+formKey+'">'+this.formItemData.options.label+'</label><br>')
                }

                for(var i=0;i<this.formItemData.options.value.length;i++){
                    var checkboxLabel = new Backbone.View({tagName: "label"});
                    var checkbox = new Backbone.View({tagName: "input"});

                    checkboxLabel.$el.addClass("checkbox-inline");

                    checkbox.$el.attr("type", this.formItemData.options.type);
                    checkbox.$el.attr("value",this.formItemData.options.value[i].value);
                    checkbox.$el.attr("name",this.formItemData.key);

                    checkboxLabel.$el.append(checkbox.render().el);
                    checkboxLabel.$el.append(this.formItemData.options.value[i].label)
                    $(this.el).append( checkboxLabel.render().el )
                }

            }else{
                var formKey = this.formItemData.key;
                this.formItem.$el.attr("name",formKey)
                $(this.el).html('<label for="'+formKey+'">'+this.formItemData.options.label+'</label>')
                $(this.el).append(this.formItem.render().el)
            }
            return this;
        }
    });

    var TextareaTag = Backbone.View.extend({
        tagName: "div",

        events:{
        },


        initialize: function (data) {
            _.bindAll(this, "render");
           
           this.$el.addClass("form-group");

           this.formItemData = data;

           this.formItem = new Backbone.View({tagName: "textarea"});
           this.formItem.$el.addClass("form-control");

        },

        render: function(){
            var formKey = this.formItemData.key;
            this.formItem.$el.attr("name",formKey)
            $(this.el).html('<label for="'+formKey+'">'+this.formItemData.options.label+'</label>')
            $(this.el).append(this.formItem.render().el)
            return this;
        }
    });

    var SelectTag = Backbone.View.extend({
        tagName: "div",

        initialize: function (data) {
            _.bindAll(this, "render");
           
           this.$el.addClass("form-group");

           this.formItemData = data;

           this.formItem = new Backbone.View({tagName: "textarea"});
           this.formItem.$el.addClass("form-control");

        },

        render: function(){
            var formKey = this.formItemData.key;
            this.formItem.$el.attr("name",formKey)
            $(this.el).html('<label for="'+formKey+'">'+this.formItemData.options.label+'</label><br>')

            var selectTag =  new Backbone.View({tagName: "select"});
            selectTag.$el.addClass("form-control")

            for(var i=0;i<this.formItemData.options.value.length;i++){
                var selectOption = new Backbone.View({tagName: "option"});
                selectOption.$el.val(this.formItemData.options.value[i].value)
                selectOption.$el.text(this.formItemData.options.value[i].label)
                selectTag.$el.append( selectOption.render().el )
            }

            $(this.el).append(selectTag.render().el)

            return this;
        }
    });


    var ButtonTag = Backbone.View.extend({
        tagName: "div",

        initialize: function (data) {
            _.bindAll(this, "render");
           
           this.$el.addClass("form-group");

           this.formItemData = data;

           this.formItem = new Backbone.View({tagName: "button"});
           this.formItem.$el.addClass("btn btn-default");
           this.formItem.$el.attr("type", "button")
           this.formItem.$el.text(this.formItemData.options.label)

        },

        render: function(){
            var formKey = this.formItemData.key;
            this.formItem.$el.attr("name",formKey)
            
            $(this.el).append(this.formItem.render().el)

            return this;
        }
    });


    var ButtonGrpTag = Backbone.View.extend({
        tagName: "div",

        initialize: function (data) {
            _.bindAll(this, "render");
        
           this.$el.addClass("form-group");
           this.formItemData = data;          
        },

        render: function(){
            var formKey = this.formItemData.key;
        
            for(var i=0;i<this.formItemData.options.buttons.length;i++){
                var btn = new Backbone.View({tagName: "button"});
                btn.$el.addClass("btn btn-default");
                btn.$el.attr("type", "button")
                btn.$el.text(this.formItemData.options.buttons[i].label)
                 $(this.el).append(btn.render().el)
            }
        
            return this;
        }
    });


    var FormView = Backbone.View.extend({
  		tagName: "form",
  		events:{
  			"click span":"clickIcon"
  		},


        initialize: function (data) {
            _.bindAll(this, "render", 
                            "buildForm");
           
           this.formDesc = data.formDesc;
    
        },


        buildForm: function(){

            this.formItemViews = new Array();


            for(formItemKey in this.formDesc){

                // check tag exist
                if(typeof this.formDesc[formItemKey].tag  === 'undefined'){
                    this.formDesc[formItemKey].tag = "input"
                }

                switch(this.formDesc[formItemKey].tag){
                    case "input":
                        this.formItemViews.push(new InputTag({key: formItemKey, options: this.formDesc[formItemKey]}))
                    break

                    case "textarea":
                        this.formItemViews.push(new TextareaTag({key: formItemKey, options: this.formDesc[formItemKey]}))
                    break

                    case "select":
                        this.formItemViews.push(new SelectTag({key: formItemKey, options: this.formDesc[formItemKey]}))
                    break

                    case "button":
                        this.formItemViews.push(new ButtonTag({key: formItemKey, options: this.formDesc[formItemKey]}))
                    break

                    case "buttonGrp":
                        this.formItemViews.push(new ButtonGrpTag({key: formItemKey, options: this.formDesc[formItemKey]}))
                    break
                }

                console.log(formItemKey)
                console.log(typeof this.formDesc[formItemKey].tag)
            }
        },

        /*
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
*/
        
        render: function(){  	
            //$(this.el).html('<form class="form-horizontal" role="form" id="form_'+this.formName+'">')
            this.buildForm();

            for(var i=0;i<this.formItemViews.length;i++){
                $(this.el).append(this.formItemViews[i].render().el)
            }

        /*    for(var i=0;i<this.formDesc.length;i++){
                var inputHtml = "";
                if(this.formDesc[i].tag=="input"){
                 
                    inputHtml = this.renderForm_Input(this.formDesc[i]);
   
                }
                else if(this.formDesc[i].tag=="select"){
    
                    //inputHtml = this.renderForm_Select(this.formDesc[i].name, this.formDesc[i].label, this.formDesc[i].options);
                    inputHtml = this.renderForm_Select(this.formDesc[i]);

                }
                $(this.el).append(inputHtml);
                $(this.el).attr("role", "form")

            }*/
        	
        	return this;
        	
        },
/*
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
            
            for(var selectOptCount=0;selectOptCount<itemOptions.options.length;selectOptCount++){
                select+="<option value='"+itemOptions.options[selectOptCount]+"'>"+itemOptions.options[selectOptCount]+"</option>";
            }
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
        }*/
    });

  
    Backbone.Formhelper = FormView;


})(jQuery, _, Backbone);

