import { createIcons, Menu, ArrowLeft, Hexagon } from 'lucide';

createIcons({
  icons: {
    Menu,
    ArrowLeft,
    Hexagon,
  },
});

const demoButton = document.getElementById('lucideDemoBtn');

if (demoButton) {
  demoButton.addEventListener('click', () => {
    demoButton.classList.toggle('is-active');
    demoButton.setAttribute(
      'aria-pressed',
      demoButton.classList.contains('is-active') ? 'true' : 'false'
    );
  });
}
