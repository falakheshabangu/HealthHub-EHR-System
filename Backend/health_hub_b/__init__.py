from flask import Flask
from flask_cors import CORS
from .models import db


DATABASE_URI = 'postgresql://group_x:rRUyc2XAJG2j2uJR6f9BWQhjOT2ltte2@dpg-cvgkusqn91rc73bdrurg-a.oregon-postgres.render.com/test_database'

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:3000"])

    #APP CONFIG
    app.config['SECRET_KEY'] = 'fun-dev@health_hub(2025)'
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    #APP INITIALIZATION
    db.init_app(app)
    

    #Registering Blueprints
    from .auth import auth
    app.register_blueprint(auth, url_prefix="/")

    return app



