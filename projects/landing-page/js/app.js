/*
 *  Jump to selected section:
 */
function goToSection(evt) {
    //using event.target to know which section to go
    let toGo = document.querySelectorAll('[data-nav=\"' + evt.target.getAttribute('data-nav') + '\"]');
    toGo[1].scrollIntoView({ block: 'start', behavior: 'smooth' });
}

/*
 *  Build Navigation Bar Dynamicly:
 */
function buildNavigationBar() {
    let pageSections = document.getElementsByTagName('section');
    let mainUl = document.getElementById('navbar__list');
    let fragment = document.createDocumentFragment();

    for (const sec of pageSections) {
        const secTitle = sec.getAttribute("data-nav");
        const listItem = document.createElement('LI');
        const htmlText = '<a data-nav=\"' + secTitle + '\">' + secTitle + '</a>';

        listItem.insertAdjacentHTML('beforeend', htmlText);
        listItem.addEventListener('click', goToSection);
        //using DocumentFragment because appendChild is a expensive proccess, for better performance
        fragment.appendChild(listItem);
    }
    //painting and reflow happens only one time after the loop
    mainUl.appendChild(fragment);
}

/*
 *  Setting active section and active list title on scrolling:
 */
window.addEventListener('scroll', function () {
    let pageSections = document.getElementsByTagName('section');

    for (const sec of pageSections) {
        let liElement = document.querySelector('[data-nav=\"' + sec.getAttribute('data-nav') + '\"]');

        if (sec.getBoundingClientRect().y < 300 && sec.getBoundingClientRect().y > -300) {
            sec.classList.add('your-active-class');
            liElement.classList.add('your-active-class');
        } else {
            sec.classList.remove('your-active-class');
            liElement.classList.remove('your-active-class');
        }
    }
    //Display top btn when scrolled down
    if (document.documentElement.scrollTop > 300) {
        topButton.style.display = "block";
      } else {
        topButton.style.display = "none";
    }
});

/*
 *  back to top btn and function:
 */
topButton = document.getElementById("top_btn");
topButton.addEventListener('click',function(){
    window.scrollTo({top: 0, behavior: 'smooth'});
});

/*
 *  Calling Functions:
 */
buildNavigationBar();





