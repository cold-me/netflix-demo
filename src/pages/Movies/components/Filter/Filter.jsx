import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const Filter = () => {
    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant='danger' id='dropdown-basic'>
                    필터
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href='#/action-1'>인기순</Dropdown.Item>
                    <Dropdown.Item href='#/action-2'>상영순</Dropdown.Item>
                    <Dropdown.Item href='#/action-3'>최신순</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default Filter;
