(function ($, _, Backbone) {



    ValidationHelper = function (validators, value) {
        this.validators = validators;
        this.itemValue = value;
    }

    ValidationHelper.prototype.validate = function () {

        for (va in this.validators) {
            if (typeof this[va] === "function") {
                if (this[va]() == false) {
                    return false;
                }
            } else {
                if(va != "message"){
                    console.log("WARN: Validator not found: " + va)
                }
            }
        }

        return true;
    }

    ValidationHelper.prototype.required = function () {
        if (typeof this.itemValue === "undefined" || this.itemValue.length == 0) {
            return false;
        }
        return true;
    }


    /* 
     * Default FromGroup Bootstrap
     */
    var FromGrp = Backbone.View.extend({
        tagName: "div",

        initialize: function (data) {
            this.$el.addClass("form-group");
            this.formEl = $('<' + this.formTag + '>');

            this.initializeFormItem(data);

            this.data = data;


        },



        render: function () {
            //console.log("FromGrp render")

            $(this.el).html('<label for="' + this.data.key + '">' + this.data.options.label + '</label>')
            $(this.el).append(this.renderFormItem())

            return this;
        },

        getItemValue: function () {
            return $(this.formEl).val();
        },

        validateItem: function () {
            $(this.el).removeClass("has-success")
            $(this.el).removeClass("has-error")

            if (typeof this.data.options.validators === "undefined") {
                $(this.el).addClass("has-success")
                return {
                    valid: true
                }
            }

            var va = new ValidationHelper(this.data.options.validators, this.getItemValue());
            var isValid = va.validate();

            if (!isValid) {
                $(this.el).addClass("has-error")
            } else {
                $(this.el).addClass("has-success")
            }

            return {
                valid: isValid,
                message: this.data.options.validators.message
            }
        }
    });

    /**
     * Basic InputTag
     */
    var InputTag = FromGrp.extend({
        formTag: "input",

        initializeFormItem: function (data) {
            _.bindAll(this, "renderFormItem");
            //console.log("initializeInputTag")

            this.formEl.addClass("form-control")

            if (typeof data.options.type === "undefined") {
                data.options.type = "text"
            }

        },

        renderFormItem: function () {
            //console.log("renderFormItem")

            this.formEl.attr("name", this.data.key)
            this.formEl.attr("type", this.data.options.type)

            return this.formEl;
        }
    });

    /**
     * Basic TextareaTag
     */
    var TextareaTag = FromGrp.extend({
        formTag: "textarea",

        initializeFormItem: function (data) {
            _.bindAll(this, "renderFormItem");
            //console.log("initializeInputTag")

            this.formEl.addClass("form-control")


        },

        renderFormItem: function () {
            // console.log("renderFormItem")

            this.formEl.attr("name", this.data.key)
            this.formEl.attr("rows", this.data.options.rows)

            return this.formEl;
        }
    });

    /**
     * Basic ButtonTag
     */
    var ButtonTag = FromGrp.extend({
        formTag: "button",

        events: {
            "click button": "onClick"
        },

        initializeFormItem: function (render) {
            _.bindAll(this, "render", "onClick");
            //console.log("initializeInputTag")
        },

        render: function () {
            //console.log("renderFormItem")



            this.formEl.addClass("btn btn-" + this.data.options.type);
            this.formEl.attr("type", "button")
            this.formEl.text(this.data.options.label)


            $(this.el).append(this.formEl)
            return this;
        },

        onClick: function () {
            if (typeof this.data.options.event === "undefined") {
                return;
            }

            this.data.myForm.trigger(this.data.options.event, this.data.myForm)
        },

        getItemValue: function () {
            //console.log("Value: "+$(this.formEl).val())
        },

    });


    /**
     * Html Radio Group
     */
    var RadioGrp = FromGrp.extend({

        initializeFormItem: function (data) {
            _.bindAll(this, "renderFormItem");

        },

        renderFormItem: function () {
            // console.log("renderFormItem")

            $(this.el).append("<br>")

            for (var i = 0; i < this.data.options.value.length; i++) {
                var label = $("<label>");
                var input = $("<input>");

                label.addClass("radio-inline")
                input.attr("type", "radio")
                input.attr("name", this.data.key)
                input.attr("value", this.data.options.value[i].value)

                label.append(input);
                label.append(" " + this.data.options.value[i].label);
                $(this.el).append(label);
            }

            return this;
        },

        getItemValue: function () {

            var itemData = $("input[name='" + this.data.key + "']:checked", this.el).val();

            if (typeof itemData === "undefined") {
                return new Array();
            }
            return itemData
        },
    });

    /**
     * Html Checkbox Group
     */
    var CheckboxGrp = FromGrp.extend({

        initializeFormItem: function (data) {
            _.bindAll(this, "renderFormItem");

        },

        renderFormItem: function () {
            // console.log("renderFormItem")

            $(this.el).append("<br>")

            for (var i = 0; i < this.data.options.value.length; i++) {
                var label = $("<label>");
                var input = $("<input>");

                label.addClass("checkbox-inline")
                input.attr("type", "checkbox")
                input.attr("name", this.data.key)
                input.attr("value", this.data.options.value[i].value)

                label.append(input);
                label.append(" " + this.data.options.value[i].label);
                $(this.el).append(label);
            }

            return this;
        },

        getItemValue: function () {
            var dataArr = new Array();
            $("input[name='" + this.data.key + "']:checked", this.el).each(function (index) {
                dataArr.push($(this).val());
            });
            return dataArr;
        },
    });

    /**
     * Basic SelectTag
     */
    var SelectTag = FromGrp.extend({
        formTag: "select",

        initializeFormItem: function (data) {
            _.bindAll(this, "renderFormItem");
            //console.log("initializeInputTag")

            this.formEl.addClass("form-control")

        },

        renderFormItem: function () {
            //console.log("renderFormItem")

            this.formEl.attr("name", this.data.key)

            for (var i = 0; i < this.data.options.value.length; i++) {
                var selectOption = new Backbone.View({
                    tagName: "option"
                });
                selectOption.$el.val(this.data.options.value[i].value)
                selectOption.$el.text(this.data.options.value[i].label)
                this.formEl.append(selectOption.render().el)
            }


            return this.formEl;
        }


    });

    var FormView = Backbone.View.extend({
        tagName: "form",
        events: {},


        initialize: function (data) {
            _.bindAll(this, "render", "renderFormAlert",
                "buildForm",
                "validateForm");

            this.formDesc = data.formDesc;
            this.formTitle = data.formTitle;

            this.bind("send", data.sendCallback);

        },


        buildForm: function () {

            this.formItemViews = new Array();


            for (formItemKey in this.formDesc) {

                // check tag exist
                if (typeof this.formDesc[formItemKey].tag === 'undefined') {
                    this.formDesc[formItemKey].tag = "input"
                }

                switch (this.formDesc[formItemKey].tag) {
                case "input":
                    this.formItemViews.push(new InputTag({
                        key: formItemKey,
                        options: this.formDesc[formItemKey],
                        myForm: this
                    }))
                    break

                case "textarea":
                    this.formItemViews.push(new TextareaTag({
                        key: formItemKey,
                        options: this.formDesc[formItemKey],
                        myForm: this
                    }))
                    break

                case "select":
                    this.formItemViews.push(new SelectTag({
                        key: formItemKey,
                        options: this.formDesc[formItemKey],
                        myForm: this
                    }))
                    break

                case "button":
                    this.formItemViews.push(new ButtonTag({
                        key: formItemKey,
                        options: this.formDesc[formItemKey],
                        myForm: this
                    }))
                    break

                case "buttonGrp":
                    this.formItemViews.push(new ButtonGrpTag({
                        key: formItemKey,
                        options: this.formDesc[formItemKey],
                        myForm: this
                    }))
                    break

                case "radioGrp":
                    this.formItemViews.push(new RadioGrp({
                        key: formItemKey,
                        options: this.formDesc[formItemKey],
                        myForm: this
                    }))
                    break

                case "checkboxGrp":
                    this.formItemViews.push(new CheckboxGrp({
                        key: formItemKey,
                        options: this.formDesc[formItemKey],
                        myForm: this
                    }))
                    break
                }

            }
        },


        getData: function () {
            var formData = new Object();

            for (var i = 0; i < this.formItemViews.length; i++) {
                if (this.formItemViews[i].getItemValue() != null) {
                    formData[this.formItemViews[i].data.key] = this.formItemViews[i].getItemValue();
                }
            }
            return formData
        },


        validateForm: function () {

            var errMessages = new Array();
            var isValid = true;

            for (var i = 0; i < this.formItemViews.length; i++) {
                var validationItem = this.formItemViews[i].validateItem();
                if (!validationItem.valid) {
                    if (typeof validationItem.message != "undefined") {
                        errMessages.push(validationItem.message);
                    }
                    isValid = false;
                }
            }

            this.renderFormAlert(errMessages);
            return isValid;

        },



        render: function () {

            this.buildForm();

            $(this.el).html("<h2>" + this.formTitle + "</h2>")
            $(this.el).append('<div class="form-alert"></div>')

            for (var i = 0; i < this.formItemViews.length; i++) {
                $(this.el).append(this.formItemViews[i].render().el)
            }



            return this;

        },

        renderFormAlert: function (messages) {
            if (messages.length > 0) {
                $(".form-alert", this.el).html('<div class="alert alert-danger"><ul></ul></div>')

                for (var i = 0; i < messages.length; i++) {
                    $(".form-alert ul", this.el).append("<li>" + messages[i] + "</li>")
                }

            } else {
                $(".form-alert", this.el).html("");
            }
        }
    });


    Backbone.Formhelper = FormView;


})(jQuery, _, Backbone);