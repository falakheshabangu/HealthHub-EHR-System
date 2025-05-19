from health_hub_b import create_app
from waitress import serve

app = create_app()


if __name__ == __name__:
    serve(app, host="192.168.0.94", port=8080)