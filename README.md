# rest-api-node-template
## Commands
```npm run build```     --> Build the API

```npm run start```     --> Start the nodemon server

```npm run test```      --> Run all the tests (linting + unit tests)

```npm run test-fix```  --> Run all the tests (linting + unit tests) and try to fix the linting that don't pass
## API Architecture
| Functionality     | Status                | Help |
|-------------------|-----------------------|------|
| Controller usage  | :white_check_mark:    | [Routing controllers Annotations](https://github.com/typestack/routing-controllers) & [TypeDI service injection](https://github.com/typestack/typedi) |
| Middleware usage  | :white_check_mark:    | [Routing controllers Annotations](https://github.com/typestack/routing-controllers) & [TypeDI service injection](https://github.com/typestack/typedi) |
| Interceptor usage | :white_check_mark:    | [Routing controllers Annotations](https://github.com/typestack/routing-controllers) & [TypeDI service injection](https://github.com/typestack/typedi) |
| Repository usage  | :white_check_mark:    | Simple classes with [TypeDI service injection](https://github.com/typestack/typedi) |

## Quality
| Functionality     | Status                | Help                                          | Command                   |
|-------------------|-----------------------|-----------------------------------------------|---------------------------|
| Unit testing      | :white_check_mark:    | [Jest unit tests](https://jestjs.io/fr/)      | ```npm run test(-fix)```  |
| Syntax checker    | :white_check_mark:    | [TSlint](https://palantir.github.io/tslint/)  | ```npm run test(-fix)```  |
| Data typing       | :white_check_mark:    | [Typescript](https://www.typescriptlang.org/) |                           |
| API Documentation | :white_check_mark:    | [Swagger](https://swagger.io/)                | Default path : ```/docs```|

## Tools
[![Scaffolding tool](https://ondemand.bannerbear.com/signedurl/D0nJ4XLedwbENRZa1x/image.jpg?modifications=W3sibmFtZSI6InJlcG8iLCJ0ZXh0IjoibGVubnlnaXIgLyAqcmVzdC1hcGktbm9kZS10ZW1wbGF0ZSoifSx7Im5hbWUiOiJkZXNjIiwidGV4dCI6Im5vZGVKUyBBUEkgdGVtcGxhdGUgd2l0aCBxdWFsaXR5IHRvb2xzIn0seyJuYW1lIjoiYXZhdGFyNSIsImhpZGUiOnRydWV9LHsibmFtZSI6ImF2YXRhcjQiLCJoaWRlIjp0cnVlfSx7Im5hbWUiOiJhdmF0YXIzIiwiaGlkZSI6dHJ1ZX0seyJuYW1lIjoiYXZhdGFyMiIsImhpZGUiOnRydWV9LHsibmFtZSI6ImF2YXRhcjEiLCJpbWFnZV91cmwiOiJodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvNTA0MDgxMzk_dj00In0seyJuYW1lIjoiY29udHJpYnV0b3JzIiwidGV4dCI6Imxlbm55Z2lyIn0seyJuYW1lIjoic3RhcnMiLCJ0ZXh0IjoiMiJ9XQ&s=bbfda10c418705b90c4485880fbefe24c9d7b23a7bd62c30086cabf8d3c3e8d1)](https://github.com/lennygir/leg-scaffolding)
<p align="center">
  Scaffolding tool
</p>

## Required

> ( ) : Optional
>
> UQ : Unique
>
> PK : Primary Key
>
> FK : Foreign Key

- required database schema to use jwt login system

| Table     | Column                | Type                                          |
|-------------------|-----------------------|-----------------------------------------------|
| \[db_table_suffix]_user      | id    | serial, PK      |
|    | username    | character varying, (UQ)  |
|     | password    | character varying |

- required database schema to use jwt login system tests

| Table     | Column                | Type                                          |
|-------------------|-----------------------|-----------------------------------------------|
| \[db_table_suffix]_test      | id    | serial, PK      |
|    | name    | character varying  |

## Upcomming changes

- TSLint & StyleLint configuration
- Test(s) for "where" method of GenericRepository
- E-mail Repository & implementation of 2-factor login
- Particular need ? Ask in the "problem" section of github 