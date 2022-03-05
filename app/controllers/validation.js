function Validation() {
    this.checkEmpty = function(input, divId, mess) {
        if(input.trim() === ""){
            getEle(divId).innerHTML = mess
            getEle(divId).className = "text-danger"
            return false
        } else {
            getEle(divId).innerHTML = ""
            getEle(divId).className = ""
            return true
        }
    }
}