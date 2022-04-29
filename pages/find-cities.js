import React from 'react'
import NavBar from '../components/NavBar'
import CitySearchForm from '../components/CitySearchForm'

export default function FindCities() {
  return (
    <div className="overscroll-contain">
      <NavBar />
      <div className="relative overscroll-none">
        <CitySearchForm />
      </div>
    </div>
  )
}
