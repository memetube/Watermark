var file,
  image_input,
  url,
  meme_image,
  canvas,
  logo,
  square_logo,
  download_button,
  file_name,
  category,
  watermark_text = null;

document.addEventListener("DOMContentLoaded", () => {
  image_input = document.getElementById("image_input");
  image_input.addEventListener("input", add_watermark);
  canvas = document.querySelector("canvas");
  logo = document.getElementById("logo");
  download_button = document.getElementById("download_button");
  download_button.onclick = download;
  category_div = document.querySelector("#category")
  category_div.querySelectorAll('button').forEach(element => {
    element.addEventListener('click', () => {
      category = element.id
    })
  });
});

function add_watermark() {
  if (category == null) {
    alert("Please Select a Category")
    return
  }
  if (category == "memetube") {
    square_logo = document.getElementById("square_logo")
    watermark_text = '@memetube'
  }
  else {
    square_logo = document.getElementById("adult_square_logo")
    watermark_text = '@memetubeadult.co'
  }
  var file = image_input.files[0];
  file_name = image_input.files[0].name;
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    url = e.target.result;
    meme_image = document.getElementById("meme_image");
    meme_image.src = url;
    logo.height = 100;
    meme_image.onload = () => {
      canvas.height = meme_image.height + 85;
      canvas.width = meme_image.width + 40;
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "yellow";
      ctx.fillRect(0, 0, canvas.width, 65);
      ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
      ctx.fillRect(0, 0, 20, canvas.height);
      ctx.fillRect(canvas.width - 20, 0, 20, canvas.height);
      ctx.drawImage(logo, canvas.width - logo.width, 0);
      ctx.drawImage(meme_image, 20, 65);
      square_logo.style.filter = "blur:10"
      ctx.drawImage(square_logo, canvas.width - 100, canvas.height - 100);
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.fillText(watermark_text, 10, 50);
      canvas.style.display = "block";
      download_button.style.display = "block";
    };
  };
}

function download() {
  var url = canvas.toDataURL();
  var dowload_link = document.createElement("a");
  dowload_link.href = url;
  dowload_link.download = file_name;
  dowload_link.click();
}
