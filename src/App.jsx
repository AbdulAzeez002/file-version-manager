import { Routes, Route } from "react-router-dom";
import NoMatch from "./components/no-match/NoMatch";
import AddFilePage from "./pages/add-file-page/AddFilePage";
import DocumentList from "./pages/document-list-page/DocumentList";
import DocumentDetails from "./pages/document-details-page/DocumentDetails";

function App() {
  return (
    <div className="h-screen ">
      <Routes>
        <Route path="/" element={<DocumentList />} />
        <Route path="/add" element={<AddFilePage />} />
        <Route path="/details/:id" element={<DocumentDetails />} />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
