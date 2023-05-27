//const API_URL = "http://localhost:8080/picture";
const API_URL = "https://camcheckerserver.onrender.com/picture";
const img = document.createElement('img');
let pulseBubble;

document.addEventListener('DOMContentLoaded', async function () {
    document.getElementById("guider2Area").appendChild(img);
    img.onload = function () {
        console.log("pic loaded")
        const datetime = getExifTime(img);
        document.getElementById('datetime').innerHTML = datetime;
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
}

// imgにHTMLのimg要素を指定，撮影日時を返す
const getExifTime = (img) => {
    EXIF.getData(img, function () {
        const datetime = EXIF.getTag(this, "DateTimeOriginal");
        console.log(datetime)
        return datetime;
    });
};