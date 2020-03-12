
import colander


def _to_json(data):
    json_body = {}
    for key, value in data.iteritems():
        json_body[key] = value
    return json_body

def validate(data, schema):
    cstruct = _to_json(data)
    errors = {}
    try:
        schema.deserialize(cstruct)
    except colander.Invalid as e:
        errors = e.asdict()
    return errors

