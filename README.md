# Официальный репозиторий сайта Физического факультета

Сайт представляет собой набор файлов с содержимым сайта (тексты в формате [Markdown](https://www.markdownguide.org/basic-syntax/), картинки в высоком разрешении) и шаблоны страниц для сборки статического сайта с помощью генератора [Eleventy](https://www.11ty.dev).

## Работа с репозиторием

### Основные положения

Репозиторий содержит две основные ветки `main` и `develop`. Система работы над репозиторием основана на модели [Git Flow](https://habr.com/ru/post/106912/). Отличие состоит в том, что ветки релиза, хотфиксов и фич отсутствуют. Работа в них заменяется мезанизмом пул-реквестов. Текущая девелоп версия сайта физического факультета существует только на устройствах, на которых осуществляется модульное, интеграционное тестирование и кросс-браузерное тестирование интерфейса.

Основная работа с материалами сайта и с шаблонами страниц для сборки осуществляется в ветке `develop`. Для того, чтобы убедится в правильности внесенных правок, необходимо произвести пробную сборку сайта и проверку (тестирование) в локальном браузере. После внесения всех необходимых правок следует произвести загрузку комитта(-ов) в репозиторий средствами pull request'а. После создания pull request'а необходимо убедится в успешном прохождении всех стадий тестирования. Если удалось пройти тестирование успешно, формируется автоматически запрос к котрибьюторам репозитория для поверки всех внесенных изменений. После успешной проверки изменения попадают в ветку `develop`. Как только наберется достаточное количество изменений для новой версии сайта, администратор репозитория произведет слияние с веткой `main`, произойдет финальное тестирование и запустится процедура развертывания сайта на сервере.

Комментарии к коммитам должны быть на русском языке от третьего лица. В комментарии должно указываться только одно действие, которое определяется одним словом (Создает / Удаляет / Правит / Загружает и т.п.). Первая строчка комментария (заголовок), не может содержать больше 50 символов. Если требуется дополнительная расшифровка произведенных изменений, следует поместить ее в следующих строках, при этом оставив одну строку пустой после заголовка.

Для работы с шаблонами страниц в репозитории активно применяется технология контейниризации [Docker](https://site.docker.com). В случае работы с репозиторием с помощью редактора [VSCode](https://code.visualstudio.com), предусмотрена работа с [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers). Также в репозитории присутсвует файл настройки для редакторов на основе конфигурации [Editorconfig](https://editorconfig.org).

Шаблоны страниц сайта реализованы с помощью формата описания шаблонов [Nunjucks `*.njk`](https://mozilla.github.io/nunjucks/) и находятся в папке `/src/layouts`.

Для работы с репозиторием необходимо соблюдать ряд правил для форматирования содержимого файлов репозитория:

1. [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html);
2. [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html);
3. [Google Python Style Guide](https://google.github.io/styleguide/pyguide.html);
4. [Shell Style Guide](https://google.github.io/styleguide/shellguide.html).

Соответствующие правила закреплены в автоматических проверках репозитория, которые проходят в обязательном порядке при каждом пуше и пул реквесте в репозитории.

### Работа в контейнере

Для удобства использования котнтейнера необходимо создать следующие переменные окружения (необходимо задать реальные значения):

```bash
$ export PHYS_USER_NAME=<Имя Фамилия>
$ export PHYS_USER_EMAIL=<Email, используемый на GitHub>
$ export PHYS_USER_SIGNATURE=$(cat ~/.ssh/<ключ для доступа на GitHub>)
```

Создание ключа для доступа на GitHub описано в [официальном руководстве](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent). После создания, ключ необходимо поместить в настройки, как описано в [инструкции](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account). Полный перечень возможностей описан [здесь](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/connecting-to-github-with-ssh).

Переменные можно также добавить в конфигурационный файл Вашего терминала как переменные среды.

1. Редактирование репозитория на GitHub:

    Для настройки ничего не надо. Можно использовать прямое редактирование на сайте или инструмент GitHub Codespaces и работать в веб-версии редактора VSCode.

2. Использование Dockerfile:

   Перед использованием необходимо собрать контейнер со следующими ключами:

    ```bash
    $ docker build -t physcodestyle:site \
    --build-arg USER_NAME=${PHYS_USER_NAME} \
    --build-arg USER_EMAIL=${PHYS_USER_EMAIL} \
    --build-arg SIGNATURE=${PHYS_USER_SIGNATURE} .
    ```

    Для запуска контейнера можно воспользоваться следующей командой:

    ```bash
    $ docker run --name physcodestyle_site --rm -i -t physcodestyle:site bash
    ```

3. Использование Docker Compose

    Для настройки значений по умолчанию необходимо создать файл со значениями переменных окружения для контейнера:

    ```bash
    $ export | grep "PHYS" > ./.env
    ```

     Собрать контейнер можно следующей командой:

    ```bash
    $ docker-compose build
    ```

4. Использование Remote Containers в VSCode

    Для настройки значений по умолчанию необходимо создать файл со значениями переменных окружения для контейнера:

    ```bash
    $ export | grep "PHYS" > ./.env
    ```

    Запустить контейнер в соответствии с [инструкцией](https://code.visualstudio.com/docs/remote/containers)

## Контакты

Если возникли вопросы, предложения, комментарии, их можно задать следующим образом:

1. Создав issue в репозитории на соответствующей [странице](https://github.com/physcodestyle/official-website/issues);
2. Отправив письмо на электронную почту [korovchenko@phys.vsu.ru](mailto:korovchenko@phys.vsu.ru).
