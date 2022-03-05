![alt text](static/images/igz-h.jpg)
# Intelygenz talent test


![alt text](static/images/home.png)

<details>

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#Installation)
<a href="#Installation"></a>

<summary> :floppy_disk: &nbsp; Installation</summary>

- ## :whale: &nbsp; Install Docker & Docker Compose

  https://docs.docker.com/get-docker/  
  https://docs.docker.com/compose/install/

- ## :closed_lock_with_key: &nbsp; Environment Variables

  To run this project, you will need to add the following environment variables regarding DB mapping to your `.env` file:

  `POSTGRES_NAME`

  `POSTGRES_USER`

  `POSTGRES_PASSWORD`

  <br/>And the following ones to setup an admin user for Django:

  `DJANGO_SUPERUSER_USERNAME`

  `DJANGO_SUPERUSER_EMAIL`

  `DJANGO_SUPERUSER_PASSWORD`

  <br/> A Boolean value for debugging session (Optional, default = False):

  `DEBUG`


- ## :wrench: &nbsp; Build and run container

  To build the container you can just run the `start.sh` script. The script will try to create a Django superuser (if it does not exist already):

  You may set the credentials via `.env` file and just run:
  ```bash
  sh start.sh
  ```

  Or explicitly before invoking the script:
  ```bash
   DJANGO_SUPERUSER_USERNAME=admin \
   DJANGO_SUPERUSER_EMAIL=admin@admin.com \
   DJANGO_SUPERUSER_PASSWORD=****** \
   sh start.sh
  ```

  (Optional) VSCode debugging setup is already integrated. A debugging session can be launched by setting truthy its variable:
  ```bash
  DEBUG=true sh start.sh
  ```

  (Optional) To run testing Suite:
  ```bash
  docker exec Django-server-container venv/bin/python -m pytest --verbosity=2 -l
  ```
  </details>

<br>

<details>

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#aproach)
<a href="#aproach"></a>

  <summary> :triangular_ruler: &nbsp; Approach</summary>

- Marke it work locally :arrow_right: &nbsp;  Dockerize it
- Document readme at each commit made
- External app architecture. Abstract docker commands into bash scripts
- Clear folder structure
</details>

<br>

<details>

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#testing)
<a href="#testing"></a>

  <summary> :microscope: &nbsp; Testing</summary>

  - Test run comand <i>docker exec Django-server-container venv/bin/python -m pytest --verbosity=2 -l</i>
  - Test right results :white_check_mark:
  - Test right input format:
    - Test input format is a list :white_check_mark:
    - Test squared matrix for main diagonal sum :white_check_mark:
    - Test no empty input :white_check_mark:


</details>

<br>

<!-- <details>

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#bp)
<a href="#bp"></a>

  <summary> :cold_sweat: &nbsp; Blocking points</summary>


</details>

<br> -->

<details>

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#cud)
<a href="#cud"></a>

  <summary> :soon: &nbsp; Currently under develop</summary>

  - Rest Swagger interface & API documentation
  - Login front page & auth configuration

</details>

<br>
