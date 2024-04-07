# Tender Hack, Решение команды MISIS Ginseng Strip

Team Members:

1) **Егор Чистов (Backend)** @rdinit
2) **Кирилл Рыжичкин (ML)** @polnostju
3) **Максим Литвинов (ML)** @ykmaksim
4) **Дмитрий Коноплянников (Frontend)** @Kin1599
5) **Анна Гулякина (Design)** @anya_gulyakina

Project Presentation: [Link](https://drive.google.com/...)

## Содержимое

1) [ML Ноутбуки](https://github.com/Kin1599/TenderHack__MISIS-Ginseng-Strip/tree/master/ml-notebooks)
2) [Backend](https://github.com/Kin1599/TenderHack__MISIS-Ginseng-Strip/tree/master/tenderhack-backend)
3) [Frontend](https://github.com/Kin1599/TenderHack__MISIS-Ginseng-Strip/tree/master/tenderhack-frontend)

## Структура ML решения

- На вход поступает наименование СТЕ
- Проверяем наименование на соответствие критерию минимальной длины и минимального количества слов в нём, на токсичность, на орфографические ошибки -> предлагаем исправления
  - Для проверки на токсичность используется `toxicityclassifier`, для определения и исправления орфографических ошибок — модель `t5-russian-spell` из `transformers`
- Определяем по введённому наименованию принадлежность СТЕ к одному из трёх классов: товар, услуга, работа
  - Для этого были с помощью `roberta-base` были построены эмбеддинги всех наименований товаров с Портала Поставщиков, для классификации используется две модели `CatBoostClassifier`: первая предсказывает метку товар/не товар (`accuracy — 0.95`, `f1 — 0.94` на обоих классах), вторая — в том случае, если первая модель предсказала, что данное СТЕ — не товар, предсказывает метку услуга/работа (`accuracy` — `0.85`, `f1` — `0.92` на услугах, `0.8` на работах). Среднее время предсказания метки товар/услуга/работа — `41 ms` (включая генерацию эмбеддинга).
- В случае, если введённое наименование представляет собой товар, выполняем все, что написано ниже. Случай с услугой/работой оставляем для дальнейшего развития данной фичи.
- Проверяем наименование товара на полноту: обнаруживаем присутствие бренда и модели в наименовании (а также получаем их конкретные строковые значения)
  - Для этого используется большая БД, спаршенная с различных ресурсов (здесь и в других частях решения используется `Clickhouse`), состоящая из названий брендов и моделей (это показало лучшие результаты, нежели `wikineural-multilingual-ner` и прочие `ner` модели)
- Предсказываем категорию товара по его наименованию
  - Для генерации эмбеддингов наименований используется `multilingual-e5-small`, с помощью `cosine_similarity` отбираются топ-4 категории, наиболее подходящие для данного товара (топ-1 используется для предварительного заполнения поля Категория, остальные — в качестве дополнительных вариантов). Среднее время предсказания категории — `372 ms` (включая генерацию эмбеддинга).
- По предсказанной ранее категории с помощью `Counter` получаем топ-10 (по количеству использований в данной категории) полей характеристик
- Также по предсказанной категории СТЕ определяем коды ОКПД2 и КПГЗ (по заранее спаршенным таблицам с `reestr.mos.ru/classifiers`)
- ?? как-то заполняем поля характеристик ??
  - бла бла бла вот такие модельки заюзали вот это спарсили
- Генерируем описание для СТЕ по наименованию
  - Для этого используется `Mistral V1` с настроенными гиперпараметрами
