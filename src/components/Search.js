import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Label } from "semantic-ui-react";
import { toast } from "react-toastify";
import { autocomplete } from "../services/services";
import { getCityForecast } from "../actions/cityForcastActions";

function Searchbar() {
  const dispatch = useDispatch();

  const [cityOptions, setCityOptions] = useState([]);
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { darkMode } = useSelector((state) => state.theme);

  useEffect(() => {
    const getCities = async () => {
      setLoading(true);
      try {
        const data = await autocomplete(value);
        setCityOptions(
          data &&
            data.map((item) => ({
              description: item.LocalizedName,
              title: item.Key,
            }))
        );
      } catch (error) {
        toast.error("Autocomplete Error: " + error.message);
      }
      setLoading(false);
    };

    if (!value) return;

    const timer = setTimeout(getCities, 1000);

    return () => clearTimeout(timer);
  }, [value]);

  const selectCity = (data) => {
    dispatch(getCityForecast(data.result.title, data.result.description));
    setValue(data.result.description);
  };

  const resultRenderer = ({ description }) => <Label content={description} />;

  return (
    <>
      <Search
        fluid
        loading={isLoading}
        onResultSelect={(e, data) => selectCity(data)}
        onSearchChange={(e) => setValue(e.target.value)}
        resultRenderer={resultRenderer}
        results={cityOptions && cityOptions}
        value={value}
        placeholder="Search"
        className={darkMode ? "inverse-search" : ""}
      />
    </>
  );
}

export default Searchbar;