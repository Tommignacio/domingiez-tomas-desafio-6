const d = document;
const socket = io.connect();

const $form = d.getElementById("form");
const $inputName = d.getElementById("title");
const $inputPrice = d.getElementById("price");
const $inputImage = d.getElementById("thumbnail");
const $renderMsg = d.getElementById("message");
const $email = d.getElementById("email");
const $textMessage = d.getElementById("text");
const $btnSend = d.getElementById("send");
const $divMsg = d.getElementById("messages");

console.log("hola");

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
        }
    });
    d.addEventListener("click", (e) => {
        if (e.target === $btnSend) {
            socket.emit("newMessage", {
                mail: $email.value,
                text: $textMessage.value,
                date: getNow(),
            });
        }
    });
});

socket.on("messages", (messages) => {
    $divMsg.innerHTML = messages.map((message) => {
        return `<div>
                    <p> ${message.mail}</p>
                    <p> ${message.text}</p>
                    <p> ${message.date}</p>
                </div>`;
    });
});

const getNow = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`;
};
