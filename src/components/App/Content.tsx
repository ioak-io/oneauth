import React from 'react';
import { Routes, Route, Link, BrowserRouter, HashRouter } from 'react-router-dom';
import Home from '../Home';
import Landing from '../Landing';
import Navigation from '../Navigation';

type Props = {
    cookies?: any
}

function Content({ cookies }: Props) {
    return (
        <div className="content">
            <HashRouter>
                <Navigation />
                <Routes>
                    <Route index element={<Landing />} />
                    <Route path="landing" element={<Landing />} />
                    <Route path="/" element={<Landing />} />
                    <Route path="home" element={<Home />} />
                    <Route path="*" element={<p>There's nothing here: 404!</p>} />
                </Routes>
            </HashRouter>
        </div>
    );
};

export default Content;
