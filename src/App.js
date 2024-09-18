import './styles.css'

import {useState} from "react";

export default function App() {

    const [formDataItmo, setFormDataItmo] = useState({
        login: "",
        password: "",
        saved: "Press For Save"
    });

    const [formDataGoogle, setFormDataGoogle] = useState({
        login: "",
        password: "",
        saved: "Press For Save"
    });

    const [formDataWeeks, setFormDataWeeks] = useState({
        value: 2
    });

    const handleChangeItmo = (event) => {
        const {name, value} = event.target;
        setFormDataItmo((prevFormData) => ({...prevFormData, [name]: value}));
        setFormDataItmo((prevFormData) => ({...prevFormData, ["saved"]: "Press For Save"}));
    };

    const handleChangeGoogle = (event) => {
        const {name, value} = event.target;
        setFormDataGoogle((prevFormData) => ({...prevFormData, [name]: value}));
        setFormDataGoogle((prevFormData) => ({...prevFormData, ["saved"]: "Press For Save"}));
    };

    const handleChangeWeeks = (event) => {
        const {name, value} = event.target;
        setFormDataWeeks((prevFormData) => ({...prevFormData, [name]: value}));
    };

    function DisplayChange(newvalue) {
        document.getElementById(
            "slider").innerHTML = newvalue;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="App">
            <h1>PUSH your ITMO schedule to Google Calendar</h1>

            <form className="half" onSubmit={handleSubmit}>
                <h2>My.ITMO</h2>
                <label htmlFor="login">Login:
                    <input type="text" id="login" name="login" value={formDataItmo.login} onChange={handleChangeItmo}/>
                </label>

                <label htmlFor="password">Password:
                    <input type="password" id="password" name="password" value={formDataItmo.password} onChange={handleChangeItmo}/>
                </label>

                <button id="yes_button" className="button-64" type="submit" onClick={() => {
                    setFormDataItmo((prevFormData) => ({...prevFormData, ["saved"]: "Saved!"}));
                }}><b>{formDataItmo.saved}</b></button>

            </form>

            <form className="half" onSubmit={handleSubmit}>
                <h2>Google Calendar</h2>
                <label htmlFor="login">Login:
                    <input type="text" id="login" name="login" value={formDataGoogle.login} onChange={handleChangeGoogle}/>
                </label>

                <label htmlFor="password">Password:
                    <input type="password" id="password" name="password" value={formDataGoogle.password} onChange={handleChangeGoogle}/>
                </label>

                <button id="yes_button" className="button-64" type="submit" onClick={() => {
                    setFormDataGoogle((prevFormData) => ({...prevFormData, ["saved"]: "Saved!"}));
                }}><b>{formDataGoogle.saved}</b></button>

            </form>

            <form className="half" onSubmit={handleSubmit}>
                <h2>Select period</h2>
                <label htmlFor="weeks">Weeks:
                    <input type="range" id="slider" name="slider" min="1" max="10" value={formDataWeeks.value} step="1"
                    onChange={handleChangeWeeks} onInput={() => {DisplayChange(formDataWeeks.value + 1)}}/>
                </label>

                <button id="no_button" className="button-64" type="submit" onClick={() => {}}><b>Selected: {formDataWeeks.value}</b></button>

            </form>

            <form className="half" onSubmit={handleSubmit}>

                <button id="big_button" className="button-64" type="submit" onClick={() => {}}><b><font size="6">Перевернуть календарь</font></b></button>

            </form>
        </div>
    )
}
