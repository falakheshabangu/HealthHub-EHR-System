from health_hub_b import create_app
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = create_app()

CORS(app, resources={r"/api/*": {"origins": "*"}})

if __name__ == __name__:
    app.run(host="10.5.33.175",debug=True)

    