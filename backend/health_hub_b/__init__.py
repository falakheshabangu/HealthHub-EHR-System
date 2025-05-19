from flask import Flask
from flask_cors import CORS
from .models import db


DATABASE_URI = 'postgresql://postgres:jayastro@localhost:5432/health_hubdb' #'postgresql://group_x:ticNmQjd53cj4CHlLttf3uN7omlSjhQj@dpg-d090d015pdvs739vhjjg-a.oregon-postgres.render.com/hhdb_evak'

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["*"])

    #APP CONFIG
    app.config['SECRET_KEY'] = 'fun-dev@health_hub(2025)'
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    #APP INITIALIZATION
    db.init_app(app)
    

    #Registering Blueprints
    from .auth import auth
    from .route import routes
    app.register_blueprint(routes, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")

    return app



