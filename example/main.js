$(function() {

	//var formDesc = [{tag: "input",  label:"Zonename",   name:"zonename",    type:"text"}]
	var formDesc = {
		inputTag: {
			label: "Username",
			value: "",
			placeholder: "Username"
		},

		inputTag2:{
			label: "Password",
			type: "password"
		},

		checkboxTag: {
			type: "checkbox",
			label: "Checkbox Bla",
			value: [
				{label: "Label 1", value:"val1"},
				{label: "Label 2", value:"val2"},
				{label: "Label 3", value:"val3"}
			]
		},

		radioTag: {
			type: "radio",
			label: "Radio",
			value: [
				{label: "Label 1", value:"val1"},
				{label: "Label 2", value:"val2"},
				{label: "Label 3", value:"val3"}
			]
		},

		textareaTag: {
			label: "Textarea",
			tag: "textarea",
			rows: 3
		},

		selectTag: {
			tag: "select",
			label: "Select",
			value: [
				{label: "Label 1", value:"val1"},
				{label: "Label 2", value:"val2"},
				{label: "Label 3", value:"val3"}
			]

		},

		buttonTag1: {
			tag: "button",
			label: "Save",
			type:"success",
			event: "test"

		},
		
		buttonTag2: {
			tag: "button",
			label: "Save",
			type:"success",
			event: "send"

		}
	}

	var x = new Backbone.Formhelper({el: "#form", formDesc:formDesc});

	x.on("send", function(form){
		console.log(form.getFormData())
	})

	x.on("test", function(form){
		console.log("test")
	})


	x.render()

	//$("#form").html(x.render().el);


});