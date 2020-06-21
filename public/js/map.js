$(function(){
  $('#world-map').vectorMap({
    map: 'world_mill',
    scaleColors: ['#C8EEFF', '#0071A4'],
    normalizeFunction: 'polynomial',
    hoverOpacity: 0.7,
    hoverColor: true,
    regionStyle: { 
      initial: { 
        fill: '#999' 
      }, 
      hover: { 
        fill: '#bbb',
      }
    },
    markerStyle: {
      initial: {
        fill: 'var(--yellow',
        stroke: '#1f405e'
      },
      hover: {
        fill: '#f6f6f6'
      }
    },
    backgroundColor: '#f6f6f6',
    series: {
      regions: [{
        values: {
          // applicants (& members - also have markers) (blue)
          KE:'var(--blue)',
          GH:'var(--blue)',
          IR:'var(--blue)',
          PK:'var(--blue)',
          NP:'var(--blue)',
          KR:'var(--blue)',
          // submissions (yellow)
          BD:'var(--yellow)',
          JP:'var(--yellow)',
          IN:'var(--yellow)',
          BD:'var(--yellow)',
          TW:'var(--yellow)',
          MA:'var(--yellow)',
          NL:'var(--yellow)',
          PL:'var(--yellow)',
          // members & applicants
          US:'var(--teal)',
          PH:'var(--teal)',
          NG:'var(--teal)',
          TR:'var(--teal)',
          /*
          SG: {latLng: [1.35, 103.82], name: 'Singapore'},
          SG: 'var(--teal)'
          */
        }
      }]
    },
    markers: [
      // west is negative 
      {latLng: [40.71, -74.01], name: 'New York, NY'},
      {latLng: [40.06, -74.41], name: 'Kendall Park, NJ'},
      {latLng: [38.98, -76.49], name: 'Annapolis, MD'},
      {latLng: [37.43, -121.90], name: 'Milpitas, CA'},
      {latLng: [34.05, -118.24], name: 'Los Angeles, CA'},
      {latLng: [43.81, -91.25], name: 'La Crosse, WI'},
      {latLng: [30.33, -81.66], name: 'Jacksonville, FL'},
      {latLng: [29.76, -95.37], name: 'Houston, TX'},
      {latLng: [7.45, 125.81], name: 'Tagum City, PH'},
      {latLng: [6.76, 125.35], name: 'Digos City, PH'},
      {latLng: [14.68, 121.04], name: 'Quezon City, PH'},
      {latLng: [6.52, 3.38], name: 'Lagos, NG'},
      {latLng: [41.01, 28.98], name: 'Istanbul, TU'}
    ]
  });
});