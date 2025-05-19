from flask import Flask
from flask_cors import CORS
from .models import db
from flask_jwt_extended import JWTManager


DATABASE_URI = 'postgresql://group_x:ticNmQjd53cj4CHlLttf3uN7omlSjhQj@dpg-d090d015pdvs739vhjjg-a.oregon-postgres.render.com/hhdb_evak' #'postgresql://postgres:jayastro@localhost:5432/health_hubdb' #'postgresql://group_x:ticNmQjd53cj4CHlLttf3uN7omlSjhQj@dpg-d090d015pdvs739vhjjg-a.oregon-postgres.render.com/hhdb_evak'

jwt = JWTManager()


def create_app():
    app = Flask(__name__)
    CORS(app, origins=["*"]) ## EDIT AFTER GETTING FRONTEND PROTOCOL, HOSTNAME, DOMAIN

    #APP CONFIG
    app.config['SECRET_KEY'] = 'fun-dev@health_hub(2025)'
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 7200  # 2 hours


    #APP INITIALIZATION
    db.init_app(app)
    jwt.init_app(app)
    

    #Registering Blueprints
    from .auth import auth
    from .route import routes
    app.register_blueprint(routes, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")

    return app



