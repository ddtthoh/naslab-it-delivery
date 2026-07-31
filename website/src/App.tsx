/**
 * Router root. 10 routes, all real navigations through react-router-dom.
 *
 * The previous single-page globe prototype that lived here now sits in
 * src/prototype/GlobePrototype.tsx, unchanged and still wired to src/three/**.
 */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ROUTES } from "./content/frozen";
import { BASENAME } from "./content/i18n";
import Home from "./pages/Home";
import About from "./pages/About";
import Strategy from "./pages/Strategy";
import Roadmap from "./pages/Roadmap";
import NcoreBasic from "./pages/NcoreBasic";
import NcoreTrading from "./pages/NcoreTrading";
import NcoreFeatures from "./pages/NcoreFeatures";
import NcoreTrends from "./pages/NcoreTrends";
import NcoreX from "./pages/NcoreX";
import NcoreToken from "./pages/NcoreToken";
import Careers from "./pages/Careers";
import Collaboration from "./pages/Collaboration";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  /* basename 吃掉语言前缀(方案 C1):`/ja/about` 在路由眼里仍是 `/about`,
     所以下面 13 条 Route 与所有 Link 的 to 一个字都不用改。
     英文的 basename 是 "/",行为与改造前完全一致。 */
  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.about} element={<About />} />
          <Route path={ROUTES.strategy} element={<Strategy />} />
          <Route path={ROUTES.roadmap} element={<Roadmap />} />
          <Route path={ROUTES.ncoreBasic} element={<NcoreBasic />} />
          <Route path={ROUTES.ncoreTrading} element={<NcoreTrading />} />
          <Route path={ROUTES.ncoreFeatures} element={<NcoreFeatures />} />
          <Route path={ROUTES.ncoreTrends} element={<NcoreTrends />} />
          <Route path={ROUTES.ncoreX} element={<NcoreX />} />
          <Route path={ROUTES.ncoreToken} element={<NcoreToken />} />
          <Route path={ROUTES.careers} element={<Careers />} />
          <Route path={ROUTES.collaboration} element={<Collaboration />} />
          <Route path={ROUTES.contact} element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
