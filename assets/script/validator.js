/*

	File Name: Validator.js
	Author: Ramanan Kalirajan
	Purpose: to do the validations in the form field

*/

var validatorAr = [{"key":"alphabet","test":"^[a-zA-Z]+$"},{"key":"alphanumeric","test":"^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"},{"key":"alphanumericspecial","test":"^[ A-Za-z0-9_@./#&+-]*$"},{"key":"alphanumericunder","test":"^[a-zA-Z0-9-_]+$"}];

var validateForm = function(formObj){
	let formElms = formObj.getElementsByTagName("input");
	var resFlag = true;	
	for(let xx=0;xx<formElms.length;xx++){
		//console.log(formElms[xx].type);
		//if(formElms[xx].type=="text"){
		try{	
			for(let yy=0;yy<validatorAr.length;yy++){
				if(validatorAr[yy].key==formElms[xx].getAttribute("data-type")){
					let pattern = new RegExp(validatorAr[yy].test);
					if(pattern.test(formElms[xx].value)){
						resFlag = true;
						break;
					}else{
						resFlag = false;
						let spanObj = document.createElement("span");
						spanObj.className="errorCls";
						spanObj.innerHTML = "^ "+validatorAr[yy].key+" rule is not followed";
						formElms[xx].parentNode.appendChild(spanObj);
						break;
					}
 				}
			}
		//}
		}catch(e){
			resFlag = false;
		}
		if(resFlag == false){
			setTimeout(function(){
				removeErrorElm(formObj);
			},10000);
			break;
		}
	}
	
	return resFlag;
}


var removeErrorElm = function(targetObj){
	let spanAr = targetObj.getElementsByTagName("span");
	var  count =0;
	while(count<spanAr.length){
		try{
			if(spanAr[count].className=="errorCls" || spanAr[count].class=="errorCls"){
				spanAr[count].parentNode.removeChild(spanAr[count]);
			}else{
				count++;
			}
		}catch(e){
			count++;
		}
	}
}
