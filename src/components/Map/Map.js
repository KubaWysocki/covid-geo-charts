import React from 'react'
import {MapContainer, Tooltip, TileLayer, CircleMarker} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './Map.module.css'

const Map = React.memo(({data}) => 
  <MapContainer
    preferCanvas
    className={styles.map}
    zoom={2}
    minZoom={2}
    center={[0, 0]}
    maxBounds={[
      [-90, -180],
      [90, 180],
    ]}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    />
    {data.map(country =>
      <CircleMarker
        key={country.key}
        radius={2}
        pathOptions={{color: 'red'}}
        center={[country.lat, country.long]}>
        <Tooltip direction='top' permanent>
          <span>{country.key}</span>
          <br/>
          <span>cases: {country.confirmed}</span>
        </Tooltip>
      </CircleMarker>
    )}
  </MapContainer>
)

export default Map