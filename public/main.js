const d = document;
const socket = io();
console.log(socket);

const $form = d.getElementById("form");
const $inputName = d.getElementById("title");
const $inputPrice = d.getElementById("price");
const $inputImage = d.getElementById("thumbnail");
const $renderMsg = d.getElementById("message");
const $tableProducts = d.getElementById(`tableProducts`);
const $pEmpty = d.getElementById(`pEmpty`);

d.addEventListener("DOMContentLoaded", (e) => {
    d.addEventListener("submit", (e) => {
        if (e.target === $form) {
            if ($inputName.value === "" || $inputPrice.value === "") {
                e.preventDefault();
                let msgError;
                if ($inputName.value === "") msgError = "Falta un nombre";
                if ($inputPrice.value === "") msgError = "Falta un precio";
                return ($renderMsg.innerText = msgError);
            }
            $renderMsg.innerText = "success";
            socket.on("products", (products) => {
                if (products.length > 0) {
                    return ($tableProducts.innerHTML = products.map((product) => {
                        `  
                        <td> ${product.title}</td>
                        <td> ${product.price}</td>
                        <td> ${product.thumbnail}</td>
                    `;
                    })).join("");
                } else {
                    $pEmpty.innerText = `<p style="color: violet">Ingrese un produco por favor</p>`

                }
            });

        }
    });
});


