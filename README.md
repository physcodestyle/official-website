![Editorconfig](https://github.com/physcodestyle/official-website/workflows/EditorConfig/badge.svg)
![Spellcheck](https://github.com/physcodestyle/official-website/workflows/Spellcheck/badge.svg)
![Markdown](https://github.com/physcodestyle/official-website/workflows/Markdown/badge.svg)
![HTML](https://github.com/physcodestyle/official-website/workflows/HTML/badge.svg)
![CSS](https://github.com/physcodestyle/official-website/workflows/CSS/badge.svg)

# Сайт Физического факультета ВГУ

**Адрес:** [https://phys.vsu.ru](https://phys.vsu.ru)

Репозиторий представляет собой набор файлов с содержимым сайта (тексты в формате [Markdown](https://www.markdownguide.org/basic-syntax/), картинки в высоком разрешении) и шаблоны страниц для сборки статического сайта с помощью генератора [Eleventy](https://www.11ty.dev).

## Содержание

* [Дизайн сайта](https://github.com/physcodestyle/official-website#дизайн-сайта)
* [Работа с репозиторием](https://github.com/physcodestyle/official-website#работа-с-репозиторием)
  * [Работа в контейнере](https://github.com/physcodestyle/official-website#работа-в-контейнере)
  * [Процесс разработки](https://github.com/physcodestyle/official-website#процесс-разработки)
  * [Технологии, применяемые на сайте](https://github.com/physcodestyle/official-website#технологии-применяемые-на-сайте)
    * [Поддерживаемые браузеры](https://github.com/physcodestyle/official-website#поддерживаемые-браузеры)
    * [Поддержка шрифтов](https://github.com/physcodestyle/official-website#поддержка-шрифтов)
    * [Проверка текстов](https://github.com/physcodestyle/official-website#проверка-текстов)
    * [Принципы вёрстки](https://github.com/physcodestyle/official-website#принципы-верстки)
* [Контакты](https://github.com/physcodestyle/official-website#контакты)

## Дизайн сайта

В основе дизайна лежат современные принципы построения интерфейса, реализованы лучшие практики. Все предложения по дизайну в целом и отдельным его элементам просьба отправлять по адресу, указанному в разделе [Контакты](https://github.com/physcodestyle/official-website#контакты).

Дизайн-система, которая лежит в основе построения интерфейса доступна для просмотра в редакторе Figma по [ссылке](https://www.figma.com/file/cw4ioCYg4wLTNjGkvKkxbr/Phys-UI). Выбор редактора для разработки интерфейса опирается на современные тенденции и продиктован независимостью от платформы и возможностью работы бесплатно.

Права на дизайн принадлежат Физическому факультету ФГБОУ ВО "ВГУ".

## Работа с репозиторием

Репозиторий содержит две основные ветки `main` и `develop`. Система работы над репозиторием основана на модели [Git Flow](https://habr.com/ru/post/106912/). Отличие состоит в том, что ветки релиза, хотфиксов и фич отсутствуют. Работа в них заменяется механизмом пулреквестов. Текущая девелоп-версия сайта физического факультета существует только на устройствах, на которых осуществляется модульное, интеграционное тестирование и кросс-браузерное тестирование интерфейса.

Основная работа с материалами сайта и с шаблонами страниц для сборки осуществляется в ветке `develop`. Для того, чтобы убедится в правильности внесённых правок, необходимо произвести пробную сборку сайта и проверку (тестирование) в локальном браузере. После внесения всех необходимых правок следует произвести загрузку коммита(-ов) в репозиторий средствами pull request'а. После создания pull request'а необходимо убедиться в успешном прохождении всех стадий тестирования. Если удалось пройти тестирование успешно, формируется автоматически запрос к котрибьюторам репозитория для поверки всех внесённых изменений. После успешной проверки изменения попадают в ветку `develop`. Как только наберётся достаточное количество изменений для новой версии сайта, администратор репозитория произведёт слияние с веткой `main`, произойдёт финальное тестирование и запустится процедура развёртывания сайта на сервере.

Комментарии к коммитам должны быть на русском языке от третьего лица. В комментарии должно указываться только одно действие, которое определяется одним словом (Создаёт / Удаляет / Правит / Загружает и т.п.). Первая строчка комментария (заголовок), не может содержать больше 50 символов. Если требуется дополнительная расшифровка произведённых изменений, следует поместить её в следующих строках, при этом оставив одну строку пустой после заголовка.

Для работы с шаблонами страниц в репозитории активно применяется технология контейниризации [Docker](https://docs.docker.com). В случае работы с репозиторием с помощью редактора [VSCode](https://code.visualstudio.com), предусмотрена работа с [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers). Также в репозитории присутствует файл настройки для редакторов на основе конфигурации [Editorconfig](https://editorconfig.org).

Для работы с репозиторием необходимо соблюдать ряд правил для форматирования содержимого файлов репозитория:

1. [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html);
2. [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html);
3. [Google Python Style Guide](https://google.github.io/styleguide/pyguide.html);
4. [Shell Style Guide](https://google.github.io/styleguide/shellguide.html).

Соответствующие правила закреплены в автоматических проверках репозитория, которые проходят в обязательном порядке при каждом пуше и пулреквесте в репозитории.

### Работа в контейнере

Для удобства использования контейнера необходимо создать следующие переменные окружения (необходимо задать реальные значения):

```bash
$ export PHYS_USER_GOOGLE_MAP_KEY=<Key for Maps Static API>
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
    --build-arg SIGNATURE=${PHYS_USER_SIGNATURE} \
    --build-arg G_MAP_KEY=${PHYS_USER_GOOGLE_MAP_KEY} .
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

### Процесс разработки

Для сборки сайта используется команда:

```bash
$ npm run build
```

С помощью инструмента Browsersync поддерживается автоматическое обновление сборки на лету после внесение изменений. Для запуска этого режима необходимо выполнить команду:

```bash
$ npm run start
```

Пути сгенерированных страниц сайта обязательно прописываются в каждом markdown в метаописании с помощью ключа `permalink`. Контент страниц содержится в файлах формата [Markdown](https://www.markdownguide.org) в папке `src/content`. При пуше и пулреквесте в репозитории автоматически выполняются GitHub Actions для проверки на соответствия оформления и содержимого (проверка орфографии, типограф).

Шаблоны страниц сайта реализованы с помощью формата описания шаблонов [Nunjucks `*.njk`](https://mozilla.github.io/nunjucks/) и находятся в папке `/src/layouts`.

Ниже приведены другие команды для управления сборкой проекта:

1. Проверка соответствия правилам форматирования кода всего репозитория:

    ```bash
    $ npm run editorconfig
    ```

2. Проверка соответствия правилам форматирования файлов в формате Markdown:

    ```bash
    $ npm run markdown
    ```

3. Проверка соответствия кода HTML страниц собранного сайта стандартам W3C (обязательна поддержка Java):

    ```bash
    $ npm run html
    ```

4. Проверка соответствия правилам форматирования файлов стилей:

    ```bash
    $ npm run css
    ```

5. Заливка карт для англоязычной страницы контактов:

    ```bash
    $ npx gulp map
    ```

6. Генерация новостей на основе группы во ВКонтакте:

    ```bash
    $ npx gulp news
    ```

7. Автоматический сбор последних новостей на сайт:

    ```bash
    $ npx gulp watch
    ```

8. Запуск в режиме отслеживания изменения стилей и скриптов на сайте:

    ```bash
    $ npx gulp watch
    ```

### Технологии, применяемые на сайте

Для всех файлов в репозитории обязательна кодировка [UTF-8](https://ru.wikipedia.org/wiki/UTF-8). Все даты и время для соответствующих полей в файлах указываются в формате [UNIX Timestamp](https://ru.wikipedia.org/wiki/Unix-время). Удобным инструментом для записи нужной даты является [онлайн-конвертер](https://www.epochconverter.com).

#### Поддерживаемые браузеры

Список поддерживаемых браузеров формируется каждое первое число месяца на основе аналитики поведения пользователей сайта за месяц и год до момента оценки показателей. Основными инструментами для формирования общей картины являются Яндекс Метрика и Google Analytics. В список включаются все браузеры, доля которых определяется в общей статистике выше 0,5 %. Список пересматривается ежемесячно в течение года и еженедельно в летние месяцы в связи с проведением приёмной кампании.

**Текущий список**:

1. Google Chrome
2. Chrome Mobile
3. Yandex Browser
4. Firefox
5. Mobile Safari
6. Opera
7. Samsung Internet
8. Edge
9. MIUI
10. Opera Mobile
11. Safari
12. Huawei Browser

Настройки сборки закреплены в специальном разделе `browserslist` конфигурационного файла [package.json](https://github.com/physcodestyle/official-website/blob/main/package.json). Это позволяет при сборке стилей и JavaScript вносить поддержку необходимых полифилов автоматически.

#### Поддержка шрифтов

В репозитории на этапе сборки сайта осуществляется поддержка используемых на сайте шрифтов [Fira Sans](https://fonts.google.com/specimen/Fira+Sans) и [Open Sans](https://fonts.google.com/specimen/Open+Sans). Указанные шрифты обновляются с использованием сервиса Google Fonts по мере необходимости (предварительно проводится предварительное тестирование очередной версии). Подгрузка браузером осуществляется с хостинга, на котором размещён весь сайт, что позволяет получить максимальный прирост производительности. После скачивания новой версии шрифта по содержимому страниц оценивается и формируется набор необходимых глифов для всех используемых начертаний с помощью утилиты [glyphhanger](https://github.com/filamentgroup/glyphhanger). Генерация наборов гифов производится вручную. Для работы с `glyphhanger` без установки `node` можно использовать готовый [контейнер Docker](https://github.com/Worie/docker-glyphhanger) следующим образом (после скачивания работа идёт с папками шрифтов `Fira_Sans` и `Open_Sans`):

```bash
# Латиница (Latin)
$ glyphy --whitelist=U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD --subset Open_Sans/OpenSans-Bold.ttf --formats=ttf && mv Open_Sans/OpenSans-Bold-subset.ttf OpenSans-Bold-Latin.ttf

# Расширенная латиница (LatinExtended)
$ glyphy --whitelist=U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF --subset Open_Sans/OpenSans-Bold.ttf --formats=ttf && mv Open_Sans/OpenSans-Bold-subset.ttf OpenSans-Bold-LatinExtended.ttf

# Кириллица (Cyrillic)
$ glyphy --whitelist=U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116 --subset Open_Sans/OpenSans-Bold.ttf --formats=ttf && mv Open_Sans/OpenSans-Bold-subset.ttf OpenSans-Bold-Cyrillic.ttf
```

Названия начертаний шрифтов, которые используются на сайте:

1. FiraSans-Bold
2. FiraSans-Light
3. OpenSans-Regular
4. OpenSans-Italic
5. OpenSans-Bold

Список форматов шрифтов оценивается на основе списка поддерживаемых браузеров. На данный момент это один формат - [woff2](https://caniuse.com/woff2). С помощью утилиты [ttf2woff2](https://github.com/nfroidure/ttf2woff2) производится конвертация файлов шрифтов в формат woff2 при запуске сборки сайта и в режиме разработки с автоматической перезагрузкой в браузере.

#### Проверка текстов

Сайт поддерживает материалы на русском и английском языке. Для проверки орфографии используется модуль [PySpelling](https://facelessuser.github.io/pyspelling/), который настроен на использование библиотеки [Hunspell](https://hunspell.github.io/). Проверка орфографии выполняется для каждого пуша и пулреквеста в репозиторий во всех ветках. Для рассмотрения изменений необходимо в первую очередь пройти проверку орфографии. Реализуется проверка орфографии с помощью GitHub Actions. Для этого предусмотрена [конфигурация](https://github.com/physcodestyle/official-website/blob/main/.spellcheck.yml). Добавочные слова, которые расширяют стандартные словари, содержится в списках для:

1. [русского языка](https://github.com/physcodestyle/official-website/blob/main/.wordlist/.wordlist-en.txt)
2. [английского языка](https://github.com/physcodestyle/official-website/blob/main/.wordlist/.wordlist-ru.txt)
3. [терминов](https://github.com/physcodestyle/official-website/blob/main/.wordlist/.wordlist-terms.txt)
4. [сокращений](https://github.com/physcodestyle/official-website/blob/main/.wordlist/.wordlist-abbr.txt)

На сайте поддерживается автоматический типограф на основе пакета [remark](https://www.npmjs.com/package/remark). Набор действий и общая конфигурация для типографа содержится в файле [.remarkrc.js](https://github.com/physcodestyle/official-website/blob/main/.remarkrc.js).

#### Принципы вёрстки

Для формирования названий классов применяется технология [БЭМ](https://ru.bem.info). Используется европейская нотация: для обозначения элемента используется `__`, а для обозначения модификатора используется `--`.

При разработке сайта применяется технология Mobile-first. Сначала создаётся мобильная версия блока, а потом дизайн блока для больших размеров с помощью @media. Нет брейкпоинтов для адаптации. Каждый блок сам определяет для себя, когда ему пора меняться.

Для проверки форматирования кода используется линтер [stylelint](https://github.com/stylelint/stylelint). Существует автоматическая проверка линтером при пуше и пулреквесте в репозиторий. Линтер запускается и вручную командой:

```bash
$ npm run css
```

## Контакты

Если возникли вопросы, предложения, комментарии, их можно задать следующим образом:

1. Создав issue в репозитории на соответствующей [странице](https://github.com/physcodestyle/official-website/issues);
2. Отправив письмо на электронную почту [korovchenko@phys.vsu.ru](mailto:korovchenko@phys.vsu.ru).
