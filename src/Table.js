import { useState, useMemo } from 'react'
import { sortRows, filterRows, paginateRows } from './helpers'
import { Pagination } from './Pagination'

export const Table = ({ columns, rows }) => {
    const [activePage, setActivePage] = useState(1)
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' })
    const rowsPerPage = 5

    const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
    const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
    const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)

    const count = filteredRows.length
    const totalPages = Math.ceil(count / rowsPerPage)
    const handleSort = (accessor) => {
        setActivePage(1)
        setSort((prevSort) => ({
            order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
            orderBy: accessor,
        }))
    }

    const clearAll = () => {
        setSort({ order: 'asc', orderBy: 'id' })
        setActivePage(1)
        setFilters({})
    }

    return (
        <>
            <table>
                <thead>
                <tr>
                    {columns.map((column) => {
                        const sortIcon = () => {
                            if (column.accessor === sort.orderBy) {
                                if (sort.order === 'asc') {
                                    return '⬆️'
                                }
                                return '⬇️'
                            } else {
                                return '️↕️'
                            }
                        }
                        return (
                            <th key={column.accessor}>
                                <span>{column.label}</span>
                                <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>
                            </th>
                        )
                    })}
                </tr>
                </thead>
                <tbody>
                {calculatedRows.map((row) => {
                    return (
                        <tr key={row.id}>
                            {columns.map((column) => {
                                if (column.format) {
                                    return <td key={column.accessor}>{column.format(row[column.accessor])}</td>
                                }
                                return <td key={column.accessor}>{row[column.accessor]}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>

            {count > 0 ? (
                <Pagination
                    activePage={activePage}
                    count={count}
                    rowsPerPage={rowsPerPage}
                    totalPages={totalPages}
                    setActivePage={setActivePage}
                />
            ) : (
                <p>No data found</p>
            )}

            <div>
                <p>
                    <button onClick={clearAll}>Reset filters</button>
                </p>
            </div>
        </>
    )
}
