import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Reviewer } from './pages/Reviewer';
import { ReviewerDomain } from './pages/ReviewerDomain';
import { ExamHub } from './pages/ExamHub';
import { ExamSession } from './pages/ExamSession';
import { ExamResults } from './pages/ExamResults';
import { Glossary } from './pages/Glossary';
import { Admin } from './pages/Admin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'reviewer', element: <Reviewer /> },
      { path: 'reviewer/:domainId', element: <ReviewerDomain /> },
      { path: 'exam', element: <ExamHub /> },
      { path: 'exam/session', element: <ExamSession /> },
      { path: 'exam/results/:id', element: <ExamResults /> },
      { path: 'glossary', element: <Glossary /> },
      { path: 'admin', element: <Admin /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
