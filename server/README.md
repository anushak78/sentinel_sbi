# Candidate Verification Portal (server)

* Install the system package python3-venv (if not already installed)

    ```shell
    $ sudo apt-get install python3-venv
    ```

* Create a Python virtual environment.

    ```shell
    $ python3 -m venv env
    ```

* Activate the virtual environment

    ```shell
    $ source env/bin/activate
    ```

* Upgrade packaging tools.

    ```shell
    (env) $ pip install --upgrade pip setuptools
    ```

* Install python wheel package

    ```shell
    (env) $ pip install wheel
    ```

* Install the project in editable mode with its testing requirements.

    ```shell
    (env) $ pip install -e ".[testing]"
    ```

* Initialize the DB

    ```shell
    (env) $ initialize_db development.ini
    ```

* Now, we can start the server application.

    ```shell
    (env) $ pserve development.ini
    ```

### Running tests of server application

* To run tests using [pytest](https://docs.pytest.org/en/latest/)

    ```shell
    (env) $ pytest
    ```

> Once the server part is done, we need to setup and build the client
> application in order to be served by the pyramid.


### Server side application code scaffolding


* To generate a new python file use

    ```shell
    $ ./stool cv/<new_file>.py
    ```

### Server side application code linting

* We highly recommend to use [flake8][flake8_site] to check the code
  formatting of Python code

  ```shell
  (env) $ pip install flake8
  ```

* To check your code with `flake8`, run the following command and fix
  the reported errors before committing the code

  ```shell
  (env) $ flake8 cv
  ```


Happy Hacking :)

[pyramid_site]: https://docs.pylonsproject.org/projects/pyramid/en/latest/
[python_site]: https://docs.python.org/3/
[flake8_site]: http://flake8.pycqa.org/en/latest/

