import React, { useEffect, useState } from 'react';
import './App.css';
import Book from "./components/Book";
import BookList from "./components/BookList";
import UpcomingBooks from "./components/UpcomingBooks";
import * as api from './api';
import {PageHeader, Row, Col, Divider, Button, Layout, Tag} from 'antd';
import {BookOutlined, DoubleRightOutlined, PushpinOutlined} from '@ant-design/icons';
import FavoriteIcon from "./components/FavoriteIcon";
import DislikeIcon from "./components/DislikeIcon";

const App = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showDisliked, setShowDisliked] = useState(false);


  useEffect(() => {
    api.getBooks().then(books => {
      const reversed = books.reverse();
      setBooks(reversed);
      setFilteredBooks(reversed);
    });
  }, []);

  const toggleFavorites = () => {
    if (!showFavorites) {
      setFilteredBooks(books.filter(b => b.best_of === 'TRUE'));
    } else {
      setFilteredBooks(books);
    }
    setShowFavorites(!showFavorites);
    setShowDisliked(false);
  };
  const toggleDisliked = () => {
    if (!showDisliked) {
      setFilteredBooks(books.filter(b => b.worst_of === 'TRUE'));
    } else {
      setFilteredBooks(books);
    }
    setShowDisliked(!showDisliked);
    setShowFavorites(false);
  };
  const filterGenre = (genre) => {
    setFilteredBooks(books.filter(b => b.genre.split('|').indexOf(genre) > -1));
  };

  const years = [...new Set(filteredBooks.map(b => b.year))].filter(y => !isNaN(y));

  const genres = Object.entries(books
      .filter(b => b.genre)
      .flatMap(b => b.genre.split('|'))
      .reduce((genres, genre) => {
        const existing = genres[genre] ?? 0;
        return {...genres, [genre]: existing+1};
      }, {}))
      .sort((a, b) => a[0] > b[0]);

  const currentlyReading = books.find(b => b.year === 'Currently Reading');
  const upcoming = books.filter(b => b.year === 'Upcoming').reverse();

  return (
      <div className="App">
        <PageHeader
            title={<><BookOutlined />  Book Club</>}
            subTitle="Alive and kicking since 2015"/>

        {/* Reading Now */}
        <h2 style={{marginLeft: '5px', marginBottom: '0'}}>
          <PushpinOutlined style={{marginRight: 5}} />Reading Now
        </h2>
        <Row className="BookList">
            <BookList books={[currentlyReading]} className="BookList-item-current"/>

            {/* Upcoming Books */}
            <Col xs={12} sm={16} md={18} lg={20}>
                <UpcomingBooks books={upcoming} />
                <Row className="upcoming-books">
                    {upcoming.map((book, idx) => {
                        const hideXs = idx > 0, hideSm = idx > 1, hideMd = idx > 3, hideLg = idx > 5;
                        return (
                            <Col key={idx} xs={22} sm={10} md={6} lg={4}
                                 className={`BookList-item BookList-item-current ${hideXs ? 'hideXs' : ''} ${hideSm ? 'hideSm' : ''} ${hideMd ? 'hideMd' : ''} ${hideLg ? 'hideLg' : ''}`}>
                                <div className="BookList-item-margin">
                                    <Book book={book} key={idx}/>
                                </div>
                            </Col>
                        )}
                    )}
                </Row>
            </Col>
        </Row>

        {/* Filters */}
        <div style={{marginTop: 20}}>
            <Button style={{margin: 5}} onClick={toggleFavorites}><FavoriteIcon/> {showFavorites ? 'Show All' : 'Show Favorites'}</Button>
            <Button style={{margin: 5}} onClick={toggleDisliked}><DislikeIcon/> {showDisliked ? 'Show All' : 'Show Disliked'}</Button>

            {/* Genre Cloud */}
            <div className="GenreCloud" style={{maxWidth: 390}}>
              {genres.map(genre => <Tag onClick={() => filterGenre(genre[0])} key={genre[0]}>{genre[0]} ({genre[1]})</Tag>)}
            </div>
        </div>

        {
          years.map((year, idx) => {
             const booksInYear = filteredBooks.filter(b => b.year === year);
             return (
                 <div key={idx}>
                     <Divider orientation="left">
                       <span style={{display: 'inline-flex', alignItems: 'center'}}>
                           <DoubleRightOutlined style={{marginRight: 5}} />
                           <span style={{fontSize: 24}}>{year}</span>
                       </span>
                       <span style={{fontSize: 14, color: 'gray', fontWeight: 'normal', marginLeft: 10}}>{booksInYear.length} Books</span>
                     </Divider>
                     <Row className="BookList">
                        <BookList books={booksInYear}/>
                     </Row>
                </div>
             );
          })
        }
        <Layout.Footer style={{ textAlign: 'center' }}>Made by Maria Knabe<br />Using Ant Design and Sheet Best</Layout.Footer>
      </div>
  );
};

export default App;
