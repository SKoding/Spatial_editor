# A GIS web application for Spatial editing.
![My Skills](https://skillicons.dev/icons?i=py,nodejs,django,postgresql,react,)
## Installation
1. Create Virtual Enviroment
>```virtualenv env```
2. Activate *env* enviroment
>```source back/bin/activate```
3. Move-into main folder
>```cd backend/main```
4. Install packages from *requirements.txt*
>```pip install -r requirements.txt```
5. Create *env*. A dot-env file to store database connection parameters
>```create using your file editor```
6. Add the following and configure with your appropriate parameters
>```DB_HOST = "localhost"```\
>```DB_NAME = "DATABASE_NAME"```\
>```DB_PASSWORD = "PASSWORD"```\
>```DB_USER = "DATABASE_USER"```
7. Running application
>```python3 manage.py runserver```
8. Django Migration
>```python3 manage.py makemigrations```
9. Creating Superuser
>```python3 manage.py createsuperuser```

*NOTE* Access backend using _localhost:PORT/admin/_

## Disclaimer
This is an ongoing project to create a web application using Django and React to consume data stored in a Postgresql database. For any bugs noted or contribution,  you are welcome to report.