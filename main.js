window.onload = () => {
  inputValidation();
};
let search_Btn = document.querySelector(".search-icon");
let lang_opt = document.querySelectorAll(".opt");
let choose = document.querySelector(".choose");
let theme_toggle = document.querySelector(".theme-circle");
let parent_Elem = document.querySelector(".sec__wrap");

// function for toggling between fonts
function toggleFonts() {
  const switchingFonts = (e) => {
    let optLang = e.target.innerText;
    choose.textContent = optLang;
    switch (optLang) {
      case "Serif":
        document.body.style.fontFamily = `'PT Serif', serif`;
        break;

      case "Sans-serif":
        document.body.style.fontFamily = "sans-serif";
        break;

      case "Monospace":
        document.body.style.fontFamily = "monospace";
    }
  };
  lang_opt.forEach((item) => {
    item.addEventListener("click", switchingFonts);
  });
}

// function for dark\light mode
function themeToggle() {
  const theme = () => {
    theme_toggle.classList.toggle("move");
    theme_toggle.parentElement.classList.toggle("bg-color");
    document.body.classList.toggle("dark");
  };
  theme_toggle.addEventListener("click", theme);
}
let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const getData = () => {
  let inputText = document.querySelector(".input-text").value;
  if(inputText !== ''){
    fetch(`${url}${inputText}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        parent_Elem.innerHTML = `<section class="word__info">
      <div class="word-text">
          <h1 class="word white">${inputText}</h1>
          <h2 class="word-phonetic">/${data[0].phonetic || data[1].phonetic}/</h2>
      </div>
      <div class="word-audio" onclick="play()">
      <i class="fa-solid fa-volume-high"></i>
      </div>
  </section> 
  <section class="word__disc__noun">
              <div class="subheading__noun">
                  <h3 class="noun white">noun</h3>
                  <div class="divider"></div>
              </div>
              <h3 class="word__meaning">Meaning</h3>
              <ul class="meaning__list white">
                  <li class="meaning__item noun-meaning">${
                    data[0].meanings[0].definitions[0].definition
                  }</li>
                  <li class="meaning__item noun-meaning">${
                    data[0].meanings[0].definitions[1].definition
                  }</li>
              </ul>
              <div class="synonym__disc">
                  <h3 class="synonym__heading">Synonyms</h3>
                  <p class="synonym__word">${
                    data[0].meanings[0].synonyms.length != 0
                      ? data[0].meanings[0].synonyms[0] ||
                        data[0].meanings[1].synonyms[0] ||
                        data[0].meanings[2].synonyms[0]
                      : "🙁 not found"
                  }</p>
              </div>
          </section>
          <section class="word__disc__verb">
              <div class="subheading__verb">
                <div class="divider verb__divider"></div>
                      <span class="sentence">"${
                        data[0].meanings[0].definitions[1].example ||
                        data[0].meanings[0].definitions[0].example ||
                        data[0].meanings[0].definitions[2].example ||
                        data[0].meanings[0].definitions[3].example
                      }"</span>
                
              <div class="wiki__link">
                  <h3 class="src">Source</h3>
                  <a class="link__path white" href="https://en.wiktionary.org/wiki/${inputText}" target="_blank">https://en.wiktionary.org/wiki/${inputText}</a>
              </div>
          </section>`;
      })
      .catch((error) => {
        console.log(error);
        parent_Elem.innerHTML = `<h1 class="error">Not Found</h1>`;
  
      });
    } else {
      alert('enter the word')
    }
};

function inputValidation() {
  if (document.querySelector(".input-text").value === "") {
    parent_Elem.innerHTML = '<p class="empty">Discover and Learn</p>';
  }
}

// functions call
toggleFonts();
themeToggle();

// event listeners
search_Btn.addEventListener("click", getData);
