FROM ruby:2.6.4

WORKDIR /app

COPY Gemfile /app/Gemfile

RUN bundle install --without development test

COPY ./ /app/

ENV RAILS_ENV production

CMD ["rails", "s", "-e", "production", "-p", "8000"]