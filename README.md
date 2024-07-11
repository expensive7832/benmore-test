The first thing to do is to clone the repository:

$ git clone https://github.com/expensive7832/benmore.git
$ cd benmore
Create a virtual environment to install dependencies in and activate it:

$ python -m venv env
$ source env/bin/activate
Then install the dependencies:

(env)$ pip install -r requirements.txt
Note the (env) in front of the prompt. This indicates that this terminal session operates in a virtual environment set up by virtualenv2.

Once pip has finished downloading the dependencies:

(env)$ cd project
(env)$ python manage.py runserver
And navigate to http://127.0.0.1:8000/.

mysql workbench or xampp is needed to be able to view document inserted during crud operation easily

so go to the settings.py file under databases and change the configuration to match
