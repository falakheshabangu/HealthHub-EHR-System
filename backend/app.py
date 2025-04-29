from health_hub_b import create_app
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = create_app()

jwt = JWTManager(app)

app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"

CORS(app, resources={r"/api/*": {"origins": "*"}})

if __name__ == __name__:
    app.run(host="0.0.0.0",debug=True)

    