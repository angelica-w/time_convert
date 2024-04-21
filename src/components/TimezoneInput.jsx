import { useState } from "react";
import { TimePicker } from '@mui/x-date-pickers';
import { SearchBox } from '@mapbox/search-js-react';
import { Autocomplete, TextField } from '@mui/material';
import { allTimezones } from "../fixtures/allTimezones";
import { StyledEngineProvider } from "@mui/material";

const accessToken = "pk.eyJ1IjoiYW5nd2FuZyIsImEiOiJjbHYycng3eG8wbDAzMm1waWx6dXBzbDh6In0.1hErCQlLCNpJl9EyaX9V1g";
const accessKey = "1821be28676647278438d54d96ce5576"

const TimezoneInput = ({ind, location, timezone, setTimezones}) => {

    const [input, setInput] = useState(location);
    const [options, setOptions] = useState(location ? [{name: location, label: "Locations"}] : []);
    const [value, setValue] = useState(location ? {name: location, label: "Locations"} : null);

    // const [value, setValue] = useState(location ? {name: location, label: "Locations"} : (timezone ? {name: timezone, label: "Timezones"} : null));

    const fetchLocation = async (newInput) => {
        const response = await fetch(`https://api.mapbox.com/search/searchbox/v1/suggest?q=${newInput}&types=city&limit=5&session_token="123"&access_token=${accessToken}`);
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

    const fetchOptions = async (newInput) => {
        if (newInput) {
            const cityOptions = await fetchLocation(newInput);
            const timezoneOptions = allTimezones.filter(time => time.toLowerCase().includes(newInput.toLowerCase())).slice(0, 4).map(time => ({name: time, label: "Timezone"}));

            const allOptions = [...cityOptions, ...timezoneOptions];

            setOptions(allOptions)
        }
    }

    const fetchGeocode = async (loc) => {
        const city = loc.split(", ")[0];
        const country = loc.split(", ")[1];
        const response1 = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?place=${city}&country=${country}&types=place&access_token=${accessToken}`);
        const json1 = await response1.json();
        const result1 = json1.features[0].geometry.coordinates;
        const lon = result1[0];
        const lat = result1[1];

        const response2 = await fetch(`https://api.ipgeolocation.io/timezone?apiKey=${accessKey}&lat=${lat}&long=${lon}`)
        // const response2 = await fetch(`https://timeapi.io/api/TimeZone/coordinate?latitude=${lat}&longitude=${lon}`)
        // const response2 = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=${accessKey}&format=json&by=position&lat=${lat}&lng=${lon}`);
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
            // let tz = "";

            if (newValue.label === "Locations") {
                tz = await fetchGeocode(newValue.name)
            }
            else if (newValue.label === "Timezone") {
                tz = newValue.name;
            }

            // setTimezones(tz, ind)
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