import { useState } from "react";
import { Autocomplete, TextField } from '@mui/material';
import { allTimezones } from "../fixtures/allTimezones";
import { StyledEngineProvider } from "@mui/material";

const VITE_MAPBOX_KEY = import.meta.env.VITE_MAPBOX_KEY[1:-1];
const VITE_IPGEO_KEY = import.meta.env.VITE_IPGEO_KEY[1:-1];

const TimezoneInput = ({ind, location, timezone, setTimezones}) => {
    const [input, setInput] = useState(location);
    const [options, setOptions] = useState(location ? [{name: location, label: "Locations"}] : []);
    const [value, setValue] = useState(location ? {name: location, label: "Locations"} : null);
    console.log("input", input);
    console.log("value", value);
    console.log("location", location);
    // fetch location suggestions based on user input
    const fetchLocation = async (newInput) => {
        const response = await fetch(`https://api.mapbox.com/search/searchbox/v1/suggest?q=${newInput}&types=city&limit=5&session_token="456"&access_token=${VITE_MAPBOX_KEY}`);
        const json = await response.json();
        const results = json.suggestions.map(result => {
            let name = result.name;

            if (result.context.region && result.context.region.name) {
                name += `, ${result.context.region.name}`;
            }

            name += `, ${result.context.country.name}`;

            return {name, label: "Locations"};
        });
        return results;
    }

    // fetch timezone based on selected location
    // combine location and timezone options
    const fetchOptions = async (newInput) => {
        if (newInput) {
            const cityOptions = await fetchLocation(newInput);
            const timezoneOptions = allTimezones.filter(time => time.toLowerCase().includes(newInput.toLowerCase())).slice(0, 4).map(time => ({name: time, label: "Timezone"}));

            const allOptions = [...cityOptions, ...timezoneOptions];

            setOptions(allOptions)
        }
    }

    // fetch timezone based on selected location's geocode
    const fetchGeocode = async (loc) => {
        const city = loc.split(", ")[0];
        const country = loc.split(", ")[1];
        const response1 = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?place=${city}&country=${country}&types=place&access_token=${VITE_MAPBOX_KEY}`);
        const json1 = await response1.json();
        const result1 = json1.features[0].geometry.coordinates;
        const lon = result1[0];
        const lat = result1[1];

        const response2 = await fetch(`https://api.ipgeolocation.io/timezone?apiKey=${VITE_IPGEO_KEY}&lat=${lat}&long=${lon}`)
        const json2 = await response2.json();
        const result2 = json2.timezone;
        return result2;
    }

    // update input and suggested options as user types
    const handleInputChange = (e, newInput) => {
        setInput(newInput);
        fetchOptions(newInput);
    }

    // update value and input when user selects an option
    const handleChange = async (e, newValue) => {
        setValue(newValue);
        let tz = "";

        if (newValue) {
            setInput(newValue.name);
            if (newValue.label === "Locations") {
                tz = await fetchGeocode(newValue.name)
            }
            else if (newValue.label === "Timezone") {
                tz = newValue.name;
            }
        }
        else {
            setInput("");
        }

        setTimezones(tz, ind);
    }

    return (
        <StyledEngineProvider injectFirst>
            <Autocomplete
                disableClearable={true}
                inputValue={input}
                onInputChange={handleInputChange}
                onChange={handleChange}
                value={value}
                filterOptions={(x) => x}
                options={options}
                groupBy={(option) => option.label}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                renderInput={(params) => <TextField {...params} label="Search for location or timezone" />}
                // freeSolo
            />
        </StyledEngineProvider>
    )
}

export default TimezoneInput;
