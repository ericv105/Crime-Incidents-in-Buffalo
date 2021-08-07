import bottle
import crimes

@bottle.route('/')
def indexfunction():
  return bottle.static_file('index.html', root='')

@bottle.route('/ericv105/map.js')
def mapfunction():
  return bottle.static_file('map.js', root='')

@bottle.route('/ericv105/crime')
def get_tickets():
  return crimes.get_ticket_data("https://data.buffalony.gov/resource/d6g9-xbgu.json")

bottle.run(debug=True)
