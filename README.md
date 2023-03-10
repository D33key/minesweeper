# Сапер - проект на React, JS, и SCSS

Этот проект - игра "Сапер", реализованная на React, JS и SCSS.

## Описание игры

Цель игры "Сапер" - открыть все клетки поля, не попадая на мины.

Игровое поле состоит из ячеек, в каждой из которых может быть мина или число. Число показывает, сколько мин находится в соседних клетках.

Игрок открывает ячейки, нажимая на них левой кнопкой мыши. Если в открытой ячейке находится мина, игра проиграна. Если в ячейке число, оно показывается игроку. Если число равно нулю, открываются все соседние ячейки, пока не будут найдены мины или ячейки с числами.

Игрок может пометить клетку флажком, если он считает, что в ней находится мина. Чтобы пометить клетку флажком, нужно нажать на нее правой кнопкой мыши.

Игра выиграна, когда все ячейки, кроме ячеек с минами, открыты.

## Структура проекта

```
src/
|-- components/
| |-- App.js
| |-- Button.js
| |-- NumberDisplay.js
|-- styles/
| |-- index.scss
|-- utils/
| |-- index.js
|-- index.js
```

## Играть

Поиграть можно по этой ссылке - https://minesweeper-tau-green.vercel.app/
