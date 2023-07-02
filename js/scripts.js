document.addEventListener('DOMContentLoaded', function () {
//создаем событие загрузка страницы и функцию поведения при этом событии
    const navInit = () => {   // создаем константу
        // чтобы изменить цвет фона меню:
        const navbarCollabsible = document.body.querySelector('#mainNav'); //присвоиваем ей значение нашей навигации
        if (window.scrollY === 0) { // определяем есть ли скрол (не равно 0 - есть)
            navbarCollabsible.classList.remove('navbar-shrink'); // если равно 0 - удаляем встроенный CSS класс
        } else {
            navbarCollabsible.classList.add('navbar-shrink'); // если не ровно 0 (есть скрол) - встроенный класс добавляем
        }

        // определяем в какой части страницы находится пользователь:
        const links = document.querySelectorAll('.nav-link'); // находим все ссылки по всему документу
        const sections = document.querySelectorAll('section'); // находим все секции


        // что бы подсветить пункт навигации в соответствии с секцией:
        sections.forEach(section => {  //создаем цикл для каждой секции
            // проверяем прокручена ли страница больше, чем расстояние секции от начала страницы
            if (window.scrollY >= (section.offsetTop - 100)) {
                links.forEach(link => { // цикл для каждой ссылки
                    link.classList.remove('active') // убираем класс актив
                    // если href ссылки без #(отрезаем с помощью сплит) === id секции
                    if (link.href.split('#').pop() === section.id) {
                        link.classList.add('active') // включаем класс актив
                    }
                })
            }
        })

    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
    }


// анимация контента:

    const animItems = document.querySelectorAll(".animate");
    //находим все элементы с классом animate на странице

    if (animItems.length > 0) { // если находим что-то (>0), то запускаем функцию
        //которая для каждого из анимируемых объектов определяет:
        function onEntry() {
            animItems.forEach(item => {
                const itemHeight = item.offsetHeight; // высоту анимируемого объекта
                const itemOffset = offset(item).top; // позицию обекта от верхнего края
                const startPos = 2; // регилирование старта анимации
                // определяем точку начала анимации: высота окна - высота элемента/starPos
                const animPoint = document.documentElement.clientHeight - itemHeight / startPos;

                //если высота элемента больше высоты страницы:
                if (itemHeight > document.documentElement.clientHeight) {
                    const animPoint = document.documentElement.clientHeight - document.documentElement.clientHeight / startPos;
                }
                // если одно из двух условий выполняется - элемент в поле видимости
                if ((scrollY > itemOffset - animPoint) && scrollY < itemOffset + itemHeight) {
                    item.classList.add('show'); // подключаем анимацию
                } else {
                    if (!item.classList.contains('no-hide')) {
                        item.classList.remove('show'); // если нет - отключаем
                    }
                }
            })
        }

            /* function onEntry (entry) {
                 entry.forEach(change => {
                     if (change.isIntersecting) {
                         change.target.classList.add('show');
                     } else change.target.classList.remove('show')
                 });
             }
             let options = {threshold: [0.5]};
             let observer = new IntersectionObserver(onEntry, options);
             let elements = document.querySelectorAll('.animate');

             for (let elm of elements) {
                 observer.observe(elm);
             }
         */
            onEntry();
            navInit();
            window.addEventListener('scroll', () => {
                navInit();// прописываем модель поведения при скроле - запускаем функцию
                onEntry();
            })
            window.addEventListener('resize', () => {
                navInit(); // прописываем повдение при ресайзе - запускаем функцию
            })
        }
})

