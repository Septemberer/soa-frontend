/* eslint-disable jsx-a11y/accessible-emoji */

export const Pagination = ({ activePage, totalPages, setActivePage }) => {
    return (
        <>
            <div className="pagination">
                <button disabled={activePage === 1} onClick={() => setActivePage(1)}>
                    ⏮️ First
                </button>
                <button disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)}>
                    ⬅️ Previous
                </button>
                <button disabled={activePage === totalPages} onClick={() => setActivePage(activePage + 1)}>
                    Next ➡️
                </button>
                <button disabled={activePage === totalPages} onClick={() => setActivePage(totalPages)}>
                    Last ⏭️
                </button>
            </div>
            <p>
                Page {activePage} of {totalPages}
            </p>
        </>
    )
}
