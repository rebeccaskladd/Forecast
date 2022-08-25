import { useState } from "react";

const ZipCodeForm = ({ getWeather }) => {
    const [zipCodeFields, setZipCodeFields] = useState({
        zip1: "",
        zip2: "",
        zip3: "",
        zip4: "",
        zip5: ""
    });

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
        setZipCodeFields({ ...zipCodeFields, [name]: value });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    required
                    name="zip1"
                    min="0"
                    max="9"
                    maxLength={1}
                    placeholder="5"
                    onChange={handleChange}
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
                />

                <button>GO</button>
            </form>
        </div>
    )
};

export default ZipCodeForm;