import './styles.css'

import {Table} from './Table'
import {useState} from "react";
import {convertDateString} from "./helpers";

export default function App() {

    const [dragonRows, setDragonRows] = useState([])
    const [personRows, setPersonRows] = useState([])
    const [caveRows, setCaveRows] = useState([])
    const [teamRows, setTeamRows] = useState([])
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

    const [formDataCave, setFormDataCave] = useState({
        x: "",
        y: "",
    });

    const [formDataTeam, setFormDataTeam] = useState({
        id: "",
        name: "",
        size: "",
        cave: "",
        personList: ""
    });

    const [formDataFirstService, setFormDataFirstService] = useState({
        id: "",
        type: "WATER"
    });

    const [formDataSecondService, setFormDataSecondService] = useState({
        caveId: "",
        teamId: ""
    });

    const handleChangeDragon = (event) => {
        const {name, value} = event.target;
        setFormDataDragon((prevFormData) => ({...prevFormData, [name]: value}));
    };

    const handleChangePerson = (event) => {
        const {name, value} = event.target;
        setFormDataPerson((prevFormData) => ({...prevFormData, [name]: value}));
    };

    const handleChangeCave = (event) => {
        const {name, value} = event.target;
        setFormDataCave((prevFormData) => ({...prevFormData, [name]: value}));
    };

    const handleChangeTeam = (event) => {
        const {name, value} = event.target;
        setFormDataTeam((prevFormData) => ({...prevFormData, [name]: value}));
    };

    const handleChangeFirstService = (event) => {
        const {name, value} = event.target;
        setFormDataFirstService((prevFormData) => ({...prevFormData, [name]: value}));
    };

    const handleChangeSecondService = (event) => {
        const {name, value} = event.target;
        setFormDataSecondService((prevFormData) => ({...prevFormData, [name]: value}));
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

        getData("http://localhost:8080/jax-rs-1/dragon/dragons")
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

        getData("http://localhost:8080/jax-rs-1/dragon/persons")
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

    async function getDataWithBody(url = "", bodyReq = {}) {
        // Default options are marked with *
        console.log(bodyReq)
        await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                id: bodyReq.id,
                value: bodyReq.value
            })
        });
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

        getData("http://localhost:8080/jax-rs-1/dragon/persons")
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

        getData("http://localhost:8080/jax-rs-1/dragon/dragons")
            .then((data) => {
                getDragons(data)
            });
    }

    async function postDataCave(url = "", formData = {}) {
        // Default options are marked with *
        console.log({
            coordinates: {
                x: formData.x,
                y: formData.y
            },
        })
        const res = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                coordinates: {
                    x: formData.x,
                    y: formData.y
                },
            })
        })

        if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
        }

        getData("http://localhost:8080/jax-rs-2/killer/caves")
            .then((data) => {
                getCaves(data)
            });
    }

    async function postDataTeam(url = "", formData = {}) {
        // Default options are marked with *
        console.log(formData)
        const res = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: formData.personList
        })

        if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
        }

        getData("http://localhost:8080/jax-rs-2/killer/teams")
            .then((data) => {
                getTeams(data)
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

        getData("http://localhost:8080/jax-rs-1/dragon/persons")
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

        getData("http://localhost:8080/jax-rs-1/dragon/dragons")
            .then((data) => {
                getDragons(data)
            });
    }

    function getCoordinates(coordinates = null) {
        return coordinates.x + " :: " + coordinates.y;
    }

    function getPersonList(personList = {}) {
        let stringPersonList = [];
        personList.map((person) => stringPersonList.push(person.id));
        console.log(stringPersonList);
        return stringPersonList.join(", ");
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

    function getCaves(data) {
        let caveArray = [];
        // eslint-disable-next-line array-callback-return
        data.map((cave) => {
            const caveDTO = {
                id: cave.id,
                coordinates: getCoordinates(cave.coordinates),
            }
            caveArray.push(caveDTO)
        })
        setCaveRows(caveArray)
    }

    function getTeams(data) {
        let teamArray = [];
        // eslint-disable-next-line array-callback-return
        data.map((team) => {
            const teamDTO = {
                id: team.id,
                name: team.name,
                size: team.size,
                cave: team.cave.id,
                personList: getPersonList(team.personList)
            }
            teamArray.push(teamDTO)
        })
        setTeamRows(teamArray)
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

    const caveColumns = [
        {accessor: 'id', label: 'ID'},
        {accessor: 'coordinates', label: 'Coordinates'},
    ]

    const teamColumns = [
        {accessor: 'id', label: 'ID'},
        {accessor: 'name', label: 'Name'},
        {accessor: 'size', label: 'Max Size'},
        {accessor: 'cave', label: 'Cave Location'},
        {accessor: 'personList', label: 'Members'},
    ]

    return (
        <div className="App">
            <h1>First Service. Dragons and Persons</h1>
            <h2>Dragons</h2>
            <Table rows={dragonRows} columns={dragonColumns}/>
            <h2>Persons</h2>
            <Table rows={personRows} columns={personColumns}/>
            <form className="half" onSubmit={handleSubmit}>
                <h2>Dragon Form</h2>
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
                    <input type="number" id="killer" name="killer" value={formDataDragon.killer}
                           onChange={handleChangeDragon}/>
                </label>

                <button className="custom" type="submit" onClick={() => {
                    postDataDragon("http://localhost:8080/jax-rs-1/dragon/dragons", formDataDragon).then();
                }}>Create Dragon
                </button>
                <button className="custom" type="submit" onClick={() => {
                    console.log(formDataDragon.id)
                    getData("http://localhost:8080/jax-rs-1/dragon/dragons/" + formDataDragon.id)
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
                <button className="custom" type="submit" onClick={() => {
                    putDataDragon("http://localhost:8080/jax-rs-1/dragon/dragons", formDataDragon).then();
                }}>Update Dragon
                </button>
                <button className="custom" type="submit" onClick={() => {
                    console.log(formDataDragon.id)
                    deleteDataDragon("http://localhost:8080/jax-rs-1/dragon/dragons/" + formDataDragon.id)
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
            <form className="half" onSubmit={handleSubmit}>
                <h2>Person Form</h2>
                <label htmlFor="id">ID:
                    <input type="number" id="id" name="id" value={formDataPerson.id} onChange={handleChangePerson}/>
                </label>

                <label htmlFor="name">Name:
                    <input type="text" id="name" name="name" value={formDataPerson.name} onChange={handleChangePerson}/>
                </label>

                <label htmlFor="birthday">BirthDay:
                    <input type="text" id="birthday" name="birthday" value={formDataPerson.birthday}
                           onChange={handleChangePerson}/>
                </label>

                <label htmlFor="height">Height:
                    <input type="number" id="height" name="height" value={formDataPerson.height}
                           onChange={handleChangePerson}/>
                </label>

                <label htmlFor="passportID">Passport ID:
                    <input type="text" id="passportID" name="passportID" value={formDataPerson.passportID}
                           onChange={handleChangePerson}/>
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

                <button className="custom" type="submit" onClick={() => {
                    console.log(formDataPerson)
                    postDataPerson("http://localhost:8080/jax-rs-1/dragon/persons", formDataPerson).then();
                }}>Create Person
                </button>
                <button className="custom" type="submit" onClick={() => {
                    console.log(formDataPerson.id)
                    getData("http://localhost:8080/jax-rs-1/dragon/persons/" + formDataPerson.id)
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
                <button className="custom" type="submit" onClick={() => {
                    putDataPerson("http://localhost:8080/jax-rs-1/dragon/persons", formDataPerson).then();
                }}>Update Person
                </button>
                <button className="custom" type="submit" onClick={() => {
                    console.log(formDataPerson.id)
                    deleteDataPerson("http://localhost:8080/jax-rs-1/dragon/persons/" + formDataPerson.id)
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
            <form className="half" onSubmit={handleSubmit}>
                <h2>First Service Form</h2>
                <label htmlFor="id">Killer ID:
                    <input type="number" id="id" name="id" value={formDataFirstService.id}
                           onChange={handleChangeFirstService}/>
                </label>
                <label htmlFor="type">Dragon Type:
                    <select name="type" value={formDataFirstService.type}
                            onChange={handleChangeFirstService}
                            id="type">
                        <option name="type" value="WATER">Water</option>
                        <option name="type" value="UNDERGROUND">Underground</option>
                        <option name="type" value="AIR">Air</option>
                        <option name="type" value="FIRE">Fire</option>
                    </select>
                </label>
                <br/>
                <button className="custom" type="submit" onClick={() => {
                    getDataWithBody("http://localhost:8080/jax-rs-1/dragon/dragons/delete-killed",
                        {
                            id: formDataFirstService.id
                        }).then(() => {
                        getData("http://localhost:8080/jax-rs-1/dragon/dragons")
                            .then((data) => {
                                getDragons(data)
                            });
                    });
                }}>Delete Killed Dragons
                </button>
                <button className="custom" type="submit" onClick={() => {
                    getDataWithBody("http://localhost:8080/jax-rs-1/dragon/dragons/delete-by-type",
                        {
                            "value": formDataFirstService.type
                        }).then(() => {
                        getData("http://localhost:8080/jax-rs-1/dragon/dragons")
                            .then((data) => {
                                getDragons(data)
                            });
                    });
                }}>Delete Dragon By Type
                </button>
                <button className="custom" type="submit" onClick={() => {
                    setFormDataDragon({
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
                    getData("http://localhost:8080/jax-rs-1/dragon/dragons/get-by-max-color")
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
                }}>Get By Max Color
                </button>
            </form>
            <br/>
            <h1>Second Service. Caves and Teams</h1>
            <h2>Caves</h2>
            <Table rows={caveRows} columns={caveColumns}/>
            <h2>Teams</h2>
            <Table rows={teamRows} columns={teamColumns}/>
            <form className="half" onSubmit={handleSubmit}>
                <h2>Team Form</h2>
                <label htmlFor="id">ID:
                    <input type="number" id="id" name="id" value={formDataTeam.id} onChange={handleChangeTeam}/>
                </label>
                <label htmlFor="name">Name:
                    <input type="text" id="name" name="name" value={formDataTeam.name} onChange={handleChangeTeam}/>
                </label>
                <label htmlFor="size">Max Size:
                    <input type="number" id="size" name="size" value={formDataTeam.size}
                           onChange={handleChangeTeam}/>
                </label>
                <label htmlFor="cave">Cave ID:
                    <input type="number" id="cave" name="cave" value={formDataTeam.cave}
                           onChange={handleChangeTeam}/>
                </label>
                <label htmlFor="personList">Person List:
                    <input type="text" id="personList" name="personList" value={formDataTeam.personList}
                           onChange={handleChangeTeam}/>
                </label>

                <button className="custom" type="submit" onClick={() => {
                    console.log("http://localhost:8080/jax-rs-2/killer/teams/create/" +
                        formDataTeam.id + "/" + formDataTeam.name + "/" + formDataTeam.size + "/" + formDataTeam.cave)
                    postDataTeam("http://localhost:8080/jax-rs-2/killer/teams/create/" +
                        formDataTeam.id + "/" + formDataTeam.name + "/" + formDataTeam.size + "/" + formDataTeam.cave,
                        formDataTeam).then();
                }}>Create Team
                </button>
            </form>
            <form className="half" onSubmit={handleSubmit}>
                <h2>Cave Form</h2>
                <label htmlFor="x">Coordinates.X:
                    <input type="number" id="x" name="x" value={formDataCave.x} onChange={handleChangeCave}/>
                </label>

                <label htmlFor="x">Coordinates.Y:
                    <input type="number" id="y" name="y" value={formDataCave.y} onChange={handleChangeCave}/>
                </label>

                <button className="custom" type="submit" onClick={() => {
                    console.log(formDataCave)
                    postDataCave("http://localhost:8080/jax-rs-2/killer/caves", formDataCave).then();
                }}>Create Cave
                </button>
            </form>
            <form className="half" onSubmit={handleSubmit}>
                <h2>Second Service Form</h2>
                <label htmlFor="teamId">Team ID:
                    <input type="number" id="teamId" name="teamId" value={formDataSecondService.teamId}
                           onChange={handleChangeSecondService}/>
                </label>
                <label htmlFor="caveId">Cave ID:
                    <input type="number" id="caveId" name="caveId" value={formDataSecondService.caveId}
                           onChange={handleChangeSecondService}/>
                </label>
                <br/>
                <button className="custom" type="submit" onClick={() => {
                    getDataWithBody("http://localhost:8080/jax-rs-2/killer/teams/" +
                        formDataSecondService.teamId + "/move-to-cave/" + formDataSecondService.caveId,
                        {}).then(() => {
                        getData("http://localhost:8080/jax-rs-2/killer/teams")
                            .then((data) => {
                                getTeams(data)
                            });
                        getData("http://localhost:8080/jax-rs-2/killer/caves")
                            .then((data) => {
                                getCaves(data)
                            });
                    });
                }}>Move Team To Cave
                </button>
            </form>
        </div>
    )
}
