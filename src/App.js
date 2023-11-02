import './styles.css'

import {Table} from './Table'
import {useState} from "react";
import {convertDateString} from "./helpers";

export default function App() {

    const [dragonRows, setDragonRows] = useState([])
    const [personRows, setPersonRows] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        x: "",
        y: "",
        age: "",
        color: "",
        type: "",
        character: "",
        killer: ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    let text = "TEXT_";

    // Example POST method implementation:
    async function getData(url = "") {
        // Default options are marked with *
        const response = await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
        });
        return response.json();
    }

    async function postData(url = "", formData = {}) {
        // Default options are marked with *
        const res = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                name: formData.name,
                coordinates: {
                    x: formData.x,
                    y: formData.y
                },
                age: formData.age,
                color: formData.color,
                type: formData.type,
                character: formData.character,
                killer: formData.killer
            })
        })

        if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
        }

        getData("http://localhost:8080/jax-rs-1/api/v1/dragons")
            .then((data) => {
                getDragons(data)
            });
    }

    function getCoordinates(coordinates = null) {
        return coordinates.x + " :: " + coordinates.y;
    }

    function getDragons(data) {
        let dragonArray = [];
        // eslint-disable-next-line array-callback-return
        data.map((dragon) => {
            const dragonDTO = {
                id: dragon.id,
                name: dragon.name,
                coordinates: getCoordinates(dragon.coordinates),
                creationDate: dragon.creationDate == null ? null : convertDateString(dragon.creationDate),
                age: dragon.age,
                color: dragon.color,
                type: dragon.type,
                character: dragon.character,
                killer: dragon.killer == null ? null : dragon.killer.id
            }
            dragonArray.push(dragonDTO)
        })
        setDragonRows(dragonArray)
    }

    function getPersons(data) {
        let personArray = [];
        // eslint-disable-next-line array-callback-return
        data.map((person) => {
            const personDTO = {
                id: person.id,
                name: person.name,
                birthday: person.birthday == null ? null : convertDateString(person.birthday),
                height: person.height,
                passportID: person.passportID,
                hairColor: person.hairColor
            }
            personArray.push(personDTO)
        })
        setPersonRows(personArray)
    }

    // function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }
    // useEffect(() => {
    //     getData("http://localhost:8080/jax-rs-1/api/v1/dragons")
    //         .then((data) => {
    //             getDragons(data);
    //         });
    //     getData("http://localhost:8080/jax-rs-1/api/v1/persons")
    //         .then((data) => {
    //             getPersons(data);
    //         });
    // })

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

    const personColumns = [
        {accessor: 'id', label: 'ID'},
        {accessor: 'name', label: 'Name'},
        {accessor: 'birthday', label: 'Birthday'},
        {accessor: 'height', label: 'Height'},
        {accessor: 'passportID', label: 'Passport ID'},
        {accessor: 'hairColor', label: 'Hair Color'},
    ]

    return (
        <div className="App">
            <h1>SOA Lab2</h1>
            <h2>Dragons</h2>
            <Table rows={dragonRows} columns={dragonColumns}/>
            {/*<p>{dragonRows}</p>*/}
            <h2>Persons</h2>
            <Table rows={personRows} columns={personColumns}/>
            <p>{text}</p>
            <button onClick={() => {
                getData("http://localhost:8080/jax-rs-1/api/v1/dragons")
                    .then((data) => {
                        getDragons(data)
                    });
            }}>Get Dragons
            </button>
            <button onClick={() => {
                getData("http://localhost:8080/jax-rs-1/api/v1/persons")
                    .then((data) => {
                        getPersons(data)
                    });
            }}>Get Persons
            </button>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>

                <label htmlFor="x">Coordinates.X:</label>
                <input type="number" id="x" name="x" value={formData.x} onChange={handleChange}/>
                <label htmlFor="x">Coordinates.Y:</label>
                <input type="number" id="y" name="y" value={formData.y} onChange={handleChange}/>

                <label htmlFor="age">Age:</label>
                <input type="number" id="age" name="age" value={formData.age} onChange={handleChange}/>

                <label htmlFor="color">Color:</label>
                <input type="text" id="color" name="color" value={formData.color} onChange={handleChange}/>

                <label htmlFor="type">Type:</label>
                <input type="text" id="type" name="type" value={formData.type} onChange={handleChange}/>

                <label htmlFor="character">Character:</label>
                <input type="text" id="character" name="character" value={formData.character} onChange={handleChange}/>

                <label htmlFor="killer">Killer:</label>
                <input type="number" id="killer" name="killer" value={formData.killer} onChange={handleChange}/>

                <button type="submit" onClick={
                    () => {
                        console.log(formData);
                        postData("http://localhost:8080/jax-rs-1/api/v1/dragons", formData).then();
                    }
                }>Submit
                </button>
            </form>
        </div>
    )
}
