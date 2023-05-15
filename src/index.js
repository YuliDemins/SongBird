import './style.scss'
import './assets/svg/rsschool.svg';


import header from './components/header/header.js'

import createStartPage from './components/pages/main';

import footer from './components/footer/footer.js'

let root = document.getElementById('root');

header.setHeader()

createStartPage()

footer.setFooter()