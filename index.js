//const API_URL = "http://localhost:8080/picture";
const API_URL = "https://camcheckerserver.onrender.com/picture";
const img = document.createElement('img');
let pulseBubble;

document.addEventListener('DOMContentLoaded', async function () {
    document.getElementById("guider2Area").appendChild(img);
    img.onload = function () {
        console.log("pic loaded")
    }
    callAPI();

});

const callAPI = async () => {
    //$(".pulse-container").css("opacity", "1");
    if (pulseBubble) {
        document.getElementById("guider2Area").appendChild(pulseBubble);
    }
    const param = {
        method: "GET",
        'Content-Type': 'image/jpeg',
    };
    fetch(API_URL + "/", param)
        .then(response => response.blob())
        .then(blob => {
            const objectURL = URL.createObjectURL(blob);
            img.src = objectURL;
        })
        .then(() => {
            //$(".pulse-container").css("opacity", "0");
            const guider2Area = document.getElementById("guider2Area");
            pulseBubble = guider2Area.removeChild(guider2Area.firstElementChild);
        });
    const paramTime = {
        method: "GET"
    }
    fetch(API_URL + "/time", paramTime)
        .then(response => response.body.getReader())
        .then(reader => {
            return reader.read().then(({ done, value }) => {
                const decoded = new TextDecoder("utf-8").decode(value);
                const date = new Date(decoded);
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const hour = date.getHours();
                const minute = date.getMinutes();
                const datetime = `${month}月${day}日 ${hour}時${minute}分`;
                document.getElementById('datetime').innerHTML = `撮影日時：${datetime}`;
            }
            )
        })
        .catch(err => {
            console.log(err);
        }
        );
}