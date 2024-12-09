import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import * as session from 'express-session';
import * as flash from 'connect-flash';

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieSession({
    keys: ['20002912']
  }));

  app.use(
    session({
      secret: 'somethingSecret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 },
    }),
  );

  app.use(flash());

  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.set('view options', {layout: 'layouts/main'});
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));

  hbs.registerHelper('eq', function(arg1, arg2) {
    return arg1 === arg2;
  });
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    }),
  );

  await app.listen(3000);
}
bootstrap();
