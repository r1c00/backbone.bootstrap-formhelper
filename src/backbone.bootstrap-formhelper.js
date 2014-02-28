(function($, _, Backbone) {



    var InputTag = Backbone.View.extend({
        tagName: "div",

        initialize: function (data) {
            _.bindAll(this, "render","getItemValue");
           
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
                    checkboxLabel.$el.append(" "+this.formItemData.options.value[i].label)
                    $(this.el).append( checkboxLabel.render().el )
                }

            }else{
                var formKey = this.formItemData.key;
                this.formItem.$el.attr("name",formKey)
                $(this.el).html('<label for="'+formKey+'">'+this.formItemData.options.label+'</label>')
                $(this.el).append(this.formItem.render().el)
            }
            return this;
        },

        getItemValue: function(){
            
            if(this.formItemData.options.type == "checkbox"){
                var values = new Array();
                $( "input[name='"+this.formItemData.key+"']:checked", this.el).each(function(index, obj) {
                    values.push($(obj).val())
                });

                
                return {key: this.formItemData.key, value: values}
            }else if(this.formItemData.options.type == "radio"){
                var val =  $( "input[name='"+this.formItemData.key+"']:checked", this.el).val();

                if( typeof val === "undefined"){
                    return {key: this.formItemData.key, value:  "" }
                }
                return  {key: this.formItemData.key, value:  $( "input[name='"+this.formItemData.key+"']:checked", this.el).val() }
            }else{
                return  {key: this.formItemData.key, value: this.formItem.$el.val()}
            }
        }
    });

    var TextareaTag = Backbone.View.extend({
        tagName: "div",

        events:{
        },


        initialize: function (data) {
            _.bindAll(this, "render", "getItemValue");
           
           this.$el.addClass("form-group");

           this.formItemData = data;

           this.formItem = new Backbone.View({tagName: "textarea"});
           this.formItem.$el.addClass("form-control");

        },

        render: function(){
            var formKey = this.formItemData.key;
            this.formItem.$el.attr("name",formKey)
            this.formItem.$el.attr("rows",this.formItemData.options.rows)
            $(this.el).html('<label for="'+formKey+'">'+this.formItemData.options.label+'</label>')
            $(this.el).append(this.formItem.render().el)
            return this;
        }, 

        getItemValue: function(){
            return  {key: this.formItemData.key, value: this.formItem.$el.val()}
        }
    });

    var SelectTag = Backbone.View.extend({
        tagName: "div",

        initialize: function (data) {
            _.bindAll(this, "render", "getItemValue");
           
           this.$el.addClass("form-group");

           this.formItemData = data;


        },

        render: function(){
            var formKey = this.formItemData.key;
            $(this.el).html('<label for="'+formKey+'">'+this.formItemData.options.label+'</label><br>')

            this.selectTag =  new Backbone.View({tagName: "select"});
            this.selectTag.$el.addClass("form-control")

            for(var i=0;i<this.formItemData.options.value.length;i++){
                var selectOption = new Backbone.View({tagName: "option"});
                selectOption.$el.val(this.formItemData.options.value[i].value)
                selectOption.$el.text(this.formItemData.options.value[i].label)
                this.selectTag.$el.append( selectOption.render().el )
            }

            $(this.el).append(this.selectTag.render().el)

            return this;
        }, 

        getItemValue: function(){
            return  {key: this.formItemData.key, value: this.selectTag.$el.val()}
        }
    });


    var ButtonTag = Backbone.View.extend({
        tagName: "div",

        events:{
            "click button": "onClick"
        },

        initialize: function (data) {
            _.bindAll(this, "render", "onClick");
           
            this.$el.addClass("form-group");

            this.formItemData = data;


            if(typeof this.formItemData.options.type   === 'undefined'){
                this.formItemData.options.type = "default"
            }

            this.formItem = new Backbone.View({tagName: "button"});
            this.formItem.$el.addClass("btn btn-"+this.formItemData.options.type);
            this.formItem.$el.attr("type", "button")
            this.formItem.$el.text(this.formItemData.options.label)

           

        },

        render: function(){
            var formKey = this.formItemData.key;
            this.formItem.$el.attr("name",formKey)
            
            $(this.el).append(this.formItem.render().el)

            return this;
        },

        onClick: function(){
            if(typeof this.formItemData.options.event === "undefined"){
                return;
            }

            this.formItemData.myForm.trigger(this.formItemData.options.event, this.formItemData.myForm)
        },
        getItemValue: function(){
            return  null;
        }
    });


    var ButtonGrpTag = Backbone.View.extend({
        tagName: "div",

        events:{
            "click button": "onClick"
        },

        initialize: function (data) {
            _.bindAll(this, "render","onClick");
        
           this.$el.addClass("form-group");
           this.formItemData = data;   


        },

        onClick: function(){
            console.log(this.formItemData)
            alert("Button Click")
        },

        render: function(){
            var formKey = this.formItemData.key;
        
            for(var i=0;i<this.formItemData.options.buttons.length;i++){
                var btn = new Backbone.View({tagName: "button"});
                console.log(this.formItemData.options.buttons[i])
                if(typeof this.formItemData.options.buttons[i].type  === 'undefined'){
                    this.formItemData.options.buttons[i].type = "default"
                }

                btn.$el.addClass("btn btn-"+this.formItemData.options.buttons[i].type);
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
  		},


        initialize: function (data) {
            _.bindAll(this, "render", 
                            "buildForm");
           
           this.formDesc = data.formDesc;

           this.bind( "send", data.sendCallback);
    
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
                        this.formItemViews.push(new InputTag({key: formItemKey, options: this.formDesc[formItemKey], myForm: this}))
                    break

                    case "textarea":
                        this.formItemViews.push(new TextareaTag({key: formItemKey, options: this.formDesc[formItemKey], myForm: this}))
                    break

                    case "select":
                        this.formItemViews.push(new SelectTag({key: formItemKey, options: this.formDesc[formItemKey], myForm: this}))
                    break

                    case "button":
                        this.formItemViews.push(new ButtonTag({key: formItemKey, options: this.formDesc[formItemKey], myForm: this}))
                    break

                    case "buttonGrp":
                        this.formItemViews.push(new ButtonGrpTag({key: formItemKey, options: this.formDesc[formItemKey], myForm: this}))
                    break
                }

                //console.log(formItemKey)
                //console.log(typeof this.formDesc[formItemKey].tag)
            }
        },


        getFormData: function(){
            var formData = new Object();

            for(var i=0;i<this.formItemViews.length;i++){
                if(this.formItemViews[i].getItemValue() != null){
                    formData[this.formItemViews[i].getItemValue().key] = this.formItemViews[i].getItemValue().value;
                }
            }
            return formData
        },

        
        render: function(){  	
          
            this.buildForm();

            for(var i=0;i<this.formItemViews.length;i++){
                $(this.el).append(this.formItemViews[i].render().el)
            }

   
        	
        	return this;
        	
        }
    });

  
    Backbone.Formhelper = FormView;


})(jQuery, _, Backbone);

