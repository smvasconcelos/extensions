import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalStyles } from 'twin.macro';
import { Home } from './pages/Home/Home.page';
import { PopupPage } from './pages/Popup/Popup.page';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <GlobalStyles />
    <Routes>
      <Route path="/" element={<PopupPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </Router>
);
