# react-virtual-keyboard

---

Un clavier virtuel sous forme de composant ReactJS :

![Capture d'écran du clavier virtuel](https://raw.githubusercontent.com/Jrmy-Msn/react-virtual-keyboard/main/docs/screenshot_1.png)

- Plusieurs dispositions de clavier disponibles : AZERTY, QWERTY, ALPHATBET

| AZERTY | QWERTY | ALPHABET |
| ------ | ------ | -------- |
| ![Capture d'écran du clavier virtuel AZERTY](https://raw.githubusercontent.com/Jrmy-Msn/react-virtual-keyboard/main/docs/screenshot_AZERTY_dark.png) |![Capture d'écran du clavier virtuel QWERTY](https://raw.githubusercontent.com/Jrmy-Msn/react-virtual-keyboard/main/docs/screenshot_QWERTY_dark.png) | ![Capture d'écran du clavier virtuel ALPHABET](https://raw.githubusercontent.com/Jrmy-Msn/react-virtual-keyboard/main/docs/screenshot_1.png) |

- 2 themes de couleur : sombre ou clair

| dark | light |
| ---- | ----- |
| ![Capture d'écran du clavier virtuel SOMBRE](https://raw.githubusercontent.com/Jrmy-Msn/react-virtual-keyboard/main/docs/screenshot_1.png) |![Capture d'écran du clavier virtuel CLAIR](https://raw.githubusercontent.com/Jrmy-Msn/react-virtual-keyboard/main/docs/screenshot_2.png) |

- Sélection des touches du clavier virtuel par clique souris ou via le clavier physique

---

### `Props` du composant

```js
propTypes = {
    layout: PropTypes.arrayOf(PropTypes.string), // keyboard layout
    theme: PropTypes.string, // keyboard color theme
    currentKey: PropTypes.string, // if not empty string, current virtual key selected
    onKeyUp: PropTypes.func, // (KeyboardEvent) => void : keyup physical keyboard event handler
    onKeyDown: PropTypes.func, // (KeyboardEvent) => void : keydown physical keyboard event handler
    onClickForKey: PropTypes.func, // (string) => void : mouse click on virtual key event handler
    onMouseOverForKey: PropTypes.func, // (string) => void : mouse over on virtual key event handler
    feedbackForCurrentKey: PropTypes.func.isRequired, // (string) =>  string : define a CSS classname
  }
```

---

##### feedbackForCurrentKey 

Définir un nom de classe CSS pour styliser la touche du clavier virtuel en cours de sélection
Une CSS class `.pressed` est prédéfinie pour mettre en surbrillance la touche lorsque
une touche du clavier physique correspondante est pressée (l'évènement `onKeyDown`)

```css
.VirtualKey:hover,
.VirtualKey.pressed {
  cursor: pointer;
  background-color: var(--primary-light);
  color: var(--primary-text-dark);
}
```
