<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
</br>
</br>
**Developer:** [Oscar Herrera Lugo](https://www.linkedin.com/in/osedhelu/)
</br>
**prueba:** Social Wires Backend

</br>
</br>
</br>
</br>

## Librerias

- @nestjs/jwt - [para crear estrategias de autenticacion access_token y refresh_token]()
- @nestjs/passport- [metodo de autenticacion que de multiples integracion para auth]()
- bcrypt - [metodo para la encriptacion de contraseña y regresh_token]()
- class-validator- [usamo esta libreria de pipes para la validadion de datos al momento de enviar al entpoint]()
- @nestjs/swagger - [la documentacin de la aplicacion esta echa en esta swagger]()
- uuid - [para la validacion de uuid y generacion]()
- prisma - [esta libreria suelo escogerla por la facilidad que tiene de conectarce con las bases de datos]()
  </br>
  </br>
  </br>

## .env

```bash
# conecion con la base de datos
DATABASE_URL=

# semilla para generar los refresh_token
JWT_REFRESH_SECRET=

# semilla para generar los access_token
JWT_ACCESS_SECRET=

# definir el puerto de la aplicacion
PORT=
```

</br>
</br>
</br>

## Como ver la documentacion de la aplicacion

- local - [localhost](http://localhost:3001/docs)
- miweb - [corriendo en mi servidor](http://190.85.54.78:2342/docs)
