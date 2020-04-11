function checkboxValue() {
    document.getElementById("removeList").value = "";
    document.getElementsByName("checkBoxs").forEach(function (entry) {
        if (entry.checked) {
            document.getElementById("removeList").value = document.getElementById("removeList").value + entry.value + ",";
        }
    });
}