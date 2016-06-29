Rails API [![Codeship](https://img.shields.io/codeship/00c1fa10-b5c6-0133-b267-7a55e39a3182/master.svg?style=flat-square)](https://codeship.com/projects/134157)
--------

This is the JSON server written in Ruby

Setup
-----

First make sure the [dependencies](#dependencies) are met. Then:

```bash
$ git clone https://github.com/dillonhafer/budgetal
$ cd budgetal/rails-api && bundle
$ cp .env{.example,}
$ rake db:setup
```

### Environment Variables

Budgetal is designed to be a [12-Factor](http://12factor.net/) application. As such it uses environment variables for each type of deployment. Budgetal uses the [dotenv-rails gem](https://github.com/bkeepers/dotenv) for each environment. When setting up a new development deploy on your local machine, be sure to `cp .env{.example,}` so you can setup your local configuration.

### Dependencies

**PostgreSQL**

Your postgres installation must be at a version >= 9.4. This is due to the `pgcrypto` extension needed to run migrations.
Migrations can/should be run with a *superuser* in production environments by adding `RAILS_DATABASE_USER=my_super_pg_user`
to the `overrides.env` file that was created during `mina setup`.

**Chrome Driver**

Budgetal feature tests depend on the selenium chrome driver

*OSX*

```bash
$ brew install chromedriver
```

*Linux*

```bash
$ wget https://chromedriver.storage.googleapis.com/2.20/chromedriver_linux64.zip
$ unzip -qq chromedriver_linux64.zip
```

See the [Chrome Driver website](https://sites.google.com/a/chromium.org/chromedriver/) for more details.

### Testing

1. Setup database `RAILS_ENV=test rake db:schema:load`
2. Run `rake`

### Deployment

If you plan on using the included deploy tasks please make sure you have the `mina` gem installed on your system.

A full deploy would look like this:

```
$ gem install mina
$ mina setup
$ mina deploy
```
