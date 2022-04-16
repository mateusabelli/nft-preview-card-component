const image = document.querySelector(".image");
const title = document.querySelector(".title");
const description = document.querySelector(".description");
const price = document.querySelector(".price").lastElementChild;
const expiration = document.querySelector(".expiration").lastElementChild;
const avatar = document.querySelector(".avatar");
const author = document.querySelector(".author");
const prevBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");
const indicator = document.querySelectorAll(".indicator");

let slidePos = 0;

fetch("https://nft-mock-api.herokuapp.com/results")
  .then((response) => response.json())
  .then((data) => {
    setData(data, slidePos);

    prevBtn.addEventListener("click", () => {
      if (slidePos > 0) slidePos -= 1;
      setData(data, slidePos);
    });

    nextBtn.addEventListener("click", () => {
      if (slidePos < data.length - 1) slidePos += 1;
      setData(data, slidePos);
    });
  });

async function setData(data, slidePos) {
  image.src = await data[slidePos].preview;
  title.innerText = await `${data[slidePos].title} #${data[slidePos].id}`;
  description.innerText = await data[slidePos].description;
  price.innerText =  await `${data[slidePos].price} ETH`;
  expiration.innerText = await data[slidePos].expiration;
  avatar.src = await data[slidePos].avatar;
  author.innerText = await data[slidePos].author;

  indicator.forEach(function (item) {
    item.classList.remove("active");
  });
  indicator[slidePos].classList.add("active");
}

