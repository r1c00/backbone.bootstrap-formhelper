$(function() {

	//var formDesc = [{tag: "input",  label:"Zonename",   name:"zonename",    type:"text"}]
	var formDesc = {
		username: {
			label: "Username",
			value: "",
			placeholder: "Username",
			validators:{
				required:true,
				message: "Username must be set!"
			}
		},

		password:{
			label: "Password",
			type: "password",
			validators:{
				required:true,
				message: "Password must be set!"
			}
		},

		checkboxTag: {
			tag: "checkboxGrp",
			label: "Checkbox Bla",
			value: [
				{label: "Label 1", value:"val1"},
				{label: "Label 2", value:"val2"},
				{label: "Label 3", value:"val3"}
			],
			validators:{
				required:true,
				message: "checkboxTag must be set!"
			}
		},

		radioTag: {
			tag:"radioGrp",
			label: "Radio",
			value: [
				{label: "Label 1", value:"val1"},
				{label: "Label 2", value:"val2"},
				{label: "Label 3", value:"val3"}
			],
			validators:{
				required:true,
				message: "radioTag must be set!"
			}
		},

		textareaTag: {
			label: "Textarea",
			tag: "textarea",
			rows: 5,
			validators:{
				required:true,
				message: "textareaTag must be set!"
			}
		},

		selectTag: {
			tag: "select",
			label: "Select",
			value: [
				{label: "", value:""},
				{label: "Label 1", value:"val1"},
				{label: "Label 2", value:"val2"},
				{label: "Label 3", value:"val3"}
			],
			validators:{
				required:true,
				message: "selectTag must be set!"
			}

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


	var loginForm =  {
		username:{
			label: "Username",
			validators:{
				required:true,
				message: "The user must be given."
			}
		},

		password:{
			label: "Password",
			type: "password",
			validators:{
				required:true,
				message: "The password must be given."
			}
		},

		btnSave: {
			tag: "button",
			label: "Login",
			type:"success",
			event: "send"

		}
	}

	var x = new Backbone.Formhelper({formTitle: "Login", el: "#form", formDesc:loginForm});

	x.on("send", function(form){
//		console.log(form.validateForm());

		if(form.validateForm()){
			alert("form vaild")
			console.log(form.getData());
		}
		
	})

	x.on("test", function(form){
		console.log("test")
	})


	x.render()

	//$("#form").html(x.render().el);


});