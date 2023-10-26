import './styles.css'

import {Table} from './Table'

export default function App() {

    const dragonColumns = [
        {accessor: 'id', label: 'ID'},
        {accessor: 'name', label: 'Name'},
        {accessor: 'coordinates', label: 'Coordinates'},
        {accessor: 'creationDate', label: 'Creation Date'},
        {accessor: 'age', label: 'Age'},
        {accessor: 'color', label: 'Color'},
        {accessor: 'type', label: 'Type'},
        {accessor: 'character', label: 'Character'},
        {accessor: 'killer', label: 'Killer'},
    ]

    const dragonRows = [
        {id: 1, name: 'Сапфира', coordinates: '3.4 :: 5.0', creationDate: '27-06-2002', age: 21, color: 'orange', type: 'water', character: 'chaotic', killer: null},
        {id: 2, name: 'Дракон', coordinates: '7.4 :: 5.0', creationDate: '27-06-2052', age: 342, color: 'brown', type: 'air', character: 'chaotic', killer: 2},
        {id: 3, name: 'Огнедых', coordinates: '-3.4 :: 45.0', creationDate: '23-01-2002', age: 31, color: 'orange', type: 'underground', character: 'wise', killer: 1},
        {id: 4, name: 'Ящерица', coordinates: '0.4 :: 0.0', creationDate: '03-05-1997', age: 1, color: 'white', type: 'air', character: 'chaotic_evil', killer: 1},
        {id: 5, name: 'Ринер', coordinates: '3.5 :: 5.3', creationDate: '27-09-2002', age: 40, color: 'brown', type: 'water', character: 'fickle', killer: null},
        {id: 6, name: 'А', coordinates: '3.2 :: 5.1', creationDate: '02-28-1999', age: 1000, color: 'orange', type: 'fire', character: 'chaotic', killer: 3},
    ]

    const personColumns = [
        {accessor: 'id', label: 'ID'},
        {accessor: 'name', label: 'Name'},
        {accessor: 'birthday', label: 'Birthday'},
        {accessor: 'height', label: 'Height'},
        {accessor: 'passportID', label: 'Passport ID'},
        {accessor: 'hairColor', label: 'Hair Color'},
    ]

    const personRows = [
        {id: 1, name: 'John', birthday: '02-28-1999', height: 180, passportID: '3316 434565', hairColor: 'white'},
        {id: 2, name: 'Jennifer', birthday: '04-01-2000', height: 167, passportID: '1416 735565', hairColor: 'orange'},
        {id: 3, name: 'Tom', birthday: '03-05-1997', height: 209, passportID: '7788 488885', hairColor: 'brown'},
    ]
    return (
        <div className="App">
            <h1>SOA Lab2</h1>
            <h2>Dragons</h2>
            <Table rows={dragonRows} columns={dragonColumns}/>
            <h2>Persons</h2>
            <Table rows={personRows} columns={personColumns}/>
        </div>
    )
}
