import { useState } from "react";

import './ZipCodeForm.css';

const INITIAL_ZIPCODE = {
    zip1: "",
    zip2: "",
    zip3: "",
    zip4: "",
    zip5: ""
};

const ZipCodeForm = ({ getWeather, errorMessage }) => {
    const [zipCodeFields, setZipCodeFields] = useState(INITIAL_ZIPCODE);

    const handleSubmit = (e) => {
        e.preventDefault();

        let zipCode = "";
        for (let key in zipCodeFields) {
            zipCode += zipCodeFields[key];
        }

        getWeather(zipCode);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (value.length <= 1) {
            setZipCodeFields({ ...zipCodeFields, [name]: value });
        }

        if (value.length === 1) {
            if (e.target.nextElementSibling) {
                e.target.nextElementSibling.focus();
            }
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace' && zipCodeFields[e.target.name].length === 0) {
            if (e.target.previousElementSibling) {
                e.target.previousElementSibling.focus();
            }
        }
    }

    return (
        <div className="form-container">
            <h1 className='title'>forecast</h1>
            <h2 className="subtitle">Input your zip code</h2>
            <form className="zipcode-form" onSubmit={handleSubmit}>
                <div className="input-container">
                    <input
                        type="number"
                        required
                        name="zip1"
                        min="0"
                        max="9"
                        maxLength="1"
                        placeholder="5"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        value={zipCodeFields.zip1}
                    />
                    <input
                        type="number"
                        required
                        name="zip2"
                        min="0"
                        max="9"
                        maxLength={1}
                        placeholder="5"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        value={zipCodeFields.zip2}
                    />
                    <input
                        type="number"
                        required
                        name="zip3"
                        min="0"
                        max="9"
                        maxLength={1}
                        placeholder="5"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        value={zipCodeFields.zip3}
                    />
                    <input
                        type="number"
                        required
                        name="zip4"
                        min="0"
                        max="9"
                        maxLength={1}
                        placeholder="5"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        value={zipCodeFields.zip4}
                    />
                    <input
                        type="number"
                        required
                        name="zip5"
                        min="0"
                        max="9"
                        maxLength={1}
                        placeholder="5"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        value={zipCodeFields.zip5}
                    />
                </div>
                <span className="errorMsg">{errorMessage}</span>
                <button>Submit</button>
            </form>
        </div>
    )
};

export default ZipCodeForm;