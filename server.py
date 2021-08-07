import bottle
import crimes

@bottle.route('/')
def indexfunction():
  return bottle.static_file('index.html', root='')

@bottle.route('/map.js')
def mapfunction():
  return bottle.static_file('map.js', root='')

@bottle.route('/crime')
def get_tickets():
  return crimes.get_ticket_data("https://data.buffalony.gov/resource/d6g9-xbgu.json")

bottle.run(debug=True)
