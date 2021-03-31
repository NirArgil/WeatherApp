import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Grid, Segment, Image, GridRow } from "semantic-ui-react";
import { toast } from "react-toastify";
import AddToFavorites from "../components/AddToFavorites";
import Searchbar from "../components/Search";
import Forecast from "../components/Forcast";

const Home = () => {
  const { name, loading, currentCondition, error } = useSelector((state) => state.cityForecast);
  const { darkMode, isFar } = useSelector((state) => state.theme);

  useEffect(() => {
    error && toast.error("City Forecast Error: " + error);
  }, [error]);

  return (
    <Container textAlign="center">
      <Searchbar />
      <Segment loading={loading} className={darkMode ? "inverse" : ""}>
        {currentCondition && currentCondition.length ? (
          <>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column textAlign="left">
                <div className={darkMode ? "cityNameDark" : "cityName"}>
                  <p>{name}</p>
                    <p>
                      {!isFar
                        ? currentCondition[0].Temperature.Metric.Value.toFixed(
                            0
                          ) + "°C"
                        : currentCondition[0].Temperature.Imperial.Value.toFixed(
                            0
                          ) + "°F"}
                    </p>
                </div>
                 
                </Grid.Column>
                <Grid.Column textAlign="right">
                  <AddToFavorites />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <GridRow textAlign="center" >
              <Image
                size="small"
                src={`icons/${currentCondition[0].WeatherIcon}.svg`}
              />
              <h2 className={darkMode ? "WeatherConditionDark" : ""}>
              {currentCondition[0].WeatherText} 
              </h2>
              <h3 className={darkMode ? "WeatherConditionDark" : ""}>
                Wind:{" "}
                {!isFar
                  ? currentCondition[0].Wind.Speed.Metric.Value +
                    currentCondition[0].Wind.Speed.Metric.Unit
                  : currentCondition[0].Wind.Speed.Imperial.Value +
                    currentCondition[0].Wind.Speed.Imperial.Unit}
              </h3>
            </GridRow>
            <Forecast />
          </>
        ) : null}
      </Segment>
    </Container>
  );
};

export default Home;