const modalLinks = document.querySelectorAll('.popup-link'); // объекты, которые внутри себя сожержат ссылки на наши модалки
const body = document.querySelector('body'); // будем блокировать скроллстраницы под модалкой
const blockPadding = document.querySelectorAll('.lock-padding'); // не позволяет контенту дергаться при включении модалки
let unblock = true; // блокируем двойные нажатия
const  timeout = 800; // таймаут, равный времени анимации

// логика открытия модалки
if (modalLinks.length > 0) { // проверяем есть на странице объекты запускающие модальные окна
    modalLinks.forEach(link => { // если есть к каждому элементу обращаемся по имени линк
        link.addEventListener('click', function (e) { // добавляем слушателя события "клик" и запускаем фукнцию
            const modalName = link.getAttribute('href').replace ('#', ''); //создаем конст которая атрибут хрев без значка #
            const currentModal = document.getElementById(modalName); // созадем переменную, кот. равна элементу по айди
            modalOpen(currentModal); // передаем эту константу финкции modalOpen
            e.preventDefault(); // запрет на перезагрузку страницы при клике на ссылку
        })
    })
}

// логика закрытия модалки
const modalCloseElem = document.querySelectorAll('.close-modal'); //создаем константу по селектору клоус-модал
if (modalCloseElem.length > 0) { // проверяем есть такие элементы на странице
    modalCloseElem.forEach( el => { //обращаемся к каждому элементу по имени эл
        el.addEventListener('click', function (e) { // добавляем прослушивание события клик, запускаем функцию
         modalClose(el.closest('.popup')) // находим ближайшего родителя родителя элемента эл (клоус-моддал) - попап
            e.preventDefault();
        })
    })
}
function modalOpen (currentModal) {
    if (currentModal && unblock) {
        const modalActive = document.querySelector('.popup.open');
        if (modalActive) {
            modalClose (modalActive, false);
        } else {
            bodyBlock ();
        }
        // если у нас на странице уже есть активное модальное окно, то оно будет закрыто.
        //если активного окна нет, то будет заблокирован контент страницы (бодиБлок)

        currentModal.classList.add('open');
        currentModal.addEventListener('click', function (e){
            if (!e.target.closest('.popup_content')) {
                modalClose(e.target.closest('.popup'));
            }
        });
        // добавляем событие клик. Если клик происходит вне поля попап-контент, то модалка закрывается
        // если клик происходит по полю контент, то модалка не закрывается
    }
}

function modalClose (modalActive, doUnBlock = true) {
    if (unblock) {
    modalActive.classList.remove('open'); // удаляем состояние опен - сворачиваем окно
    if (doUnBlock) {
        bodyUnBlock();
    }
  }
}

// блокировака и разблокировка контента под модальным окном

//блокировка:
function bodyBlock () {
    // высчитываем ширину скролл бара в пикселях (добавляем элемент враппер, в который обоваричиваем всю страницу, кроме модалки):
    /*const blockPaddingValue = window.innerHeight - document.querySelector('#wrapper').offsetWidth +'px';
    if (blockPadding.length > 0) {
        blockPadding.forEach( el => {
            el.style.paddingRight = blockPaddingValue;
        })
    }*/
    body.classList.add('blocked');
    document.querySelector('.navbar').classList.add('blocked');

    unblock = false;
    setTimeout(function (){
        unblock = true;
    }, timeout);
}

// разблокировка:
function bodyUnBlock () {
    setTimeout(function (){
        /*
        if (blockPadding.length > 0) {
            blockPadding.forEach(el => {
                el.style.paddingRight = '0px';
            })
        }*/
        body.style.paddingRight = '0px';
        body.classList.remove('blocked');
    }, timeout);

    unblock = false;
    setTimeout(function () {
        unblock = true;
    }, timeout);
}







