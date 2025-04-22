import React, { useState } from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
const AppLayout = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const searchByKeyword = (event) => {
        event.preventDefault();
        navigate(`/movies?q=${keyword}&page=1`);
    };
    return (
        <div>
            <Navbar expand='lg' className='bg-black navbar-container' data-bs-theme='dark'>
                <Container fluid>
                    <Navbar.Brand href='/'>
                        <img
                            className='netflix-logo'
                            src='https://kreafolk.com/cdn/shop/articles/netflix-logo-design-history-and-evolution-kreafolk_149b6498-ceef-45a6-a671-f45dab16b804.jpg?v=1717725026&width=2048'
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='navbarScroll' />
                    <Navbar.Collapse id='navbarScroll'>
                        <Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link href='/'>Home</Nav.Link>
                            <Nav.Link href={`/movies?q=&page=1`}>Movies</Nav.Link>
                        </Nav>
                        <Form className='d-flex' onSubmit={searchByKeyword}>
                            <Form.Control
                                type='search'
                                placeholder='Search'
                                className='me-2'
                                aria-label='Search'
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <Button variant='outline-danger' type='submit'>
                                Search
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
};

export default AppLayout;
