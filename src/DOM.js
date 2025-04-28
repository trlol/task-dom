/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const element = document.createElement(tag);
        element.textContent = content;
        document.body.appendChild(element);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    function createLevel(currentLevel, maxLevel) {
        const div = document.createElement('div');
        div.className = `item_${currentLevel}`;

        if (currentLevel < maxLevel) {
            for (let i = 0; i < childrenCount; i++) {
                const child = createLevel(currentLevel + 1, maxLevel);
                div.appendChild(child);
            }
        }

        return div;
    }

    return createLevel(1, level);
}
/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    // Создаем дерево
    const tree = generateTree(2, 3);

    // Находим все элементы второго уровня
    const level2Items = tree.querySelectorAll('.item_2');

    // Заменяем каждый DIV на SECTION
    level2Items.forEach((div) => {
        const section = document.createElement('section');
        section.className = div.className;

        // Переносим все дочерние элементы
        while (div.firstChild) {
            section.appendChild(div.firstChild);
        }

        // Заменяем DIV на SECTION
        div.parentNode.replaceChild(section, div);
    });

    return tree;
}
