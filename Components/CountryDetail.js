import React, { useEffect, useState } from 'react'
import './CountryDetail.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import CountryDetailShimmer from './CountryDetailShimmer'
import { useTheme } from '../hook/useTheme'

const CountryDetail = () => {

    const [countryData, setCountryData] = useState(null)
    const [countryNotFount, setCountryNotFount] = useState(false)
    const { state } = useLocation()
    const [isDark] = useTheme()
    const params = useParams()
    const contryName = params.country

    function updateCountryData(data) {
        setCountryData({
            flag: data.flags.svg,
            name: data.name.common || data.name,
            nativeName: Object.values(data.name.nativeName || {})[0]?.common,
            population: data.population.toLocaleString('en-IN'),
            region: data.region,
            subRegion: data.subregion,
            capital: data.capital,
            topLevelDomain: data.tld,
            currencies: Object.values(data.currencies || {})
                .map((currency) => currency.name)
                .join(', '),
            languages: Object.values(data.languages || {}).join(', '),
            borders: []
        })

        if (!data.borders) {
            data.borders = []
        }

        Promise.all(
            data.borders.map((border) => {
                return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((res) => res.json())
                    .then(([borderCountry]) => borderCountry.name.common)
            })).then((borders) => {
                setTimeout(() =>
                    setCountryData((prevState) => ({ ...prevState, borders }))
                )
            })
    }

    useEffect(() => {
        if (state) {
            updateCountryData(state)
            return
        }

        fetch(`https://restcountries.com/v3.1/name/${contryName}?fullText=true`)
            .then((res) => res.json())
            .then(([data]) => {
                updateCountryData(data)
            })
            .catch(() =>
                setCountryNotFount(true)
            )
    }, [contryName])

    if (countryNotFount) {
        return <div className='not-found'><h2>Country not found</h2></div>
    }

    return (
        <main className={`${isDark ? 'dark' : ''}`}>
            <div className="country-details-container">
                <span className="back-btn" onClick={() => history.back()}>
                    <i className="fa-solid fa-arrow-left-long"></i>
                    &nbsp;&nbsp;Back
                </span>
                {countryData === null ? (
                    <CountryDetailShimmer />
                ) : (
                    <div className="country-details">
                        <img src={countryData.flag} alt={`${countryData.name} Flag`} />
                        <div className="details-text-container">
                            <h1>{countryData.name}</h1>
                            <div className="details-text">
                                <p><b>Native name: </b><span className="native-name">{countryData.nativeName || countryData.name}</span></p>
                                <p><b>Population: </b><span className="population">{countryData.population}</span></p>
                                <p><b>Region: </b><span className="region">{countryData.region}</span></p>
                                <p><b>Sub Region: </b><span className="sub-region">{countryData.subRegion}</span></p>
                                <p><b>Capital: </b><span className="capital">{countryData.capital?.join(', ')}</span></p>
                                <p><b>Top Level Domain: </b><span className="domain">{countryData.topLevelDomain}</span></p>
                                <p><b>Currencies: </b><span className="currencies">{countryData.currencies}</span></p>
                                <p><b>Languages: </b><span className="languages">{countryData.languages}</span></p>
                            </div>
                            {countryData.borders.length !== 0 && (
                                <div className="border-contries">
                                    <b>Border Contries:</b>&nbsp;
                                    {
                                        countryData.borders.map((border) => (
                                            <Link key={border} to={`/${border}`}>
                                                {border}
                                            </Link>
                                        ))
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default CountryDetail