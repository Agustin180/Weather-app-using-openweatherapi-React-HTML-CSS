import { useState, useEffect } from 'react';
import { Ring } from '@uiball/loaders'
import style from './style.css';
import bgday from './images/daycard.jpg';
import bgnight from './images/nightcard.jpg';
import allbgday from './images/daybackground.jpg';
import allbgnight from './images/nightbackground.jpg'

const App = () => {
  // SETEAMOS EL HORARIO Y LAS CIUDADES DE CADA RESPECTIVA ZONA EN ESTE CASO 'BUENOS AIRES', 'BOGOTA', 'MOSCU'.
  const time = new Date();
  const [weather, setUseWeathers] = useState([]);
  const [showdata, setShowData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hoursarg, setHoursArg] = useState(Number(time.toLocaleTimeString([], { timeZone: 'America/Argentina/Buenos_Aires', hour: '2-digit' })));
  const [minutesarg, setMinutesArg] = useState();
  const [daynumarg, setDayNumArg] = useState();
  const [daystrarg, setDayStrArg] = useState();
  const [montharg, setMonthArg] = useState();
  const [yeararg, setYearArg] = useState();
  const [hourscol, setHoursCol] = useState();
  const [minutescol, setMinutesCol] = useState();
  const [daynumcol, setDayNumCol] = useState();
  const [daystrcol, setDayStrCol] = useState();
  const [monthcol, setMonthCol] = useState();
  const [yearcol, setYearCol] = useState();
  const [hoursrus, setHoursRus] = useState();
  const [minutesrus, setMinutesRus] = useState();
  const [daynumrus, setDayNumRus] = useState();
  const [daystrrus, setDayStrRus] = useState();
  const [monthrus, setMonthRus] = useState();
  const [yearrus, setYearRus] = useState();
  const [openmodal, setOpenModal] = useState(false);
  const [cityarg, setCityArg] = useState('Buenos Aires');
  const [citycol, setCityCol] = useState('Bogota');
  const [cityrus, setCityRus] = useState('Moscu');
  const [city, setCity] = useState(cityarg);

  const API_KEY = '10f5fc043a0815d3b2db734dd151a90a';

  // GUARDAMOS LOS SVG EN VARIABLES PARA LUEGO PODER MOSTRARLAS EN BASE A LO QUE RESPONDA LA API.
  const svgsunday = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='#ffffff' ><path d="M6.995 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007-2.246-5.007-5.007-5.007S6.995 9.239 6.995 12zM11 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2H2zm17 0h3v2h-3zM5.637 19.778l-1.414-1.414 2.121-2.121 1.414 1.414zM16.242 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.344 7.759 4.223 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"></path></svg>;
  const svgsunnight = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='#ffffff'><path d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142 3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 0 0 2.735-5.119A9.003 9.003 0 0 1 12 11.807z"></path></svg>;
  const svgclouds = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='#ffffff'><path d="M18.944 11.112C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.611 5.757 9.15 3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5h11c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888z"></path></svg>;
  const svgrain = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='#ffffff'><path d="M8 13h2v4H8zm0 5h2v2H8zm3-3h2v4h-2zm0 5h2v2h-2zm3-7h2v4h-2zm0 5h2v2h-2z"></path><path d="M18.944 10.112C18.507 6.67 15.56 4 12 4 9.244 4 6.85 5.611 5.757 8.15 3.609 8.792 2 10.819 2 13c0 2.757 2.243 5 5 5v-2c-1.654 0-3-1.346-3-3 0-1.403 1.199-2.756 2.673-3.015l.581-.103.192-.559C8.149 7.273 9.895 6 12 6c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2h-1v2h1c2.206 0 4-1.794 4-4a4.008 4.008 0 0 0-3.056-3.888z"></path></svg>;
  const svgthunder = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='#ffffff'><path d="m10 13-1 5h2v4l3.975-6H13l1-3z"></path><path d="M18.944 10.112C18.507 6.67 15.56 4 12 4 9.244 4 6.85 5.611 5.757 8.15 3.609 8.792 2 10.819 2 13c0 2.757 2.243 5 5 5v-2c-1.654 0-3-1.346-3-3 0-1.403 1.199-2.756 2.673-3.015l.581-.103.192-.559C8.149 7.273 9.895 6 12 6c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2h-1v2h1c2.206 0 4-1.794 4-4a4.008 4.008 0 0 0-3.056-3.888z"></path></svg>
  const svgsnow = <svg fill='#ffffff' viewBox="0 0 24 24" width="24" height="24" ><path d="M8 16a.5.5 0 01-.5-.5v-1.293l-.646.647a.5.5 0 01-.707-.708L7.5 12.793V8.866l-3.4 1.963-.496 1.85a.5.5 0 11-.966-.26l.237-.882-1.12.646a.5.5 0 01-.5-.866l1.12-.646-.884-.237a.5.5 0 11.26-.966l1.848.495L7 8 3.6 6.037l-1.85.495a.5.5 0 01-.258-.966l.883-.237-1.12-.646a.5.5 0 11.5-.866l1.12.646-.237-.883a.5.5 0 11.966-.258l.495 1.849L7.5 7.134V3.207L6.147 1.854a.5.5 0 11.707-.708l.646.647V.5a.5.5 0 111 0v1.293l.647-.647a.5.5 0 11.707.708L8.5 3.207v3.927l3.4-1.963.496-1.85a.5.5 0 11.966.26l-.236.882 1.12-.646a.5.5 0 01.5.866l-1.12.646.883.237a.5.5 0 11-.26.966l-1.848-.495L9 8l3.4 1.963 1.849-.495a.5.5 0 01.259.966l-.883.237 1.12.646a.5.5 0 01-.5.866l-1.12-.646.236.883a.5.5 0 11-.966.258l-.495-1.849-3.4-1.963v3.927l1.353 1.353a.5.5 0 01-.707.708l-.647-.647V15.5a.5.5 0 01-.5.5z" /></svg>
  const svgmist = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='#ffffff'><path d="M13 5.5C13 3.57 11.43 2 9.5 2 7.466 2 6.25 3.525 6.25 5h2c0-.415.388-1 1.25-1 .827 0 1.5.673 1.5 1.5S10.327 7 9.5 7H2v2h7.5C11.43 9 13 7.43 13 5.5zm2.5 9.5H8v2h7.5c.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5c-.862 0-1.25-.585-1.25-1h-2c0 1.475 1.216 3 3.25 3 1.93 0 3.5-1.57 3.5-3.5S17.43 15 15.5 15z"></path><path d="M18 5c-2.206 0-4 1.794-4 4h2c0-1.103.897-2 2-2s2 .897 2 2-.897 2-2 2H2v2h16c2.206 0 4-1.794 4-4s-1.794-4-4-4zM2 15h4v2H2z"></path></svg>

  // LLAMADA A LA API GUARDAMOS LO QUE REGRESA EN UN STATE PARA LUEGO PODER MANIPULAR LA INFORMACION Y MOSTRARLA.
  // MANEJO DE ERRORES SI EL STATUS ES DIFERENTE A UNA RESPUESTA EXITOSA 200 MOSTRARA UN ALERT.
  const CallApi = async () => {
    try {
      const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const results = await data.json();
      if (data.status === 200) {
        setUseWeathers(results);
        console.log(results);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setShowData(true);
        console.log('Api working!')
      } else if (data.status === 401) {
        alert('Wrong key');
      } else if (data.status === 404) {
        alert('No data finded');
      } else {
        alert('We dont know whats going on');
      }
    } catch (error) {
      alert('Api failed');
    }

  }


  // INFORMACION DINAMICA PARA QUE MUESTRE LA INFORMACION EN VIVO Y SE ACTUALIZE.
  useEffect(() => {
    CallApi();
    setInterval(() => {
      const time = new Date();
      setYearArg(time.toLocaleString([], { timeZone: 'America/Argentina/Buenos_Aires', year: 'numeric' }));
      setMonthArg(time.toLocaleString([], { timeZone: 'America/Argentina/Buenos_Aires', month: 'short' }).toUpperCase());
      setDayNumArg(time.toLocaleString([], { timeZone: 'America/Argentina/Buenos_Aires', day: '2-digit' }));
      setDayStrArg(time.toLocaleString(('en-US'), { timeZone: 'America/Argentina/Buenos_Aires', weekday: 'short' }).toUpperCase());
      setMinutesArg(time.toLocaleTimeString([], { timeZone: 'America/Argentina/Buenos_Aires', minute: '2-digit' }));

      setYearCol(time.toLocaleString([], { timeZone: 'America/Bogota', year: 'numeric' }));
      setMonthCol(time.toLocaleString([], { timeZone: 'America/Bogota', month: 'short' }).toUpperCase());
      setDayNumCol(time.toLocaleString([], { timeZone: 'America/Bogota', day: '2-digit' }));
      setDayStrCol(time.toLocaleString(('en-US'), { timeZone: 'America/Bogota', weekday: 'short' }).toUpperCase());
      setMinutesCol(time.toLocaleTimeString([], { timeZone: 'America/Bogota', minute: '2-digit' }));

      setYearRus(time.toLocaleString([], { timeZone: 'Europe/Moscow', year: 'numeric' }));
      setMonthRus(time.toLocaleString([], { timeZone: 'Europe/Moscow', month: 'short' }).toUpperCase());
      setDayNumRus(time.toLocaleString([], { timeZone: 'Europe/Moscow', day: '2-digit' }));
      setDayStrRus(time.toLocaleString(('en-US'), { timeZone: 'Europe/Moscow', weekday: 'short' }).toUpperCase());
      setMinutesRus(time.toLocaleTimeString([], { timeZone: 'Europe/Moscow', minute: '2-digit' }));
    }, 1000)
  }, [city]);

  // MIENTRAS LA DATA DE LA API NO ESTE LISTA MOSTRARA UN LOADING.
  if (loading) {
    return (
      <div className='general-content-loading'>
        <Ring size={35} color="#ffffff" />
      </div>
    )
  }

  // REFRESCAR LOS DATOS LLAMANDO A LA API Y VOLVIENDO AL STATE DEL COMIENZO QUE ES 'BUENOS AIRES'.
  const FastRefresh = () => {
    setHoursCol();
    setHoursRus();
    setHoursArg(Number(time.toLocaleTimeString([], { timeZone: 'America/Argentina/Buenos_Aires', hour: '2-digit' })));
    setLoading(true)
    setShowData(false)
    setOpenModal(false)
    setTimeout(() => {
      CallApi();
      setCity(cityarg);
      setLoading(false)
      setShowData(true)
    }, 3000)
  }


  // FUNCIONES DE LLAMADA A LA ACCION DEL MODAL PARA CAMBIAR LA ZONA HORARIA.
  const CitytoArg = () => {
    const time = new Date();
    setCity(cityarg);
    setHoursArg(Number(time.toLocaleTimeString([], { timeZone: 'America/Argentina/Buenos_Aires', hour: '2-digit' })));
    setHoursCol();
    setHoursRus();
    setOpenModal(false)
  };

  const CitytoCol = () => {
    const time = new Date();
    setCity(citycol);
    setHoursCol(Number(time.toLocaleTimeString([], { timeZone: 'America/Bogota', hour: '2-digit' })));
    setHoursArg();
    setHoursRus();
    setOpenModal(false)
  };

  const CitytoRus = () => {
    const time = new Date();
    setCity(cityrus);
    setHoursRus(Number(time.toLocaleTimeString([], { timeZone: 'Europe/Moscow', hour: '2-digit' })));
    setHoursArg();
    setHoursCol();
    setOpenModal(false)
  };

  return (
    <section>
      {/* MOSTRAMOS CARD Y BACKGROUND DE DIA U NOCHE DEPENDIENDO DEL HORARIO */}
      {hoursarg >= 20 || hoursarg < 7 || hourscol >= 20 || hourscol < 7 || hoursrus >= 20 || hoursrus < 7 ? <img className='allbg-day' src={allbgnight} /> : <img className='allbg-day' src={allbgday} />}
      {
        showdata === true ? (
          <div className='general-card'>
            {hoursarg >= 20 || hoursarg < 7 || hourscol >= 20 || hourscol < 7 || hoursrus >= 20 || hoursrus < 7 ? <img className='bg-night' src={bgnight} /> : <img className='bg-day' src={bgday} />}
            <div className='general-country-content'>
              <div className='general-country-refresh' onClick={FastRefresh}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='#ffffff'><path d="M10 11H7.101l.001-.009a4.956 4.956 0 0 1 .752-1.787 5.054 5.054 0 0 1 2.2-1.811c.302-.128.617-.226.938-.291a5.078 5.078 0 0 1 2.018 0 4.978 4.978 0 0 1 2.525 1.361l1.416-1.412a7.036 7.036 0 0 0-2.224-1.501 6.921 6.921 0 0 0-1.315-.408 7.079 7.079 0 0 0-2.819 0 6.94 6.94 0 0 0-1.316.409 7.04 7.04 0 0 0-3.08 2.534 6.978 6.978 0 0 0-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4 4-4zm4 2h2.899l-.001.008a4.976 4.976 0 0 1-2.103 3.138 4.943 4.943 0 0 1-1.787.752 5.073 5.073 0 0 1-2.017 0 4.956 4.956 0 0 1-1.787-.752 5.072 5.072 0 0 1-.74-.61L7.05 16.95a7.032 7.032 0 0 0 2.225 1.5c.424.18.867.317 1.315.408a7.07 7.07 0 0 0 2.818 0 7.031 7.031 0 0 0 4.395-2.945 6.974 6.974 0 0 0 1.053-2.503c.027-.135.043-.273.063-.41H22l-4-4-4 4z"></path></svg>
              </div>
              <p className='general-country-text'>{weather.name === 'Buenos Aires' ? weather.name : ''}{weather.name === 'Bogota' ? weather.name : ''}{weather.name === 'Moscu' ? weather.name : ''}, {weather.sys.country === 'CO' ? 'Colombia' : ''}{weather.sys.country === 'AR' ? 'Argentina' : ''}{weather.sys.country === 'RO' ? 'Rusia' : ''}</p>
              <div className='general-country-more' onClick={() => setOpenModal(!openmodal)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='#ffffff'><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
              </div>
            </div>
            {/* MODAL DONDE SE CAMBIA LA CIUDAD */}
            {
              openmodal === true ? (
                <div className='general-total-modal'>
                  {hoursarg >= 20 || hoursarg < 7 || hourscol >= 20 || hourscol < 7 || hoursrus >= 20 || hoursrus < 7 ?
                    <div className='general-modal-night'>
                      <div className='general-modal-arg-night' onClick={CitytoArg}>Argentina</div>
                      <p className='general-modal-col-night' onClick={CitytoCol}>Colombia</p>
                      <p className='general-modal-esp-night' onClick={CitytoRus}>Rusia</p>
                    </div>
                    :
                    <div className='general-modal-day'>
                      <div className='general-modal-arg-day' onClick={CitytoArg}>Argentina</div>
                      <p className='general-modal-col-day' onClick={CitytoCol}>Colombia</p>
                      <p className='general-modal-esp-day' onClick={CitytoRus}>Rusia</p>
                    </div>
                  }
                </div>
              ) : ''
            }
            <div className='general-weather-content'>
              <div className='general-weather-number'>
                <h1 className='general-weather-title'>{weather.main.temp.toFixed()}º</h1>
              </div>
              <div className='general-weather-details'>
                <div className='general-weather-status'>
                  {/* MOSTRAMOS ICONOS SEGUN RESPUESTA DE LA API */}
                  <div>
                    {weather.weather[0].icon === '01d' ? svgsunday : ''}{weather.weather[0].icon === '01n' ? svgsunnight : ''}
                    {weather.weather[0].icon === '02d' ? svgclouds : ''}{weather.weather[0].icon === '02n' ? svgclouds : ''}
                    {weather.weather[0].icon === '03d' ? svgclouds : ''}{weather.weather[0].icon === '03n' ? svgclouds : ''}
                    {weather.weather[0].icon === '04d' ? svgclouds : ''}{weather.weather[0].icon === '04n' ? svgclouds : ''}
                    {weather.weather[0].icon === '09d' ? svgrain : ''}{weather.weather[0].icon === '09n' ? svgrain : ''}
                    {weather.weather[0].icon === '10d' ? svgrain : ''}{weather.weather[0].icon === '10n' ? svgrain : ''}
                    {weather.weather[0].icon === '11d' ? svgthunder : ''}{weather.weather[0].icon === '11n' ? svgthunder : ''}
                    {weather.weather[0].icon === '13d' ? svgsnow : ''}{weather.weather[0].icon === '13n' ? svgsnow : ''}
                    {weather.weather[0].icon === '50d' ? svgmist : ''}{weather.weather[0].icon === '50n' ? svgmist : ''}
                  </div>
                  <div>
                    <p className='general-weather-text'>{weather.weather[0].main === 'Thunderstorm' ? 'Storm' : weather.weather[0].main}</p>
                  </div>
                </div>
                <div>
                  <p className='general-weather-text'>{city === 'Buenos Aires' ? daystrarg : ''} {city === 'Buenos Aires' ? daynumarg : ''} {city === 'Bogota' ? daystrcol : ''} {city === 'Bogota' ? daynumcol : ''} {city === 'Moscu' ? daystrrus : ''} {city === 'Moscu' ? daynumrus : ''}</p>
                </div>
                <div>
                  <p className='general-weather-text'>{city === 'Buenos Aires' ? montharg : ''} {city === 'Buenos Aires' ? yeararg : ''} {city === 'Bogota' ? monthcol : ''} {city === 'Bogota' ? yearcol : ''} {city === 'Moscu' ? monthrus : ''} {city === 'Moscu' ? yearrus : ''}</p>
                </div>
              </div>
            </div>
            {/* MOSTRAMOS HORARIO DE UNA ZONA U OTRA DEPENDIENDO DE LA CIUDAD */}
            <div className='general-weather-time'>
              <p className='general-weather-text'>{hoursarg <= 9 || hourscol <= 9 || hoursrus <= 9 ? 0 : ''}{city === 'Buenos Aires' ? hoursarg : ''}{city === 'Bogota' ? hourscol : ''}{city === 'Moscu' ? hoursrus : ''}:{minutesarg <= 9 || minutescol <= 9 || minutesrus <= 9 ? 0 : ''}{city === 'Buenos Aires' ? minutesarg : ''}{city === 'Bogota' ? minutescol : ''}{city === 'Moscu' ? minutesrus : ''} {hoursarg >= 12 || hourscol >= 12 || hoursrus >= 12 ? 'PM' : 'AM'}</p>
            </div>
          </div>
        ) : (
          <div className='general-content-loading'>
            <Ring size={35} color="#ffffff" />
          </div>
        )
      }

    </section>
  );

}

export default App;
