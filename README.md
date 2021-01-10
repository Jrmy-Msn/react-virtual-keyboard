# react-virtual-keyboard

---

Un clavier virtuel sous forme de composant ReactJS :

![Capture d'écran du clavier virtuel](https://github.com/Jrmy-Msn/react-virtual-keyboard/docs/screenshot_1.png)

- Plusieurs dispositions de clavier disponibles : AZERTY, QWERTY, ALPHATBET
- 2 themes de couleur : sombre ou clair
- Sélection des touches du clavier virtuel par clique souris ou via le clavier physique

---

### Props

```js
propTypes = {
    layout: PropTypes.string, // keyboard layout
    theme: PropTypes.string, // keyboard color theme
    currentKey: PropTypes.string, // if not empty string, current virtual key selected
    onKeyUp: PropTypes.func, // (KeyboardEvent) => void : keyup physical keyboard event handler
    onKeyDown: PropTypes.func, // (KeyboardEvent) => void : keydown physical keyboard event handler
    onClickKey: PropTypes.func, // (string) => void : mouse click on virtual key event handler
    feedbackForCurrentKey: PropTypes.func.isRequired, // (string) =>  string : define a CSS classname
  }
```