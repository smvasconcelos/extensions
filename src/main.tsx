import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalStyles } from 'twin.macro';
import { Home } from './pages/Home/Home.page';
import { PopupPage } from './pages/Popup/Popup.page';

ReactDOM.render(
  <Router>
    <GlobalStyles />
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<PopupPage />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
