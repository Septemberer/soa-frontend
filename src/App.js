import './styles.css'

import {Table} from './Table'
import {useState} from "react";
import {convertDateString} from "./helpers";

export default function App() {

    const [dragonRows, setDragonRows] = useState([])
    const [personRows, setPersonRows] = useState([])
    const [formDataDragon, setFormDataDragon] = useState({
        id: "",
        name: "",
        x: "",
        y: "",
        age: "",
        color: "WHITE",
        type: "WATER",
        character: "WISE",
        killer: ""
    });

    const [formDataPerson, setFormDataPerson] = useState({
        id: "",
        name: "",
        birthday: "",
        height: "",
        passportID: "",
        hairColor: "WHITE"
    });

    const handleChangeDragon = (event) => {
        const {name, value} = event.target;
        setFormDataDragon((prevFormData) => ({...prevFormData, [name]: value}));
    };

    const handleChangePerson = (event) => {
        const {name, value} = event.target;
        setFormDataPerson((prevFormData) => ({...prevFormData, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    async function deleteDataDragon(url = "") {
        // Default options are marked with *
        const res = await fetch(url, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
        });

        if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
        }

        getData("http://localhost:8080/jax-rs-1/api/v1/dragons")
            .then((data) => {
                getDragons(data)
            });
    }

    async function deleteDataPerson(url = "") {
        // Default options are marked with *
        const res = await fetch(url, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
        });

        if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
        }

        getData("http://localhost:8080/jax-rs-1/api/v1/persons")
            .then((data) => {
                getPersons(data)
            });
    }

    async function getData(url = "") {
        // Default options are marked with *
        const response = await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
        });
        return response.json();
    }

    async function postDataPerson(url = "", formData = {}) {
        // Default options are marked with *
        const res = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                name: formData.name,
                birthday: formData.birthday,
                height: formData.height,
                passportID: formData.passportID,
                hairColor: formData.hairColor
            })
        })

        if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
        }

        getData("http://localhost:8080/jax-rs-1/api/v1/persons")
            .then((data) => {
                getPersons(data)
            });
    }

    async function postDataDragon(url = "", formData = {}) {
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

    async function putDataPerson(url = "", formData = {}) {
        // Default options are marked with *
        const res = await fetch(url, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                id: formData.id,
                name: formData.name,
                birthday: formData.birthday,
                height: formData.height,
                passportID: formData.passportID,
                hairColor: formData.hairColor
            })
        })

        if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
        }

        getData("http://localhost:8080/jax-rs-1/api/v1/persons")
            .then((data) => {
                getPersons(data)
            });
    }

    async function putDataDragon(url = "", formData = {}) {
        // Default options are marked with *
        const res = await fetch(url, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                id: formData.id,
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
            <h2>Persons</h2>
            <Table rows={personRows} columns={personColumns}/>
            <button onClick={() => {
                getData("http://localhost:8080/jax-rs-1/api/v1/persons")
                    .then((data) => {
                        getPersons(data)
                    });
            }}>Get Persons
            </button>
            <form onSubmit={handleSubmit}>
                <label htmlFor="id">ID:
                    <input type="number" id="id" name="id" value={formDataDragon.id} onChange={handleChangeDragon}/>
                </label>

                <label htmlFor="name">Name:
                    <input type="text" id="name" name="name" value={formDataDragon.name} onChange={handleChangeDragon}/>
                </label>

                <label htmlFor="x">Coordinates.X:
                    <input type="number" id="x" name="x" value={formDataDragon.x} onChange={handleChangeDragon}/>
                </label>

                <label htmlFor="x">Coordinates.Y:
                    <input type="number" id="y" name="y" value={formDataDragon.y} onChange={handleChangeDragon}/>
                </label>


                <label htmlFor="age">Age:
                    <input type="number" id="age" name="age" value={formDataDragon.age} onChange={handleChangeDragon}/>
                </label>


                <label htmlFor="color">Color:
                    <select name="color" value={formDataDragon.color}
                            onChange={handleChangeDragon}
                            id="color">
                        <option name="color" value="WHITE">White</option>
                        <option name="color" value="BROWN">Brown</option>
                        <option name="color" value="ORANGE">Orange</option>
                    </select>
                </label>
                <br/>

                <label htmlFor="type">Type:
                    <select name="type" value={formDataDragon.type}
                            onChange={handleChangeDragon}
                            id="type">
                        <option name="type" value="WATER">Water</option>
                        <option name="type" value="UNDERGROUND">Underground</option>
                        <option name="type" value="AIR">Air</option>
                        <option name="type" value="FIRE">Fire</option>
                    </select>
                </label>
                <br/>

                <label htmlFor="character">Character:
                    <select name="character" value={formDataDragon.character}
                            onChange={handleChangeDragon}
                            id="character">
                        <option name="character" value="WISE">Wise</option>
                        <option name="character" value="CHAOTIC">Chaotic</option>
                        <option name="character" value="CHAOTIC_EVIL">Chaotic Evil</option>
                        <option name="character" value="FICKLE">Fickle</option>
                    </select>
                </label>
                <br/>

                <label htmlFor="killer">Killer:
                    <input type="number" id="killer" name="killer" value={formDataDragon.killer} onChange={handleChangeDragon}/>
                </label>

                <button type="submit" onClick={() => {
                    postDataDragon("http://localhost:8080/jax-rs-1/api/v1/dragons", formDataDragon).then();
                }}>Create Dragon
                </button>
                <button type="submit" onClick={() => {
                    console.log(formDataDragon.id)
                    getData("http://localhost:8080/jax-rs-1/api/v1/dragons/" + formDataDragon.id)
                        .then((dragon) => {
                            setFormDataDragon({
                                id: dragon.id,
                                name: dragon.name,
                                x: dragon.coordinates.x,
                                y: dragon.coordinates.y,
                                age: dragon.age,
                                color: dragon.color,
                                type: dragon.type,
                                character: dragon.character,
                                killer: dragon.killer == null ? null : dragon.killer.id
                            })
                        });
                }}>Read Dragon Info
                </button>
                <button type="submit" onClick={() => {
                    putDataDragon("http://localhost:8080/jax-rs-1/api/v1/dragons", formDataDragon).then();
                }}>Update Dragon
                </button>
                <button type="submit" onClick={() => {
                    console.log(formDataDragon.id)
                    deleteDataDragon("http://localhost:8080/jax-rs-1/api/v1/dragons/" + formDataDragon.id)
                        .then(() => setFormDataDragon({
                                id: "",
                                name: "",
                                x: "",
                                y: "",
                                age: "",
                                color: "WHITE",
                                type: "WATER",
                                character: "WISE",
                                killer: ""
                            })
                        );

                }}>Delete Dragon
                </button>
            </form>
            <form onSubmit={handleSubmit}>
                <label htmlFor="id">ID:
                    <input type="number" id="id" name="id" value={formDataPerson.id} onChange={handleChangePerson}/>
                </label>

                <label htmlFor="name">Name:
                    <input type="text" id="name" name="name" value={formDataPerson.name} onChange={handleChangePerson}/>
                </label>

                <label htmlFor="birthday">BirthDay:
                    <input type="text" id="birthday" name="birthday" value={formDataPerson.birthday} onChange={handleChangePerson}/>
                </label>

                <label htmlFor="height">Height:
                    <input type="number" id="height" name="height" value={formDataPerson.height} onChange={handleChangePerson}/>
                </label>

                <label htmlFor="passportID">Passport ID:
                    <input type="text" id="passportID" name="passportID" value={formDataPerson.passportID} onChange={handleChangePerson}/>
                </label>


                <label htmlFor="hairColor">Hair Color:
                    <select name="hairColor" value={formDataPerson.hairColor}
                            onChange={handleChangePerson}
                            id="hairColor">
                        <option name="hairColor" value="WHITE">White</option>
                        <option name="hairColor" value="BROWN">Brown</option>
                        <option name="hairColor" value="ORANGE">Orange</option>
                    </select>
                </label>
                <br/>

                <button type="submit" onClick={() => {
                    console.log(formDataPerson)
                    postDataPerson("http://localhost:8080/jax-rs-1/api/v1/persons", formDataPerson).then();
                }}>Create Person
                </button>
                <button type="submit" onClick={() => {
                    console.log(formDataPerson.id)
                    getData("http://localhost:8080/jax-rs-1/api/v1/persons/" + formDataPerson.id)
                        .then((person) => {
                            setFormDataPerson({
                                id: person.id,
                                name: person.name,
                                birthday: person.birthday == null ? null : convertDateString(person.birthday),
                                height: person.height,
                                passportID: person.passportID,
                                hairColor: person.hairColor
                            })
                        });
                }}>Read Person Info
                </button>
                <button type="submit" onClick={() => {
                    putDataPerson("http://localhost:8080/jax-rs-1/api/v1/persons", formDataPerson).then();
                }}>Update Person
                </button>
                <button type="submit" onClick={() => {
                    console.log(formDataPerson.id)
                    deleteDataPerson("http://localhost:8080/jax-rs-1/api/v1/persons/" + formDataPerson.id)
                        .then(() => setFormDataPerson({
                                id: "",
                                name: "",
                                birthday: "",
                                height: "",
                                passportID: "",
                                hairColor: "WHITE"
                            })
                        );

                }}>Delete Person
                </button>
            </form>
        </div>
    )
}
