import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import Books from "./components/Books";
import Forms from "./components/Forms";

import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://reactnd-books-api.udacity.com/books",
          {
            headers: { Authorization: "whatever-you-want" },
          }
        );
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <nav>
      <div >
        <div className="Header">
          <div className="Navigation">
            <Link to="/">
              <h1 >Kalvium Books</h1>
            </Link>
            <input
              className="searchbar"
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link to="/about"  >About Us</Link>
            <Link to="/register" className="button">Register</Link>
          </div>
        </div>
        <Routes>
          <Route path="/register" element={<Forms />} />
          <Route
            path="/"
            element={<Books books={books} searchTerm={searchTerm} />}
          />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <Footer />
      </div>
      </nav>
    </Router>
  );
};

const AboutUs = () => {
  return (
    <div>
      <h2>About Us</h2>
      <br />
      <p>
        Welcome to our bookstore! The Kalvium Books website provides users with
        an interactive platform to explore and discover a variety of books. The
        homepage showcases a grid of books fetched from an API, and users can
        easily search for specific titles using the search bar. The navigation
        bar offers convenient access to the registration page, where users can
        sign up by filling out a form with fields for name, email, password, and
        repeat password. The registration form incorporates validation to ensure
        that user inputs meet specific criteria. Upon successful registration,
        user data is stored locally. The Books component displays books in an
        aesthetically pleasing 3x3 grid format, featuring book covers, titles,
        authors, publication dates, prices, and average ratings. The website
        incorporates responsive design, React Router for seamless navigation,
        and additional styling elements such as a dark line between books and
        hover effects on book images. The "About Us" link in the navigation bar
        hints at a section that could potentially provide information about the
        website or redirect users to a GitHub page for more details. Overall,
        the website offers a user-friendly experience with features for book
        exploration and registration, with room for potential enhancements in
        styling and additional content in the "About Us" section.
      </p><br /><br />
      <a className="a"
        href="https://github.com/mranja"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit our GitHub page
      </a>
    </div>
  );
};

const Footer = () => {
  return (
    <footer>
      <p>Made by Ranjan❤️ @2024</p>
    </footer>
  );
};

export default App;
