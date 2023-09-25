'use client';
import React, { MouseEvent, memo, useEffect, useState } from 'react';
import { HandCatButton } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export interface IPaginationProps {
    pages: number;
    pageLimit?: number;
    maxPageLimit?: number;
    minPageLimit?: number;
    onPage?: (page: number) => void;
}

function Pagination({ pages, pageLimit = 4, maxPageLimit = 4, minPageLimit = 0, onPage }: IPaginationProps) {
    const _height = '48px';

    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(4);

    const [pageNumberLimit, setpageNumberLimit] = useState(pageLimit);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(maxPageLimit);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(minPageLimit);

    const handleClick = (event: MouseEvent, currentPage: number) => {
        setcurrentPage(currentPage);
    };

    const pagesArr: number[] = [];
    for (let i = 1; i <= Math.ceil(pages / itemsPerPage); i++) {
        pagesArr.push(i);
    }

    const handleNextbtn = () => {
        setcurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrevbtn = () => {
        setcurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit == 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    let pageIncrementBtn = null;
    if (pagesArr.length > maxPageNumberLimit) {
        pageIncrementBtn = <HandCatButton size={_height} onClick={handleNextbtn} title={'...'} />;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <HandCatButton size={_height} onClick={handlePrevbtn} title={'...'} />;
    }

    const renderPageNumbers = pagesArr.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return <HandCatButton key={number} size={_height} onClick={(e) => handleClick(e, number)} active={currentPage === number} title={number} />;
        } else {
            return null;
        }
    });

    useEffect(() => {
        if (!onPage) return;
        onPage(currentPage);
    }, [currentPage, onPage]);

    return (
        <div className="py-[70px] flex items-center justify-center gap-1 md:gap-4 lg:gap-8 w-full select-none">
            <HandCatButton size={_height} onClick={handlePrevbtn} disable={currentPage == pagesArr[0] ? true : false} title={<FontAwesomeIcon icon={faChevronLeft} />} />

            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}

            <HandCatButton
                onClick={handleNextbtn}
                disable={currentPage == pagesArr[pagesArr.length - 1] ? true : false}
                size={_height}
                title={<FontAwesomeIcon icon={faChevronRight} />}
            />
        </div>
    );
}

export default memo(Pagination);
