let lookupUtils = {

};
lookupUtils.transformData = function(listItem, lookUpArr, codeKey, textKey){
	if(!lookUpArr) return;
	lookUpArr.forEach((value) => {
		if(listItem[codeKey] == value.code) {
			listItem[textKey] = value.value;
		}
	});
};
export default lookupUtils;