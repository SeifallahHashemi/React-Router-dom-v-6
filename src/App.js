import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";
import "./App.css";
import Contact from "./pages/Contact";
import NewBook from "./pages/NewBook";
import BookList from "./pages/BookList.js";
import { Fragment } from "react";
import Navigation from "./components/NavigationHeader/Navigation.js";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import BookDetails from './components/BookDetails/BookDetails';

function App() {
  return (
    <Fragment>
      <Navigation />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="post/:id" element={<BookDetails />} />
        </Route>
        <Route path="books">
          <Route index element={<Book />} />
          <Route path=":id" element={<BookList />} />
          <Route path="newBook" element={<NewBook />} />
        </Route>
        {/* <Route path="/books" element={<Book />} />
        <Route path="/books/:id" element={<BookList />} />
        <Route path="/newBook" element={<NewBook />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
}

export default App;
