import bottle
import crimes

@bottle.route('/Crime-Incidents-in-Buffalo/')
def indexfunction():
  return bottle.static_file('index.html', root='')

@bottle.route('/Crime-Incidents-in-Buffalo/map.js')
def mapfunction():
  return bottle.static_file('map.js', root='')

@bottle.route('/Crime-Incidents-in-Buffalo/crime')
def get_tickets():
  return crimes.get_ticket_data("https://data.buffalony.gov/resource/d6g9-xbgu.json")

bottle.run(debug=True)
