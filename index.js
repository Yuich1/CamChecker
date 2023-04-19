//const API_URL = "http://localhost:8080/picture";
const API_URL = "https://camcheckerserver.onrender.com/picture";
const img = document.createElement('img');

document.addEventListener('DOMContentLoaded', async function () {
    document.body.appendChild(img);
    img.onload = function () {
        console.log("pic loaded")
        const datetime = getExifTime(img);
        document.getElementById('datetime').innerHTML = datetime;
    }
    callAPI();

});

const callAPI = async () => {
    const param = {
        method: "GET",
        'Content-Type': 'image/jpeg',
    };
    fetch(API_URL + "/", param)
        .then(response => response.blob())
        .then(blob => {
            const objectURL = URL.createObjectURL(blob);
            img.src = objectURL;
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