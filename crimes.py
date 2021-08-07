import json
import urllib.request

def get_ticket_data(x):
    response = urllib.request.urlopen(x)
    content_string = response.read().decode()
    content = json.loads(content_string)
    lonArray = []
    latArray = []
    descArray = []
    totalArray = []
    for item in content:
        if 'longitude' in item.keys():
            for k, v in item.items():
                if k == 'longitude':
                    lonArray.append(float(v))
                if k == 'latitude':
                    latArray.append(float(v))
                if k == 'incident_type_primary':
                    descArray.append(v)

    for index in range(0, len(latArray)):
        totalArray.append([latArray[index], lonArray[index], descArray[index]])

    return json.dumps(totalArray)