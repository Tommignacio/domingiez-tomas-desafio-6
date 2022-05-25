const $form = document.getElementById("form")
const $inputName = document.getElementById("title")
const $inputPrice = document.getElementById("price")
const $inputImage = document.getElementById("thumbnail")
const $renderMsg = document.getElementById("message")
$form.addEventListener("submit", (e) => {
    if ($inputName.value === "" || $inputPrice.value === "") {
        e.preventDefault();
        let msgError;
        if ($inputName.value === "") msgError = "Falta un nombre";
        if ($inputPrice.value === "") msgError = "Falta un precio";
        return $renderMsg.innerText = msgError
    }
    $renderMsg.innerText = "success"

})