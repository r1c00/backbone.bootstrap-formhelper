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

		buttonTag: {
			tag: "buttonGrp",
			buttons:[
				{label: "asd"},
				{label: "asdasdasd"}
			]
		},
		buttonTag2: {
			tag: "button",
			label: "Save"
		}
	}

	var x = new Backbone.Formhelper({el: "#form", formDesc:formDesc});

	x.render()

	//$("#form").html(x.render().el);


});