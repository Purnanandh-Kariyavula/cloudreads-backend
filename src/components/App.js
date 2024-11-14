// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PopularBooks from './PopularBooks';
import CommentSection from './CommentSection';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={PopularBooks} />
                <Route path="/comments/:bookId" component={CommentSection} />
            </Switch>
        </Router>
    );
}

export default App;
