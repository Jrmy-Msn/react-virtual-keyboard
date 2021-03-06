# react-virtual-keyboard

---

Un clavier virtuel sous forme de composant ReactJS :

![Capture d'écran du clavier virtuel theme "sombre"](https://raw.githubusercontent.com/Jrmy-Msn/react-virtual-keyboard/main/docs/screenshot_dark.png)

- Plusieurs dispositions de clavier disponibles : AZERTY, QWERTY, ALPHATBET

| AZERTY | QWERTY | ALPHABET |
| ------ | ------ | -------- |
| ![Capture d'écran du clavier virtuel AZERTY](https://raw.githubusercontent.com/Jrmy-Msn/react-virtual-keyboard/main/docs/screenshot_AZERTY.png) |![Capture d'écran du clavier virtuel QWERTY](https://raw.githubusercontent.com/Jrmy-Msn/react-virtual-keyboard/main/docs/screenshot_QWERTY.png) | ![Capture d'écran du clavier virtuel ALPHABET](https://raw.githubusercontent.com/Jrmy-Msn/react-virtual-keyboard/main/docs/screenshot_dark.png) |

- possibilité de changer le theme de couleur via la props `theme`

![Capture d'écran du clavier virtuel theme "clair"](https://raw.githubusercontent.com/Jrmy-Msn/react-virtual-keyboard/main/docs/screenshot_light.png)


- Sélection des touches du clavier virtuel par clique souris ou via le clavier physique

---

### `Props` du composant

```js
propTypes = {
    layout: PropTypes.arrayOf(PropTypes.string), // keyboard layout ('AZERTY'|'QWERTY'|'ALPHABET')
    theme: PropTypes.string, // keyboard color theme ('light'|'dark')
    onKeyUp: PropTypes.func, // (KeyboardEvent) => void : keyup physical keyboard event handler
    onKeyDown: PropTypes.func, // (KeyboardEvent) => void : keydown physical keyboard event handler
    onClickKey: PropTypes.func, // (string) => void : mouse click on virtual key event handler
    onMouseOverForKey: PropTypes.func, // (string) => void : mouse over on virtual key event handler
    onMouseOutForKey: PropTypes.func, // (string) => void : mouse out on virtual key event handler
    isKeyActive: PropTypes.func, // (string) =>  string : define a CSS classname
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
