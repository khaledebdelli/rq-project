import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import { HomePage } from "./components/Home.page";
import { RQParallelPage } from "./components/ParallelQuery.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import { RQSuperHeroePage } from "./components/RQSuperHeroe.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { DynamicQueryPage } from "./components/DynamicQuery.page";
import { DependentQueryPage } from "./components/DependentQuery.page";
import { RQPaginatedPage } from "./components/RQPaginated.page";
import { RQInfinitPage } from "./components/RQInfinit.page";

const RQClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={RQClient}>
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-parallel">RQ Parallel</Link>
              </li>
              <li>
                <Link to="/rq-dynamic">RQ Dynamic</Link>
              </li>
              <li>
                <Link to="/rq-dependent">RQ Dependent</Link>
              </li>
              <li>
                <Link to="/rq-pagination">RQ Pagination</Link>
              </li>
              <li>
                <Link to="/rq-infinit">RQ Infinit Query</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
            <Route path="/rq-super-heroes/:id" element={<RQSuperHeroePage />} />
            <Route path="/rq-parallel" element={<RQParallelPage />} />
            <Route path="/rq-dynamic" element={<DynamicQueryPage heroIds={[1, 3]} />} />
            <Route path="/rq-dependent" element={<DependentQueryPage email="khaled88ebdelli@gmail.com" />} />
            <Route path="/rq-pagination" element={<RQPaginatedPage />} />
            <Route path="/rq-infinit" element={<RQInfinitPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
